"use client";

import { ArrowLeftOutlined, CloudUploadOutlined, DeleteOutlined, UndoOutlined } from "@ant-design/icons";
import { Alert, App, Button, Card, Empty, Flex, Form, Input, Space, Tag, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";
import { slugToPath } from "@/lib/cms/document";
import { deleteBlockAction, publishBlockAction, updateBlockAction } from "@/server/actions/blocks";
import SchemaForm, { type JsonSchemaNode } from "../form/SchemaForm";
import { useCmsAction } from "../hooks/useCmsAction";
import { applyFieldErrors } from "../shared/form-errors";
import ItemList from "../shared/ItemList";
import PageHeader from "../shared/PageHeader";
import RelativeTime from "../shared/RelativeTime";

export type BlockEditorData = {
  id: string;
  name: string;
  typeLabel: string;
  content: Record<string, unknown>;
  lockVersion: number;
  publishedVersion: number | null;
  hasUnpublishedChanges: boolean;
  schema: JsonSchemaNode;
  usages: { pageId: string; title: string; slug: string }[];
  versions: { version: number; createdAt: Date | string; note: string | null }[];
};

export default function BlockEditor({ data }: Readonly<{ data: BlockEditorData }>) {
  const { modal } = App.useApp();
  const { run, navigate, pending } = useCmsAction();
  const [form] = Form.useForm<Record<string, unknown>>();
  const [synced, setSynced] = useState(data);
  const [lockVersion, setLockVersion] = useState(data.lockVersion);
  const [name, setName] = useState(data.name);
  const [dirty, setDirty] = useState(false);
  const [unpublished, setUnpublished] = useState(data.hasUnpublishedChanges || data.publishedVersion === null);
  if (synced !== data) {
    setSynced(data);
    setLockVersion(data.lockVersion);
    setUnpublished(data.hasUnpublishedChanges || data.publishedVersion === null);
  }
  const isDirty = dirty || name !== data.name;

  async function save() {
    try {
      await form.validateFields();
    } catch {
      return;
    }
    const r = await run(
      updateBlockAction,
      { blockId: data.id, lockVersion, name: name.trim() || data.name, content: form.getFieldsValue(true) },
      { success: "Saved. Publish to update every page.", silentValidation: true },
    );
    if (r.ok) {
      setLockVersion(r.data.lockVersion);
      setDirty(false);
      setUnpublished(true);
    } else if (r.error.code === "VALIDATION") {
      applyFieldErrors(form, r.error.fieldErrors);
    }
  }

  async function publish() {
    const r = await run(publishBlockAction, { blockId: data.id, lockVersion }, { success: `Published. ${data.usages.length} page(s) updated.` });
    if (r.ok) {
      setLockVersion(r.data.lockVersion);
      setUnpublished(false);
    }
  }

  return (
    <>
      <PageHeader
        title={
          <Flex align="center" gap={12}>
            <Link href="/admin/blocks"><Button icon={<ArrowLeftOutlined />} aria-label="Back to Global Blocks" /></Link>
            {data.name}
            {unpublished ? <Tag color="gold">Unpublished changes</Tag> : <Tag color="green">Live · v{data.publishedVersion}</Tag>}
          </Flex>
        }
        subtitle={`${data.typeLabel} · used on ${data.usages.length} page(s)`}
        extra={
          <>
            <Button
              danger
              icon={<DeleteOutlined />}
              disabled={data.usages.length > 0}
              title={data.usages.length ? "Remove or detach it from every page first" : undefined}
              onClick={() =>
                modal.confirm({
                  title: `Delete “${data.name}”?`,
                  okText: "Delete",
                  okButtonProps: { danger: true },
                  onOk: () => navigate(deleteBlockAction, { blockId: data.id, lockVersion }, { success: "Global Block deleted" }),
                })
              }
            >
              Delete
            </Button>
            <Button type="primary" icon={<CloudUploadOutlined />} onClick={publish} disabled={isDirty || !unpublished} loading={pending}>
              Publish to all pages
            </Button>
          </>
        }
      />
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 320px", gap: 16, alignItems: "start" }}>
        <Card
          title={<Input variant="borderless" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} aria-label="Block name" style={{ fontWeight: 600, fontSize: 16, padding: 0 }} />}
          extra={
            <Space>
              <Button icon={<UndoOutlined />} disabled={!isDirty} onClick={() => { form.resetFields(); setName(data.name); setDirty(false); }}>
                Discard
              </Button>
              <Button type="primary" onClick={save} disabled={!isDirty} loading={pending}>
                Save
              </Button>
            </Space>
          }
        >
          <SchemaForm form={form} schema={data.schema} initialValues={data.content} onDirtyChange={setDirty} disabled={pending} />
        </Card>
        <Flex vertical gap={16}>
          <Card size="small" title="Used on">
            {data.usages.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Not used on any page" />
            ) : (
              <ItemList
                compact
                items={data.usages}
                rowKey={(u) => u.pageId}
                renderItem={(u) => (
                  <>
                    <Link href={`/admin/pages/${u.pageId}`}>{u.title}</Link>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>{slugToPath(u.slug)}</Typography.Text>
                  </>
                )}
              />
            )}
          </Card>
          <Card size="small" title="Published versions">
            {data.versions.length === 0 ? (
              <Alert type="warning" showIcon title="Never published" />
            ) : (
              <ItemList
                compact
                items={data.versions}
                rowKey={(v) => v.version}
                renderItem={(v) => (
                  <>
                    <span>v{v.version}</span>
                    <RelativeTime value={v.createdAt} />
                  </>
                )}
              />
            )}
          </Card>
        </Flex>
      </div>
    </>
  );
}
