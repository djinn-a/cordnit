"use client";

import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Flex, Input, Popconfirm, Segmented, Table, Tooltip, Typography, type TableProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";
import { slugToPath } from "@/lib/cms/document";
import { deletePageAction } from "@/server/actions/pages";
import { useCmsAction } from "../hooks/useCmsAction";
import { useRevealKey } from "../hooks/useRevealKey";
import PageHeader from "../shared/PageHeader";
import RelativeTime from "../shared/RelativeTime";
import StatusTag from "../shared/StatusTag";
import CreatePageModal from "./CreatePageModal";

export type PageRowView = {
  id: string;
  slug: string;
  title: string;
  liveSlug: string | null;
  hasUnpublishedChanges: boolean;
  publishedVersion: number | null;
  sectionCount: number;
  lockVersion: number;
  updatedAt: Date | string;
};

type Filter = "all" | "live" | "edited" | "draft";

export default function PagesTable({
  pages,
  templates,
}: Readonly<{ pages: PageRowView[]; templates: { id: string; label: string }[] }>) {
  const router = useRouter();
  const { run } = useCmsAction();
  const revealKey = useRevealKey();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [creating, setCreating] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const counts = useMemo(
    () => ({
      all: pages.length,
      live: pages.filter((p) => p.liveSlug).length,
      edited: pages.filter((p) => p.liveSlug && p.hasUnpublishedChanges).length,
      draft: pages.filter((p) => !p.liveSlug).length,
    }),
    [pages],
  );

  const rows = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return pages.filter((p) => {
      if (filter === "live" && !p.liveSlug) return false;
      if (filter === "edited" && !(p.liveSlug && p.hasUnpublishedChanges)) return false;
      if (filter === "draft" && p.liveSlug) return false;
      return !q || p.title.toLowerCase().includes(q) || p.slug.includes(q);
    });
  }, [pages, deferredQuery, filter]);

  const columns: TableProps<PageRowView>["columns"] = [
    {
      title: "Page",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (_, p) => (
        <Link href={`/admin/pages/${p.id}`} style={{ display: "block" }}>
          <Typography.Text strong>{p.title}</Typography.Text>
          <Typography.Text type="secondary" style={{ display: "block", fontSize: 12 }}>
            {slugToPath(p.slug)}
          </Typography.Text>
        </Link>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 150,
      render: (_, p) => (
        <StatusTag isLive={Boolean(p.liveSlug)} hasUnpublishedChanges={p.hasUnpublishedChanges} publishedVersion={p.publishedVersion} />
      ),
    },
    { title: "Sections", dataIndex: "sectionCount", width: 100, align: "right", sorter: (a, b) => a.sectionCount - b.sectionCount },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      width: 150,
      defaultSortOrder: "descend",
      sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      render: (v: PageRowView["updatedAt"]) => <RelativeTime value={v} />,
    },
    {
      title: <span className="sr-only">Actions</span>,
      key: "actions",
      width: 140,
      align: "right",
      render: (_, p) => (
        <Flex gap={4} justify="flex-end">
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} aria-label={`Edit ${p.title}`} onClick={() => router.push(`/admin/pages/${p.id}`)} />
          </Tooltip>
          <Tooltip title={p.liveSlug ? "Open live page" : "Not live yet"}>
            <Button
              type="text"
              icon={<ExportOutlined />}
              aria-label={`Open ${p.title}`}
              disabled={!p.liveSlug}
              href={p.liveSlug ? slugToPath(p.liveSlug) : undefined}
              target="_blank"
            />
          </Tooltip>
          <Popconfirm
            key={revealKey}
            title="Delete this page?"
            description={p.liveSlug ? "It is live: visitors will get a 404." : "The draft and its history will be removed."}
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => run(deletePageAction, { pageId: p.id, lockVersion: p.lockVersion }, { success: "Page deleted" })}
          >
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} aria-label={`Delete ${p.title}`} />
            </Tooltip>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Pages"
        subtitle="Every marketing page on cordinit.com. Edits stay in draft until you publish."
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreating(true)}>
            New page
          </Button>
        }
      />
      <Card styles={{ body: { padding: 0 } }}>
        <Flex gap={12} wrap justify="space-between" style={{ padding: 16 }}>
          <Segmented<Filter>
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: `All ${counts.all}` },
              { value: "live", label: `Live ${counts.live}` },
              { value: "edited", label: `Unpublished edits ${counts.edited}` },
              { value: "draft", label: `Drafts ${counts.draft}` },
            ]}
          />
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="Search title or URL"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ maxWidth: 280 }}
            aria-label="Search pages"
          />
        </Flex>
        <Table<PageRowView>
          rowKey="id"
          columns={columns}
          dataSource={rows}
          pagination={rows.length > 50 ? { pageSize: 50, showSizeChanger: false } : false}
          locale={{ emptyText: <Empty description={query ? "No pages match your search" : "No pages yet"} /> }}
          onRow={(p) => ({ onDoubleClick: () => router.push(`/admin/pages/${p.id}`) })}
          scroll={{ x: 720 }}
        />
      </Card>
      <CreatePageModal
        open={creating}
        onClose={() => setCreating(false)}
        templates={templates}
        pages={pages.map((p) => ({ id: p.id, label: `${p.title} (${slugToPath(p.slug)})` }))}
      />
    </>
  );
}
