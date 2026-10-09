"use client";

import { ArrowLeftOutlined, CloudUploadOutlined, DeleteOutlined, RollbackOutlined, UndoOutlined } from "@ant-design/icons";
import { Alert, App, Button, Card, Empty, Flex, Form, Input, Space, Tag, Typography } from "antd";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SITE_FOOTER_BLOCK_KEY, SITE_NAVBAR_BLOCK_KEY, slugToPath } from "@/lib/cms/document";
import { collectChromeLinks, findDeadInternalLinks, isDeadInternalLink } from "@/lib/cms/site-chrome";
import { deleteBlockAction, publishBlockAction, restoreBlockVersionAction, updateBlockAction } from "@/server/actions/blocks";
import SchemaForm, { type JsonSchemaNode } from "../form/SchemaForm";
import { useCmsAction } from "../hooks/useCmsAction";
import { applyFieldErrors } from "../shared/form-errors";
import ItemList from "../shared/ItemList";
import PageHeader from "../shared/PageHeader";
import RelativeTime from "../shared/RelativeTime";

export type BlockEditorData = {
  id: string;
  key: string;
  type: string;
  name: string;
  typeLabel: string;
  content: Record<string, unknown>;
  lockVersion: number;
  publishedVersion: number | null;
  hasUnpublishedChanges: boolean;
  schema: JsonSchemaNode;
  usages: { pageId: string; title: string; slug: string }[];
  versions: { version: number; createdAt: Date | string; note: string | null }[];
  /** Site chrome only: published page paths and redirect sources, for link warnings. */
  livePaths?: string[];
};

const UNPUBLISHED_LINK = "This page is not published, so the link cannot be published. Publish the page first or pick another destination.";

export default function BlockEditor({ data }: Readonly<{ data: BlockEditorData }>) {
  const { modal, message } = App.useApp();
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
  const isSiteChrome = data.key === SITE_NAVBAR_BLOCK_KEY || data.key === SITE_FOOTER_BLOCK_KEY;
  const livePaths = useMemo(() => (data.livePaths ? new Set(data.livePaths) : null), [data.livePaths]);
  const values = Form.useWatch([], { form, preserve: true });
  const deadLinks = useMemo(
    () => (livePaths ? findDeadInternalLinks(collectChromeLinks(data.type, values ?? data.content), livePaths) : []),
    [livePaths, data.type, values, data.content],
  );
  const linkWarning = livePaths ? (href: string) => (isDeadInternalLink(href, livePaths) ? UNPUBLISHED_LINK : undefined) : undefined;

  async function save() {
    try {
      await form.validateFields();
    } catch {
      return;
    }
    const r = await run(
      updateBlockAction,
      { blockId: data.id, lockVersion, name: name.trim() || data.name, content: form.getFieldsValue(true) },
      { success: isSiteChrome ? "Saved. Publish to update the site." : "Saved. Publish to update every page.", silentValidation: true },
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
    const r = await run(publishBlockAction, { blockId: data.id, lockVersion }, { success: isSiteChrome ? "Published site-wide." : `Published. ${data.usages.length} page(s) updated.` });
    if (r.ok) {
      setLockVersion(r.data.lockVersion);
      setUnpublished(false);
    }
  }

  function confirmRestore(version: number) {
    modal.confirm({
      title: `Restore version ${version}?`,
      content: "This immediately publishes that snapshot as a new version and replaces the current draft. Existing history is kept.",
      okText: "Restore and publish",
      onOk: async () => {
        const result = await run(restoreBlockVersionAction, { blockId: data.id, lockVersion, version });
        if (result.ok) {
          message.success(`Restored v${version} as v${result.data.publishedVersion}.`);
          setLockVersion(result.data.lockVersion);
          form.setFieldsValue(result.data.content);
          setDirty(false);
          setUnpublished(false);
        }
      },
    });
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
        subtitle={isSiteChrome ? `${data.typeLabel} · shown on every page` : `${data.typeLabel} · used on ${data.usages.length} page(s)`}
        extra={
          <>
            <Button
              danger
              icon={<DeleteOutlined />}
              disabled={data.usages.length > 0 || isSiteChrome}
              title={isSiteChrome ? "Site chrome is managed by the site layout" : data.usages.length ? "Remove or detach it from every page first" : undefined}
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
              {isSiteChrome ? "Publish site-wide" : "Publish to all pages"}
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
          <SchemaForm
            form={form}
            schema={data.schema}
            initialValues={data.content}
            onDirtyChange={setDirty}
            disabled={pending}
            linkWarning={linkWarning}
            header={
              deadLinks.length > 0 ? (
                <Alert
                  type="warning"
                  showIcon
                  style={{ marginBottom: 16 }}
                  title={`${deadLinks.length} link(s) point to pages that are not published`}
                  description={
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {deadLinks.slice(0, 10).map((d) => (
                        <li key={`${d.where}-${d.href}`}>{d.where}: {d.href}</li>
                      ))}
                    </ul>
                  }
                />
              ) : undefined
            }
          />
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
                    <div style={{ minWidth: 0 }}>
                      <Typography.Text strong style={{ display: "block" }}>Version {v.version}</Typography.Text>
                      <Typography.Text type="secondary" style={{ display: "block", fontSize: 12 }}>
                        <RelativeTime value={v.createdAt} />
                      </Typography.Text>
                    </div>
                    {isSiteChrome && (v.version !== data.publishedVersion || unpublished) ? (
                      <Button
                        size="small"
                        icon={<RollbackOutlined />}
                        disabled={isDirty || pending}
                        onClick={() => confirmRestore(v.version)}
                      >
                        Restore
                      </Button>
                    ) : v.version === data.publishedVersion ? <Tag color="green">Live</Tag> : null}
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
