"use client";

import { BlockOutlined, SearchOutlined } from "@ant-design/icons";
import { Card, Empty, Flex, Input, Modal, Tabs, Tag, Typography } from "antd";
import { useMemo, useState } from "react";
import { SECTION_CATEGORIES } from "@/lib/cms/registry/catalog";
import type { SectionType } from "@/lib/cms/types";
import type { EditorBlock, SectionTypeOptionView } from "./types";

export type AddSource = { kind: "type"; type: SectionType } | { kind: "block"; blockId: string };

type Props = {
  open: boolean;
  onClose: () => void;
  onPick: (source: AddSource) => void;
  typeOptions: SectionTypeOptionView[];
  blocks: EditorBlock[];
  typeLabel: (type: SectionType) => string;
  confirmLoading?: boolean;
};

function PickCard({ title, description, extra, onClick }: { title: string; description: string; extra?: React.ReactNode; onClick: () => void }) {
  return (
    <Card
      hoverable
      size="small"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      style={{ height: "100%" }}
    >
      <Flex justify="space-between" gap={8} align="flex-start">
        <Typography.Text strong>{title}</Typography.Text>
        {extra}
      </Flex>
      <Typography.Paragraph type="secondary" style={{ fontSize: 12, margin: "4px 0 0" }} ellipsis={{ rows: 2 }}>
        {description}
      </Typography.Paragraph>
    </Card>
  );
}

const GRID: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 10,
};

export default function AddSectionModal({ open, onClose, onPick, typeOptions, blocks, typeLabel, confirmLoading }: Readonly<Props>) {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = typeOptions.filter(
      (o) => !q || o.label.toLowerCase().includes(q) || o.description.toLowerCase().includes(q) || o.type.toLowerCase().includes(q),
    );
    return SECTION_CATEGORIES.map((category) => ({ category, items: matches.filter((m) => m.category === category) })).filter(
      (g) => g.items.length > 0,
    );
  }, [query, typeOptions]);

  const matchingBlocks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blocks.filter((b) => !q || b.name.toLowerCase().includes(q) || typeLabel(b.type).toLowerCase().includes(q));
  }, [blocks, query, typeLabel]);

  return (
    <Modal
      title="Add section"
      open={open}
      onCancel={onClose}
      footer={null}
      width={880}
      destroyOnHidden
      confirmLoading={confirmLoading}
      afterOpenChange={(v) => !v && setQuery("")}
      styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
    >
      <Input
        autoFocus
        allowClear
        prefix={<SearchOutlined />}
        placeholder="Search sections, e.g. FAQ, hero, testimonials"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 12 }}
        aria-label="Search section types"
      />
      <Tabs
        items={[
          {
            key: "types",
            label: "Section types",
            children:
              grouped.length === 0 ? (
                <Empty description="No section types match" />
              ) : (
                grouped.map((g) => (
                  <div key={g.category} style={{ marginBottom: 16 }}>
                    <Typography.Text type="secondary" strong style={{ display: "block", marginBottom: 8, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.6 }}>
                      {g.category}
                    </Typography.Text>
                    <div style={GRID}>
                      {g.items.map((o) => (
                        <PickCard key={o.type} title={o.label} description={o.description} onClick={() => onPick({ kind: "type", type: o.type })} />
                      ))}
                    </div>
                  </div>
                ))
              ),
          },
          {
            key: "blocks",
            label: (
              <span>
                <BlockOutlined /> Global Blocks ({blocks.length})
              </span>
            ),
            children:
              matchingBlocks.length === 0 ? (
                <Empty description={blocks.length ? "No blocks match" : "No Global Blocks yet. Use “Make Global Block” on any section to share it across pages."} />
              ) : (
                <div style={GRID}>
                  {matchingBlocks.map((b) => (
                    <PickCard
                      key={b.id}
                      title={b.name}
                      description={`${typeLabel(b.type)}. Edits to the block update every page that uses it.`}
                      extra={b.publishedVersion ? <Tag color="green">v{b.publishedVersion}</Tag> : <Tag>Draft</Tag>}
                      onClick={() => onPick({ kind: "block", blockId: b.id })}
                    />
                  ))}
                </div>
              ),
          },
        ]}
      />
    </Modal>
  );
}
