"use client";

import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Input, Segmented, Space, Table, Tag, Typography, type TableProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { LEAD_TYPE_LABELS, LEAD_TYPES, type LeadType } from "@/lib/leads/schema";
import PageHeader from "../shared/PageHeader";
import RelativeTime from "../shared/RelativeTime";
import LeadDetailDrawer from "./LeadDetailDrawer";
import { LEAD_TYPE_COLORS, leadName, type LeadFiltersView, type LeadView } from "./lead-view";

function toQuery(filters: Partial<LeadFiltersView>): string {
  const params = new URLSearchParams();
  if (filters.type) params.set("type", filters.type);
  if (filters.q) params.set("q", filters.q);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));
  if (filters.pageSize && filters.pageSize !== 25) params.set("pageSize", String(filters.pageSize));
  return params.toString();
}

export default function LeadsTable({
  leads,
  total,
  countsByType,
  filters,
}: Readonly<{
  leads: LeadView[];
  total: number;
  countsByType: Record<LeadType, number>;
  filters: LeadFiltersView;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<LeadView | null>(null);
  const [search, setSearch] = useState(filters.q ?? "");

  const navigate = (next: Partial<LeadFiltersView>) => {
    const query = toQuery({ ...filters, page: 1, ...next });
    startTransition(() => router.push(query ? `${pathname}?${query}` : pathname));
  };

  const allCount = LEAD_TYPES.reduce((sum, t) => sum + countsByType[t], 0);
  const exportQuery = toQuery({ type: filters.type, q: filters.q, from: filters.from, to: filters.to });

  const columns: TableProps<LeadView>["columns"] = [
    {
      title: "Received",
      dataIndex: "createdAt",
      width: 140,
      render: (v: string) => <RelativeTime value={v} />,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 130,
      render: (t: LeadType) => <Tag color={LEAD_TYPE_COLORS[t]}>{LEAD_TYPE_LABELS[t]}</Tag>,
    },
    {
      title: "Name",
      key: "name",
      render: (_, lead) => leadName(lead) || <Typography.Text type="secondary">—</Typography.Text>,
    },
    { title: "Email", dataIndex: "email", ellipsis: true },
    {
      title: "Company",
      dataIndex: "company",
      ellipsis: true,
      render: (c: string | null) => c ?? <Typography.Text type="secondary">—</Typography.Text>,
    },
    {
      title: "Source",
      key: "source",
      ellipsis: true,
      render: (_, lead) =>
        lead.attribution.ctaLocation ?? <Typography.Text type="secondary">—</Typography.Text>,
    },
    {
      title: "",
      key: "actions",
      width: 80,
      render: (_, lead) => (
        <Button type="text" icon={<EyeOutlined />} aria-label="View lead" onClick={() => setSelected(lead)} />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Leads"
        subtitle="Every lead form, contact page and newsletter submission, newest first."
        extra={
          <Button
            icon={<DownloadOutlined />}
            href={`/admin/leads/export${exportQuery ? `?${exportQuery}` : ""}`}
            disabled={total === 0}
          >
            Export CSV
          </Button>
        }
      />

      <Card style={{ marginBottom: 16 }}>
        <Flex gap={12} wrap align="center" justify="space-between">
          <Segmented<LeadType | "all">
            value={filters.type ?? "all"}
            onChange={(v) => navigate({ type: v === "all" ? undefined : v })}
            options={[
              { value: "all", label: `All (${allCount})` },
              ...LEAD_TYPES.map((t) => ({ value: t, label: `${LEAD_TYPE_LABELS[t]} (${countsByType[t]})` })),
            ]}
          />
          <Space wrap>
            <Input
              type="date"
              aria-label="From date"
              value={filters.from ?? ""}
              max={filters.to}
              onChange={(e) => navigate({ from: e.target.value || undefined })}
              style={{ width: 160 }}
            />
            <Typography.Text type="secondary">to</Typography.Text>
            <Input
              type="date"
              aria-label="To date"
              value={filters.to ?? ""}
              min={filters.from}
              onChange={(e) => navigate({ to: e.target.value || undefined })}
              style={{ width: 160 }}
            />
            <Input.Search
              allowClear
              placeholder="Search name, email, company"
              value={search}
              maxLength={200}
              onChange={(e) => setSearch(e.target.value)}
              onSearch={(value) => navigate({ q: value.trim() || undefined })}
              style={{ width: 280 }}
            />
          </Space>
        </Flex>
      </Card>

      <Card styles={{ body: { padding: 0 } }}>
        <Table<LeadView>
          rowKey="id"
          columns={columns}
          dataSource={leads}
          loading={isPending}
          onRow={(lead) => ({ onDoubleClick: () => setSelected(lead) })}
          locale={{ emptyText: "No leads match these filters." }}
          scroll={{ x: 900 }}
          pagination={{
            current: filters.page,
            pageSize: filters.pageSize,
            total,
            showSizeChanger: true,
            pageSizeOptions: [25, 50, 100],
            showTotal: (t) => `${t} lead${t === 1 ? "" : "s"}`,
            onChange: (page, pageSize) => navigate({ page, pageSize }),
          }}
        />
      </Card>

      <LeadDetailDrawer lead={selected} onClose={() => setSelected(null)} />
    </>
  );
}
