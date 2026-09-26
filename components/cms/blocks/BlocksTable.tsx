"use client";

import { BlockOutlined } from "@ant-design/icons";
import { Alert, Card, Empty, Table, Tag, Typography, type TableProps } from "antd";
import Link from "next/link";
import PageHeader from "../shared/PageHeader";
import RelativeTime from "../shared/RelativeTime";

export type BlockRowView = {
  id: string;
  name: string;
  key: string;
  typeLabel: string;
  usageCount: number;
  publishedVersion: number | null;
  hasUnpublishedChanges: boolean;
  updatedAt: Date | string;
};

export default function BlocksTable({ blocks }: Readonly<{ blocks: BlockRowView[] }>) {
  const columns: TableProps<BlockRowView>["columns"] = [
    {
      title: "Block",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, b) => (
        <Link href={`/admin/blocks/${b.id}`}>
          <Typography.Text strong>{b.name}</Typography.Text>
          <Typography.Text type="secondary" style={{ display: "block", fontSize: 12 }}>
            {b.typeLabel} · {b.key}
          </Typography.Text>
        </Link>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 160,
      render: (_, b) =>
        b.publishedVersion === null ? (
          <Tag>Draft</Tag>
        ) : b.hasUnpublishedChanges ? (
          <Tag color="gold">Live · edited</Tag>
        ) : (
          <Tag color="green">Live · v{b.publishedVersion}</Tag>
        ),
    },
    {
      title: "Used on",
      dataIndex: "usageCount",
      width: 120,
      align: "right",
      sorter: (a, b) => a.usageCount - b.usageCount,
      render: (n: number) => `${n} section${n === 1 ? "" : "s"}`,
    },
    { title: "Updated", dataIndex: "updatedAt", width: 150, render: (v: BlockRowView["updatedAt"]) => <RelativeTime value={v} /> },
  ];

  return (
    <>
      <PageHeader title="Global Blocks" subtitle="Shared sections: edit once, update every page that uses them." />
      {blocks.length === 0 && (
        <Alert
          type="info"
          showIcon
          icon={<BlockOutlined />}
          title="No Global Blocks yet"
          description="Open any page, use the ⋯ menu on a section and choose “Make Global Block”. It can then be added to other pages."
          style={{ marginBottom: 16 }}
        />
      )}
      <Card styles={{ body: { padding: 0 } }}>
        <Table<BlockRowView>
          rowKey="id"
          columns={columns}
          dataSource={blocks}
          pagination={false}
          locale={{ emptyText: <Empty description="No Global Blocks" /> }}
          scroll={{ x: 640 }}
        />
      </Card>
    </>
  );
}
