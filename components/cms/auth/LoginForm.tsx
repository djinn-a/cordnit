"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { loginAction } from "@/server/actions/auth";
import { isNavigation } from "../hooks/is-navigation";

type LoginValues = { username: string; password: string };

export default function LoginForm() {
  const params = useSearchParams();
  const [form] = Form.useForm<LoginValues>();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onFinish(values: LoginValues) {
    setSubmitting(true);
    setError(null);
    try {
      // Success redirects server-side (the promise rejects with a navigation), so this is a failure.
      const result = await loginAction({ ...values, next: params?.get("next") ?? undefined });
      if (result.ok) return;
      const fe = result.error.fieldErrors;
      if (fe) {
        form.setFields(
          Object.entries(fe).map(([name, errors]) => ({ name: name as keyof LoginValues, errors })),
        );
      }
      setError(result.error.message);
      form.setFieldValue("password", "");
    } catch (err) {
      // Keep the form disabled while the admin loads.
      if (isNavigation(err)) return;
      setError("Could not reach the server. Check your connection and try again.");
    }
    setSubmitting(false);
  }

  return (
    <Form<LoginValues>
      form={form}
      layout="vertical"
      size="large"
      requiredMark={false}
      onFinish={onFinish}
      disabled={submitting}
      autoComplete="on"
    >
      <Typography.Title level={3} style={{ marginBottom: 4 }}>
        Sign in
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Manage pages, sections and publishing for cordinit.com.
      </Typography.Paragraph>

      {error && <Alert type="error" title={error} showIcon style={{ marginBottom: 16 }} />}

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Enter your username." }]}
      >
        <Input prefix={<UserOutlined />} autoComplete="username" autoFocus spellCheck={false} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Enter your password." }]}
      >
        <Input.Password prefix={<LockOutlined />} autoComplete="current-password" />
      </Form.Item>
      <Button type="primary" htmlType="submit" block loading={submitting}>
        Sign in
      </Button>
    </Form>
  );
}
