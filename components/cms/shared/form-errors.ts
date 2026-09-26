import type { FormInstance } from "antd";
import type { FieldErrors } from "@/lib/types/result";

/** Maps server field errors ("seo.title", "items.2.label") onto an antd form. Returns unmatched keys. */
export function applyFieldErrors(form: FormInstance, fieldErrors: FieldErrors | undefined, prefix: (string | number)[] = []): string[] {
  if (!fieldErrors) return [];
  const unmatched: string[] = [];
  const fields = Object.entries(fieldErrors).flatMap(([key, errors]) => {
    if (!key) {
      unmatched.push(...errors);
      return [];
    }
    const name = [...prefix, ...key.split(".").map((p) => (/^\d+$/.test(p) ? Number(p) : p))];
    return [{ name, errors }];
  });
  form.setFields(fields);
  return unmatched;
}
