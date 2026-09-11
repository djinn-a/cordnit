import type { RecognitionItem } from "./types";

export function isValidRecognitionItem(
  item: unknown
): item is RecognitionItem {
  if (!item || typeof item !== "object") {
    return false;
  }

  const recognition = item as Record<string, unknown>;

  return (
    (typeof recognition.id === "string" ||
      typeof recognition.id === "number") &&
    typeof recognition.category === "string" &&
    recognition.category.trim().length > 0 &&
    typeof recognition.title === "string" &&
    recognition.title.trim().length > 0 &&
    typeof recognition.desc === "string" &&
    recognition.desc.trim().length > 0 &&
    typeof recognition.image === "string" &&
    recognition.image.trim().length > 0
  );
}

export function validateRecognitionItems(
  items: unknown
): RecognitionItem[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter(isValidRecognitionItem);
}
