"use client";

import { Form, Input, Modal } from "antd";
import { useRef, useState } from "react";
import { slugify } from "@/lib/cms/slugify";
import type { ActionResult } from "@/lib/types/result";
import { applyFieldErrors } from "./form-errors";

export type NameKeyValues = { name: string; key: string; description?: string };

/** Small "name + key" dialog shared by "Make Global Block" and "Save as layout". */
export default function NameKeyModal({
  open,
  title,
  okText,
  initialName,
  withDescription,
  help,
  onCancel,
  onSubmit,
}: Readonly<{
  open: boolean;
  title: string;
  okText: string;
  initialName?: string;
  withDescription?: boolean;
  help?: string;
  onCancel: () => void;
  onSubmit: (values: NameKeyValues) => Promise<ActionResult<unknown>>;
}>) {
  const [form] = Form.useForm<NameKeyValues>();
  const keyTouched = useRef(false);
  const [submitting, setSubmitting] = useState(false);

  return (
    <Modal
      title={title}
      open={open}
      okText={okText}
      onCancel={onCancel}
      destroyOnHidden
      afterOpenChange={(v) => {
        if (!v) return;
        keyTouched.current = false;
        form.setFieldsValue({ name: initialName ?? "", key: slugify(initialName ?? "").replaceAll("/", "-") });
      }}
      confirmLoading={submitting}
      onOk={async () => {
        const values = await form.validateFields();
        setSubmitting(true);
        try {
          const result = await onSubmit(values);
          if (!result.ok) {
            const leftover = applyFieldErrors(form, result.error.fieldErrors);
            if (result.error.code === "CONFLICT" || leftover.length) form.setFields([{ name: "key", errors: [result.error.message] }]);
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {help && <p style={{ marginTop: 0, color: "rgba(0,0,0,0.55)" }}>{help}</p>}
      <Form<NameKeyValues>
        form={form}
        layout="vertical"
        preserve={false}
        onValuesChange={(changed: Partial<NameKeyValues>) => {
          if ("key" in changed) keyTouched.current = true;
          if ("name" in changed && !keyTouched.current) form.setFieldValue("key", slugify(changed.name ?? "").replaceAll("/", "-"));
        }}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, whitespace: true, message: "Name is required." }, { max: 80 }]}>
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          label="Key"
          name="key"
          extra="Unique identifier used by developers."
          rules={[
            { required: true, message: "Key is required." },
            { pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/, message: "Lowercase letters, numbers and dashes." },
            { min: 2, max: 60 },
          ]}
        >
          <Input spellCheck={false} />
        </Form.Item>
        {withDescription && (
          <Form.Item label="Description" name="description" rules={[{ max: 300 }]}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
