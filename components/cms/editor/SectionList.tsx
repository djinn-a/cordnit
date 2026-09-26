"use client";

import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  HolderOutlined,
  MoreOutlined,
  PlusOutlined,
  WarningFilled,
} from "@ant-design/icons";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Dropdown, Flex, Tag, Tooltip, Typography, type MenuProps } from "antd";
import { useId } from "react";
import { useRevealKey } from "../hooks/useRevealKey";
import { BRAND } from "../theme";
import type { EditorSection } from "./types";

export type SectionMenuAction = "addBelow" | "duplicate" | "toggle" | "convert" | "detach" | "delete";

type Props = {
  sections: EditorSection[];
  selectedId: string | null;
  labelFor: (s: EditorSection) => string;
  typeLabelFor: (s: EditorSection) => string;
  errorIds: ReadonlySet<string>;
  disabled?: boolean;
  onSelect: (id: string) => void;
  onMove: (sectionId: string, fromIndex: number, toIndex: number) => void;
  onAction: (action: SectionMenuAction, section: EditorSection) => void;
  onAdd: () => void;
};

function Row({
  section,
  index,
  selected,
  hasError,
  label,
  typeLabel,
  disabled,
  onSelect,
  onAction,
}: {
  section: EditorSection;
  index: number;
  selected: boolean;
  hasError: boolean;
  label: string;
  typeLabel: string;
  disabled?: boolean;
  onSelect: () => void;
  onAction: (a: SectionMenuAction) => void;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    disabled,
  });
  const revealKey = useRevealKey();

  const items: MenuProps["items"] = [
    { key: "addBelow", icon: <PlusOutlined />, label: "Add section below" },
    { key: "duplicate", icon: <CopyOutlined />, label: "Duplicate" },
    {
      key: "toggle",
      icon: section.isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined />,
      label: section.isHidden ? "Show on page" : "Hide from page",
    },
    section.globalBlockId
      ? { key: "detach", icon: <DisconnectOutlined />, label: "Detach (make local copy)" }
      : { key: "convert", icon: <BlockOutlined />, label: "Make Global Block" },
    { type: "divider" },
    { key: "delete", icon: <DeleteOutlined />, label: "Delete", danger: true },
  ];

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        listStyle: "none",
        zIndex: isDragging ? 2 : undefined,
        position: "relative",
      }}
    >
      <Flex
        align="center"
        gap={8}
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={`${index + 1}. ${label}`}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        style={{
          padding: "8px 8px 8px 4px",
          borderRadius: 8,
          cursor: "pointer",
          border: `1px solid ${selected ? BRAND.primary : hasError ? BRAND.error : "transparent"}`,
          background: selected ? BRAND.primaryPale : isDragging ? "#fff" : "transparent",
          boxShadow: isDragging ? "0 8px 24px rgba(0,0,0,0.12)" : undefined,
          opacity: section.isHidden ? 0.55 : 1,
        }}
      >
        <button
          type="button"
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="cms-sortable-handle"
          aria-label={`Reorder ${label}`}
          onClick={(e) => e.stopPropagation()}
          disabled={disabled}
          style={{ background: "none", border: 0, padding: 4, color: "rgba(0,0,0,0.4)", display: "flex" }}
        >
          <HolderOutlined />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Typography.Text strong ellipsis style={{ display: "block" }}>
            {hasError && <WarningFilled style={{ color: BRAND.error, marginRight: 6 }} />}
            {label}
          </Typography.Text>
          <Flex gap={4} align="center" wrap>
            <Typography.Text type="secondary" style={{ fontSize: 12 }} ellipsis>
              {typeLabel}
            </Typography.Text>
            {section.globalBlockId && (
              <Tag color="purple" style={{ fontSize: 11, lineHeight: "16px", marginInlineEnd: 0 }}>
                Global
              </Tag>
            )}
            {section.isHidden && (
              <Tag style={{ fontSize: 11, lineHeight: "16px", marginInlineEnd: 0 }}>Hidden</Tag>
            )}
          </Flex>
        </div>
        <Dropdown
          key={revealKey}
          trigger={["click"]}
          menu={{ items, onClick: ({ key, domEvent }) => { domEvent.stopPropagation(); onAction(key as SectionMenuAction); } }}
          disabled={disabled}
        >
          <Button
            type="text"
            size="small"
            icon={<MoreOutlined />}
            aria-label={`Actions for ${label}`}
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
      </Flex>
    </li>
  );
}

export default function SectionList({
  sections,
  selectedId,
  labelFor,
  typeLabelFor,
  errorIds,
  disabled,
  onSelect,
  onMove,
  onAction,
  onAdd,
}: Readonly<Props>) {
  const dndId = useId();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = sections.findIndex((s) => s.id === active.id);
    const to = sections.findIndex((s) => s.id === over.id);
    if (from < 0 || to < 0) return;
    onMove(String(active.id), from, to);
  }

  return (
    <Flex vertical gap={8}>
      <DndContext id={dndId} sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <ol style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }} aria-label="Page sections">
            {sections.map((s, i) => (
              <Row
                key={s.id}
                section={s}
                index={i}
                selected={s.id === selectedId}
                hasError={errorIds.has(s.id)}
                label={labelFor(s)}
                typeLabel={typeLabelFor(s)}
                disabled={disabled}
                onSelect={() => onSelect(s.id)}
                onAction={(a) => onAction(a, s)}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
      {sections.length === 0 && (
        <Typography.Paragraph type="secondary" style={{ textAlign: "center", margin: "16px 0" }}>
          This page has no sections yet.
        </Typography.Paragraph>
      )}
      <Tooltip title="Add a section at the end">
        <Button type="dashed" icon={<PlusOutlined />} onClick={onAdd} block disabled={disabled}>
          Add section
        </Button>
      </Tooltip>
    </Flex>
  );
}
