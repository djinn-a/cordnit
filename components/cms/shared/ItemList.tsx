import type { Key, ReactNode } from "react";

export default function ItemList<T>({
  items,
  rowKey,
  renderItem,
  compact = false,
}: Readonly<{
  items: readonly T[];
  rowKey: (item: T) => Key;
  renderItem: (item: T) => ReactNode;
  compact?: boolean;
}>) {
  return (
    <ul className="cms-item-list" data-compact={compact || undefined}>
      {items.map((item) => (
        <li key={rowKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
