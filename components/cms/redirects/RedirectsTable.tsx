"use client";

import { ArrowRightOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Flex, Form, Input, Modal, Popconfirm, Select, Table, Tag, Typography, type TableProps } from "antd";
import { useState } from "react";
import { deleteRedirectAction, upsertRedirectAction } from "@/server/actions/redirects";
import { useCmsAction } from "../hooks/useCmsAction";
import { useRevealKey } from "../hooks/useRevealKey";
import { applyFieldErrors } from "../shared/form-errors";
import PageHeader from "../shared/PageHeader";

export type RedirectRowView = { fromPath: string; toPath: string; statusCode: number };
type Values = { fromPath: string; toPath: string; statusCode: 301 | 302 | 307 | 308 };

export default function RedirectsTable({ redirects }: Readonly<{ redirects: RedirectRowView[] }>) {
  const { run, pending } = useCmsAction();
  const revealKey = useRevealKey();
  const [form] = Form.useForm<Values>();
  const [open, setOpen] = useState(false);

  async function save() {
    const values = await form.validateFields();
    const r = await run(upsertRedirectAction, values, { success: "Redirect saved", silentValidation: true });
    if (r.ok) {
      setOpen(false);
    } else {
      const leftover = applyFieldErrors(form, r.error.fieldErrors);
      if (leftover.length || !r.error.fieldErrors) form.setFields([{ name: "fromPath", errors: [r.error.message] }]);
    }
  }

  const columns: TableProps<RedirectRowView>["columns"] = [
    {
      title: "From",
      dataIndex: "fromPath",
      render: (v: string, r) => (
        <Flex gap={8} align="center" wrap>
          <Typography.Text code>{v}</Typography.Text>
          <ArrowRightOutlined style={{ color: "rgba(0,0,0,0.35)" }} />
          <Typography.Text code>{r.toPath}</Typography.Text>
        </Flex>
      ),
    },
    {
      title: "Type",
      dataIndex: "statusCode",
      width: 140,
      render: (c: number) => (c === 301 || c === 308 ? <Tag color="blue">Permanent {c}</Tag> : <Tag>Temporary {c}</Tag>),
    },
    {
      title: <span className="sr-only">Actions</span>,
      key: "actions",
      width: 80,
      align: "right",
      render: (_, r) => (
        <Popconfirm
          key={revealKey}
          title="Delete this redirect?"
          okText="Delete"
          okButtonProps={{ danger: true }}
          onConfirm={() => run(deleteRedirectAction, { fromPath: r.fromPath }, { success: "Redirect deleted" })}
        >
          <Button type="text" danger icon={<DeleteOutlined />} aria-label={`Delete redirect from ${r.fromPath}`} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Redirects"
        subtitle="Changing a live page's URL adds a permanent redirect automatically. Add manual ones here."
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            New redirect
          </Button>
        }
      />
      <Card styles={{ body: { padding: 0 } }}>
        <Table<RedirectRowView>
          rowKey="fromPath"
          columns={columns}
          dataSource={redirects}
          pagination={redirects.length > 50 ? { pageSize: 50 } : false}
          locale={{ emptyText: <Empty description="No redirects" /> }}
        />
      </Card>
      <Modal title="New redirect" open={open} onCancel={() => setOpen(false)} onOk={save} okText="Save" confirmLoading={pending} destroyOnHidden>
        <Form<Values> form={form} layout="vertical" initialValues={{ fromPath: "", toPath: "", statusCode: 308 }}>
          <Form.Item label="From path" name="fromPath" rules={[{ required: true }, { pattern: /^\/[a-z0-9\-/]*$/, message: "Use a lowercase /path." }]}>
            <Input placeholder="/old-page" spellCheck={false} />
          </Form.Item>
          <Form.Item label="To" name="toPath" rules={[{ required: true }, { pattern: /^(\/[a-z0-9\-/#?=&]*|https?:\/\/.+)$/, message: "Use a /path or https:// URL." }]}>
            <Input placeholder="/new-page or https://..." spellCheck={false} />
          </Form.Item>
          <Form.Item label="Type" name="statusCode">
            <Select
              options={[
                { value: 308, label: "Permanent (308), recommended" },
                { value: 301, label: "Permanent (301)" },
                { value: 307, label: "Temporary (307)" },
                { value: 302, label: "Temporary (302)" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
