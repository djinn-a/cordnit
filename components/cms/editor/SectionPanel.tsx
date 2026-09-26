"use client";

import { BlockOutlined, DisconnectOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import { Alert, Badge, Button, Card, Empty, Flex, Form, Input, Skeleton, Space, Typography } from "antd";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { updateSectionAction } from "@/server/actions/sections";
import SchemaForm, { type JsonSchemaNode } from "../form/SchemaForm";
import { useCmsAction } from "../hooks/useCmsAction";
import { applyFieldErrors } from "../shared/form-errors";
import type { EditorBlock, EditorSection } from "./types";

type Props = {
  pageId: string;
  lockVersion: number;
  section: EditorSection | null;
  schema: JsonSchemaNode | undefined;
  typeLabel: string;
  block: EditorBlock | undefined;
  serverError?: string[];
  onSaved: (section: EditorSection, lockVersion: number) => void;
  onDirtyChange: (dirty: boolean) => void;
  onDetach: (section: EditorSection) => void;
};

export default function SectionPanel({
  pageId,
  lockVersion,
  section,
  schema,
  typeLabel,
  block,
  serverError,
  onSaved,
  onDirtyChange,
  onDetach,
}: Readonly<Props>) {
  const [form] = Form.useForm<Record<string, unknown>>();
  const { run, pending } = useCmsAction();
  const [dirty, setDirty] = useState(false);
  const [label, setLabel] = useState(section?.label ?? "");
  const [formError, setFormError] = useState<string | null>(null);

  const markDirty = setDirty;
  const labelDirty = (section?.label ?? "") !== label;
  const isDirty = dirty || labelDirty;

  useEffect(() => onDirtyChange(isDirty), [isDirty, onDirtyChange]);

  const save = useCallback(async () => {
    if (!section || section.globalBlockId) return;
    setFormError(null);
    try {
      await form.validateFields();
    } catch {
      setFormError("Fix the highlighted fields before saving.");
      return;
    }
    const content = form.getFieldsValue(true);
    const result = await run(
      updateSectionAction,
      { pageId, lockVersion, sectionId: section.id, label: label.trim() || null, content },
      { success: "Saved to draft", silentValidation: true },
    );
    if (result.ok) {
      const saved = result.data.section;
      form.resetFields();
      form.setFieldsValue(saved.content);
      markDirty(false);
      onSaved({ ...section, label: saved.label, content: saved.content }, result.data.lockVersion);
      return;
    }
    if (result.error.code === "VALIDATION") {
      const leftover = applyFieldErrors(form, result.error.fieldErrors);
      setFormError(leftover.length ? leftover.join(" ") : result.error.message);
    }
  }, [form, label, lockVersion, markDirty, onSaved, pageId, run, section]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (isDirty && !pending) void save();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDirty, pending, save]);

  if (!section) {
    return (
      <Card style={{ height: "100%" }}>
        <Empty description="Select a section to edit its text" style={{ marginTop: 64 }} />
      </Card>
    );
  }

  if (section.globalBlockId) {
    return (
      <Card title={<Space><BlockOutlined />{block?.name ?? "Global Block"}</Space>}>
        <Alert
          type="info"
          showIcon
          title="This section is a shared Global Block"
          description="Its text is edited once and updates every page that uses it. Detach to make a page-only copy instead."
          style={{ marginBottom: 16 }}
        />
        <Space wrap>
          <Link href={`/admin/blocks/${section.globalBlockId}`}>
            <Button type="primary" icon={<EditOutlined />}>Edit Global Block</Button>
          </Link>
          <Button icon={<DisconnectOutlined />} onClick={() => onDetach(section)}>
            Detach
          </Button>
        </Space>
      </Card>
    );
  }

  return (
    <Card
      title={
        <Flex vertical style={{ padding: "8px 0" }}>
          <Input
            variant="borderless"
            value={label}
            placeholder={typeLabel}
            onChange={(e) => setLabel(e.target.value)}
            maxLength={80}
            aria-label="Section name (only visible in the CMS)"
            style={{ fontWeight: 600, fontSize: 16, padding: 0 }}
          />
          <Typography.Text type="secondary" style={{ fontSize: 12, fontWeight: 400 }}>
            {typeLabel}
          </Typography.Text>
        </Flex>
      }
      extra={
        <Space>
          <Button
            icon={<UndoOutlined />}
            disabled={!isDirty || pending}
            onClick={() => {
              form.resetFields();
              setLabel(section.label ?? "");
              markDirty(false);
              setFormError(null);
            }}
          >
            Discard
          </Button>
          <Badge dot={isDirty} offset={[-4, 4]}>
            <Button type="primary" onClick={save} loading={pending} disabled={!isDirty}>
              Save
            </Button>
          </Badge>
        </Space>
      }
      styles={{ body: { maxHeight: "calc(100vh - 230px)", overflowY: "auto" } }}
    >
      {(formError || serverError?.length) && (
        <Alert type="error" showIcon title={formError ?? serverError?.join(" ")} style={{ marginBottom: 16 }} />
      )}
      {schema ? (
        <SchemaForm form={form} schema={schema} initialValues={section.content} onDirtyChange={markDirty} disabled={pending} />
      ) : (
        <Skeleton active paragraph={{ rows: 6 }} />
      )}
    </Card>
  );
}
