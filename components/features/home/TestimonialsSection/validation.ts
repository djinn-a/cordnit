import { TestimonialItem } from './types';

export function isValidTestimonial(item: unknown): item is TestimonialItem {
  if (!item || typeof item !== 'object') return false;

  const t = item as Record<string, unknown>;

  if (typeof t.id !== 'string' && typeof t.id !== 'number') return false;
  
  if (typeof t.name !== 'string' || t.name.trim() === '') return false;
  if (typeof t.role !== 'string' || t.role.trim() === '') return false;
  if (typeof t.company !== 'string' || t.company.trim() === '') return false;
  if (typeof t.quote !== 'string' || t.quote.trim() === '') return false;
  if (typeof t.image !== 'string' || t.image.trim() === '') return false;

  return true;
}

export function validateTestimonials(items: unknown): TestimonialItem[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter(isValidTestimonial);
}
