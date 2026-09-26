"use client";

import { Card, Table, Tag, Typography, type TableProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import PageHeader from "../shared/PageHeader";
import RelativeTime from "../shared/RelativeTime";

export type AuditRowView = {
  id: number;
  action: string;
  entityType: string;
  summary: string | null;
  createdAt: Date | string;
};

const ACTION_COLORS: Record<string, string> = {
  publish: "green",
  rollback: "purple",
  unpublish: "orange",
  delete: "red",
  create: "blue",
};

function colorFor(action: string): string | undefined {
  const verb = action.split(".")[1] ?? "";
  return ACTION_COLORS[verb];
}

export default function ActivityTable({
  rows,
  total,
  page,
  pageSize,
}: Readonly<{ rows: AuditRowView[]; total: number; page: number; pageSize: number }>) {
  const router = useRouter();
  const pathname = usePathname();

  const columns: TableProps<AuditRowView>["columns"] = [
    { title: "When", dataIndex: "createdAt", width: 150, render: (v: AuditRowView["createdAt"]) => <RelativeTime value={v} /> },
    {
      title: "Action",
      dataIndex: "action",
      width: 190,
      render: (a: string) => <Tag color={colorFor(a)}>{a.replace(".", " · ").replaceAll("_", " ")}</Tag>,
    },
    { title: "Details", dataIndex: "summary", render: (s: string | null) => <Typography.Text>{s ?? "—"}</Typography.Text> },
  ];

  return (
    <>
      <PageHeader title="Activity" subtitle="Every change made in the CMS, newest first." />
      <Card styles={{ body: { padding: 0 } }}>
        <Table<AuditRowView>
          rowKey="id"
          columns={columns}
          dataSource={rows}
          pagination={{
            current: page,
            pageSize,
            total,
            showSizeChanger: false,
            onChange: (p) => router.push(`${pathname}?page=${p}`),
          }}
        />
      </Card>
    </>
  );
}
