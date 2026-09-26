/**
 * Splits section props into editable text (`content`) and hidden presentation
 * data (`systemProps`: images, icons, variants, ids), and merges them back for
 * rendering. Arrays of objects carry a stable `_id` on both sides so editors can
 * reorder, add or remove items without images drifting to the wrong card.
 */
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
export type JsonObject = { [key: string]: JsonValue };

export const ITEM_ID_KEY = "_id";

const SYSTEM_KEY_EXACT = new Set([
  "id",
  "type",
  "key",
  "alt",
  "align",
  "alignment",
  "color",
  "colour",
  "tone",
  "size",
  "style",
  "target",
  "rel",
  "width",
  "height",
]);

const SYSTEM_KEY_PATTERN =
  /src|image|img|icon|logo|avatar|photo|picture|thumbnail|poster|video|classname|variant|layout|theme|background/i;

export function isSystemKey(key: string): boolean {
  return SYSTEM_KEY_EXACT.has(key.toLowerCase()) || SYSTEM_KEY_PATTERN.test(key);
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function isEmpty(value: unknown): boolean {
  if (value === undefined) return true;
  if (isPlainObject(value)) return Object.keys(value).length === 0;
  return false;
}

type SplitResult = { content?: JsonValue; system?: JsonValue };

function itemId(item: Record<string, unknown>, index: number, used: Set<string>): string {
  const raw = item[ITEM_ID_KEY] ?? item.id;
  let candidate =
    typeof raw === "string" || typeof raw === "number" ? String(raw) : `i${index}`;
  while (used.has(candidate)) candidate = `${candidate}_${index}`;
  used.add(candidate);
  return candidate;
}

function splitValue(value: unknown): SplitResult {
  if (value === undefined) return {};
  if (value === null || typeof value === "boolean") return { system: value };
  if (typeof value === "string" || typeof value === "number") return { content: value };

  if (Array.isArray(value)) {
    if (!value.some(isPlainObject)) {
      const content: JsonValue[] = [];
      const system: JsonValue[] = [];
      for (const v of value) {
        if (typeof v === "string" || typeof v === "number") content.push(v);
        else system.push(v as JsonValue);
      }
      return system.length > 0 && content.length === 0
        ? { system }
        : { content };
    }
    const used = new Set<string>();
    const contentItems: JsonObject[] = [];
    const systemItems: JsonObject[] = [];
    let anyContent = false;
    let anySystem = false;
    value.forEach((item, index) => {
      if (!isPlainObject(item)) return;
      const id = itemId(item, index, used);
      const { content, system } = splitValue(item);
      const c = (isPlainObject(content) ? content : {}) as JsonObject;
      const s = (isPlainObject(system) ? system : {}) as JsonObject;
      if (Object.keys(c).length > 0) anyContent = true;
      if (Object.keys(s).length > 0) anySystem = true;
      contentItems.push({ [ITEM_ID_KEY]: id, ...c });
      systemItems.push({ [ITEM_ID_KEY]: id, ...s });
    });
    return {
      ...(anyContent ? { content: contentItems } : {}),
      ...(anySystem || !anyContent ? { system: anyContent ? systemItems : stripItemIds(systemItems) } : {}),
    };
  }

  if (isPlainObject(value)) {
    const content: JsonObject = {};
    const system: JsonObject = {};
    for (const [key, v] of Object.entries(value)) {
      if (v === undefined || key === ITEM_ID_KEY) continue;
      if (isSystemKey(key)) {
        system[key] = v as JsonValue;
        continue;
      }
      const part = splitValue(v);
      if (part.content !== undefined) content[key] = part.content;
      if (part.system !== undefined) system[key] = part.system;
    }
    return {
      ...(Object.keys(content).length > 0 ? { content } : {}),
      ...(Object.keys(system).length > 0 ? { system } : {}),
    };
  }
  return {};
}

export function splitSectionProps(props: Record<string, unknown>): {
  content: JsonObject;
  systemProps: JsonObject;
} {
  const { content, system } = splitValue(props);
  return {
    content: (isPlainObject(content) ? content : {}) as JsonObject,
    systemProps: (isPlainObject(system) ? system : {}) as JsonObject,
  };
}

export function stripItemIds<T>(value: T): T {
  if (Array.isArray(value)) return value.map((v) => stripItemIds(v)) as T;
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (k !== ITEM_ID_KEY) out[k] = stripItemIds(v);
    }
    return out as T;
  }
  return value;
}

function mergeValue(system: unknown, content: unknown): unknown {
  if (content === undefined) return stripItemIds(system);

  if (Array.isArray(content)) {
    if (content.length > 0 && content.every(isPlainObject)) {
      const systemItems = Array.isArray(system) ? system.filter(isPlainObject) : [];
      return content.map((item, index) => {
        const id = item[ITEM_ID_KEY];
        const exact = id !== undefined ? systemItems.find((s) => s[ITEM_ID_KEY] === id) : undefined;
        const fallback = exact ?? systemItems[index] ?? systemItems[systemItems.length - 1];
        const merged = mergeValue(fallback, item) as Record<string, unknown>;
        // New items borrow presentation from a sibling but must keep a unique identity.
        if (!exact && fallback && "id" in fallback && typeof id === "string") merged.id = id;
        return merged;
      });
    }
    return content;
  }

  if (isPlainObject(content)) {
    const base = isPlainObject(system) ? system : {};
    const out: Record<string, unknown> = {};
    const keys = new Set([...Object.keys(base), ...Object.keys(content)]);
    for (const key of keys) {
      if (key === ITEM_ID_KEY) continue;
      const merged = mergeValue(base[key], content[key]);
      if (merged !== undefined) out[key] = merged;
    }
    return out;
  }

  return content;
}

export function mergeSectionProps(
  systemProps: Record<string, unknown> | null | undefined,
  content: Record<string, unknown> | null | undefined,
): Record<string, unknown> {
  const merged = mergeValue(systemProps ?? {}, content ?? {});
  return isPlainObject(merged) ? merged : {};
}

export { isEmpty as isEmptyProps };
