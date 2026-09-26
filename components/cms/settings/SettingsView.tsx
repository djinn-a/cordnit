"use client";

import { Button, Card, Descriptions, Form, Input } from "antd";
import { changePasswordAction } from "@/server/actions/auth";
import { useCmsAction } from "../hooks/useCmsAction";
import { applyFieldErrors } from "../shared/form-errors";
import PageHeader from "../shared/PageHeader";

type Values = { currentPassword: string; newPassword: string; confirmPassword: string };

export default function SettingsView({ username }: Readonly<{ username: string }>) {
  const [form] = Form.useForm<Values>();
  const { run, pending } = useCmsAction();

  async function onFinish(values: Values) {
    const r = await run(changePasswordAction, values, { success: "Password changed", silentValidation: true });
    if (r.ok) form.resetFields();
    else applyFieldErrors(form, r.error.fieldErrors);
  }

  return (
    <>
      <PageHeader title="Settings" />
      <div style={{ display: "grid", gap: 16, maxWidth: 560 }}>
        <Card title="Account">
          <Descriptions column={1} items={[{ key: "u", label: "Username", children: username }, { key: "r", label: "Role", children: "Super admin" }]} />
        </Card>
        <Card title="Change password">
          <Form<Values> form={form} layout="vertical" onFinish={onFinish} disabled={pending} requiredMark={false}>
            <Form.Item label="Current password" name="currentPassword" rules={[{ required: true, message: "Enter your current password." }]}>
              <Input.Password autoComplete="current-password" />
            </Form.Item>
            <Form.Item
              label="New password"
              name="newPassword"
              extra="At least 12 characters. A passphrase of 4+ random words works well."
              rules={[{ required: true, message: "Enter a new password." }, { min: 12, message: "Use at least 12 characters." }, { max: 128 }]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>
            <Form.Item
              label="Confirm new password"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Confirm the new password." },
                ({ getFieldValue }) => ({
                  validator: (_, v) => (!v || v === getFieldValue("newPassword") ? Promise.resolve() : Promise.reject(new Error("Passwords do not match."))),
                }),
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={pending}>
              Update password
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
}
