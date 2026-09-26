"use client";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Empty, Flex, Popconfirm, Table, Tag, Tooltip, Typography, type TableProps } from "antd";
import { useState } from "react";
import { deleteTemplateAction } from "@/server/actions/templates";
import { useCmsAction } from "../hooks/useCmsAction";
import { useRevealKey } from "../hooks/useRevealKey";
import CreatePageModal from "../pages/CreatePageModal";
import PageHeader from "../shared/PageHeader";
import RelativeTime from "../shared/RelativeTime";

export type TemplateRowView = {
  id: string;
  name: string;
  key: string;
  description: string | null;
  sectionLabels: string[];
  updatedAt: Date | string;
};

export default function TemplatesTable({
  templates,
  pages,
}: Readonly<{ templates: TemplateRowView[]; pages: { id: string; label: string }[] }>) {
  const { run } = useCmsAction();
  const revealKey = useRevealKey();
  const [useTemplate, setUseTemplate] = useState<string | null>(null);

  const columns: TableProps<TemplateRowView>["columns"] = [
    {
      title: "Layout",
      key: "name",
      render: (_, t) => (
        <>
          <Typography.Text strong>{t.name}</Typography.Text>
          {t.description && (
            <Typography.Text type="secondary" style={{ display: "block", fontSize: 12 }}>
              {t.description}
            </Typography.Text>
          )}
        </>
      ),
    },
    {
      title: "Sections",
      key: "sections",
      render: (_, t) => (
        <Flex gap={4} wrap>
          {t.sectionLabels.slice(0, 6).map((l, i) => (
            <Tag key={`${l}-${i}`} style={{ marginInlineEnd: 0 }}>{l}</Tag>
          ))}
          {t.sectionLabels.length > 6 && <Tag>+{t.sectionLabels.length - 6}</Tag>}
        </Flex>
      ),
    },
    { title: "Updated", dataIndex: "updatedAt", width: 140, render: (v: TemplateRowView["updatedAt"]) => <RelativeTime value={v} /> },
    {
      title: <span className="sr-only">Actions</span>,
      key: "actions",
      width: 200,
      align: "right",
      render: (_, t) => (
        <Flex gap={4} justify="flex-end">
          <Button size="small" icon={<PlusOutlined />} onClick={() => setUseTemplate(t.id)}>
            New page
          </Button>
          <Popconfirm
            key={revealKey}
            title="Delete this layout?"
            description="Pages created from it are not affected."
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => run(deleteTemplateAction, { templateId: t.id }, { success: "Layout deleted" })}
          >
            <Tooltip title="Delete">
              <Button size="small" type="text" danger icon={<DeleteOutlined />} aria-label={`Delete ${t.name}`} />
            </Tooltip>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Layouts" subtitle="Reusable page structures. Start new pages from a layout instead of from scratch." />
      {templates.length === 0 && (
        <Alert
          type="info"
          showIcon
          title="No layouts yet"
          description="Open a page you like, then choose ⋯ → “Save as layout”. Its sections and text become a starting point for new pages."
          style={{ marginBottom: 16 }}
        />
      )}
      <Card styles={{ body: { padding: 0 } }}>
        <Table<TemplateRowView>
          rowKey="id"
          columns={columns}
          dataSource={templates}
          pagination={false}
          locale={{ emptyText: <Empty description="No layouts" /> }}
          scroll={{ x: 720 }}
        />
      </Card>
      <CreatePageModal
        open={useTemplate !== null}
        onClose={() => setUseTemplate(null)}
        templates={templates.map((t) => ({ id: t.id, label: t.name }))}
        pages={pages}
        initial={useTemplate ? { kind: "template", templateId: useTemplate } : undefined}
      />
    </>
  );
}
