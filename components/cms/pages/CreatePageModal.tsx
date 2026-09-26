"use client";

import { Form, Input, Modal, Radio, Select } from "antd";
import { useRef } from "react";
import { slugify } from "@/lib/cms/slugify";
import { createPageAction } from "@/server/actions/pages";
import { useCmsAction } from "../hooks/useCmsAction";
import { applyFieldErrors } from "../shared/form-errors";

type Option = { id: string; label: string };
type Values = { title: string; slug: string; kind: "blank" | "template" | "clone"; templateId?: string; pageId?: string };

type Props = {
  open: boolean;
  onClose: () => void;
  templates: Option[];
  pages: Option[];
  initial?: Partial<Values>;
};

export default function CreatePageModal({ open, onClose, templates, pages, initial }: Readonly<Props>) {
  const [form] = Form.useForm<Values>();
  const { navigate, pending } = useCmsAction();
  const slugTouched = useRef(false);
  const kind = Form.useWatch("kind", form);

  async function submit() {
    const values = await form.validateFields();
    const source =
      values.kind === "template" && values.templateId
        ? ({ kind: "template", templateId: values.templateId } as const)
        : values.kind === "clone" && values.pageId
          ? ({ kind: "clone", pageId: values.pageId } as const)
          : ({ kind: "blank" } as const);
    const failure = await navigate(
      createPageAction,
      { title: values.title, slug: values.slug, source },
      { success: "Page created", silentValidation: true },
    );
    if (!failure) {
      onClose();
      form.resetFields();
      return;
    }
    const { error } = failure;
    const leftover = applyFieldErrors(form, error.fieldErrors);
    if (error.code === "CONFLICT" || error.code === "VALIDATION") {
      if (!error.fieldErrors || leftover.length) form.setFields([{ name: "slug", errors: [error.message] }]);
    }
  }

  return (
    <Modal
      title="New page"
      open={open}
      onCancel={onClose}
      onOk={submit}
      okText="Create page"
      confirmLoading={pending}
      destroyOnHidden
      afterOpenChange={(visible) => {
        if (visible) {
          slugTouched.current = Boolean(initial?.slug);
          form.setFieldsValue({ kind: "blank", ...initial });
        }
      }}
    >
      <Form<Values>
        form={form}
        layout="vertical"
        requiredMark="optional"
        preserve={false}
        onValuesChange={(changed: Partial<Values>) => {
          if ("slug" in changed) slugTouched.current = true;
          if ("title" in changed && !slugTouched.current) form.setFieldValue("slug", slugify(changed.title ?? ""));
        }}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true, whitespace: true, message: "Title is required." }, { max: 120 }]}>
          <Input placeholder="e.g. Managed Detection & Response" autoFocus />
        </Form.Item>
        <Form.Item
          label="URL"
          name="slug"
          extra="Lowercase words separated by dashes. Use / for nested pages, e.g. cybersecurity/mdr."
          rules={[
            { required: true, message: "URL is required." },
            { pattern: /^[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*$/, message: "Use lowercase letters, numbers and dashes." },
          ]}
        >
          <Input prefix={<span style={{ color: "rgba(0,0,0,0.45)" }}>/</span>} spellCheck={false} />
        </Form.Item>
        <Form.Item label="Start from" name="kind">
          <Radio.Group
            optionType="button"
            options={[
              { value: "blank", label: "Blank" },
              { value: "template", label: "Layout", disabled: templates.length === 0 },
              { value: "clone", label: "Copy of page" },
            ]}
          />
        </Form.Item>
        {kind === "template" && (
          <Form.Item label="Layout" name="templateId" rules={[{ required: true, message: "Choose a layout." }]}>
            <Select showSearch={{ optionFilterProp: "label" }} options={templates.map((t) => ({ value: t.id, label: t.label }))} />
          </Form.Item>
        )}
        {kind === "clone" && (
          <Form.Item label="Page to copy" name="pageId" rules={[{ required: true, message: "Choose a page." }]}>
            <Select showSearch={{ optionFilterProp: "label" }} options={pages.map((p) => ({ value: p.id, label: p.label }))} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
