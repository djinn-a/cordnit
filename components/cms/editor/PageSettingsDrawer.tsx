"use client";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Divider, Drawer, Flex, Form, Input, Select, Switch, Typography } from "antd";
import { HOME_SLUG, PAGE_SHELLS, PAGE_SPACINGS, slugToPath, type BreadcrumbItem, type PageSeo, type PageShell, type PageSpacing } from "@/lib/cms/document";
import { updatePageMetaAction } from "@/server/actions/pages";
import { useCmsAction } from "../hooks/useCmsAction";
import { applyFieldErrors } from "../shared/form-errors";
import type { EditorPage } from "./types";

type Values = {
  title: string;
  slug: string;
  shell: PageShell;
  spacing: PageSpacing;
  seo: PageSeo;
  breadcrumbs: BreadcrumbItem[];
};

const SHELL_LABELS: Record<PageShell, string> = { default: "Standard", contact: "Contact (extra top padding)" };
const SPACING_LABELS: Record<PageSpacing, string> = {
  default: "Standard",
  compact: "Compact",
  "compact-top": "Compact, tight top",
};

function SerpPreview({ title, description, path }: { title: string; description: string; path: string }) {
  return (
    <Card size="small" style={{ background: "#fafbfc" }} aria-label="Search result preview">
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        cordinit.com{path === "/" ? "" : path.replaceAll("/", " › ")}
      </Typography.Text>
      <div style={{ color: "#1a0dab", fontSize: 18, lineHeight: 1.3, margin: "2px 0" }}>{title || "Untitled"}</div>
      <Typography.Paragraph type="secondary" style={{ margin: 0, fontSize: 13 }} ellipsis={{ rows: 2 }}>
        {description || "Add a meta description so search engines show a helpful summary."}
      </Typography.Paragraph>
    </Card>
  );
}

export default function PageSettingsDrawer({
  open,
  onClose,
  page,
  onSaved,
}: Readonly<{ open: boolean; onClose: () => void; page: EditorPage; onSaved: (lockVersion: number) => void }>) {
  const [form] = Form.useForm<Values>();
  const { run, pending } = useCmsAction();
  const title = Form.useWatch("title", form) ?? page.title;
  const slug = Form.useWatch("slug", form) ?? page.slug;
  const seoTitle = Form.useWatch(["seo", "title"], form);
  const seoDescription = Form.useWatch(["seo", "description"], form);
  const isHome = page.slug === HOME_SLUG;

  async function save() {
    const values = await form.validateFields();
    const result = await run(
      updatePageMetaAction,
      {
        pageId: page.id,
        lockVersion: page.lockVersion,
        ...values,
        seo: {
          title: values.seo?.title?.trim() || undefined,
          description: values.seo?.description?.trim() || undefined,
          canonical: values.seo?.canonical?.trim() || undefined,
          noindex: values.seo?.noindex || undefined,
        },
        breadcrumbs: (values.breadcrumbs ?? []).filter((b) => b?.label?.trim()),
      },
      { success: "Settings saved as draft", silentValidation: true },
    );
    if (result.ok) {
      onSaved(result.data.lockVersion);
      onClose();
      return;
    }
    const leftover = applyFieldErrors(form, result.error.fieldErrors);
    if (result.error.code === "CONFLICT") form.setFields([{ name: "slug", errors: [result.error.message] }]);
    else if (result.error.code === "VALIDATION" && (leftover.length || !result.error.fieldErrors)) form.setFields([{ name: "title", errors: [result.error.message] }]);
  }

  return (
    <Drawer
      title="Page settings"
      open={open}
      onClose={onClose}
      size={520}
      destroyOnHidden
      afterOpenChange={(v) => v && form.setFieldsValue({ ...page, seo: page.seo ?? {}, breadcrumbs: page.breadcrumbs ?? [] })}
      extra={
        <Button type="primary" onClick={save} loading={pending}>
          Save
        </Button>
      }
    >
      <Form<Values> form={form} layout="vertical" requiredMark="optional" preserve={false}>
        <Form.Item label="Page title" name="title" rules={[{ required: true, whitespace: true, message: "Title is required." }, { max: 120 }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="URL"
          name="slug"
          extra={isHome ? "The home page always lives at /." : "Changing the URL of a live page adds a permanent redirect from the old one when you publish."}
          rules={[
            { required: true, message: "URL is required." },
            { pattern: /^[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*$/, message: "Use lowercase letters, numbers and dashes." },
          ]}
        >
          <Input prefix={<span style={{ color: "rgba(0,0,0,0.45)" }}>/</span>} disabled={isHome} spellCheck={false} />
        </Form.Item>
        <Flex gap={12}>
          <Form.Item label="Page frame" name="shell" style={{ flex: 1 }}>
            <Select options={PAGE_SHELLS.map((s) => ({ value: s, label: SHELL_LABELS[s] }))} />
          </Form.Item>
          <Form.Item label="Section spacing" name="spacing" style={{ flex: 1 }}>
            <Select options={PAGE_SPACINGS.map((s) => ({ value: s, label: SPACING_LABELS[s] }))} />
          </Form.Item>
        </Flex>

        <Divider titlePlacement="start" plain>
          Search engines
        </Divider>
        <SerpPreview title={seoTitle || `${title} | Cordinit`} description={seoDescription ?? ""} path={isHome ? "/" : slugToPath(slug || page.slug)} />
        <Form.Item label="SEO title" name={["seo", "title"]} rules={[{ max: 70, message: "Keep SEO titles under 70 characters." }]} style={{ marginTop: 16 }}>
          <Input showCount maxLength={70} placeholder={`${title} | Cordinit`} />
        </Form.Item>
        <Form.Item label="Meta description" name={["seo", "description"]} rules={[{ max: 170, message: "Keep meta descriptions under 170 characters." }]}>
          <Input.TextArea showCount maxLength={170} autoSize={{ minRows: 2, maxRows: 5 }} />
        </Form.Item>
        <Form.Item label="Canonical URL" name={["seo", "canonical"]} extra="Leave empty to use this page's own URL.">
          <Input placeholder="https://cordinit.com/..." spellCheck={false} />
        </Form.Item>
        <Form.Item label="Hide from search engines" name={["seo", "noindex"]} valuePropName="checked">
          <Switch />
        </Form.Item>

        <Divider titlePlacement="start" plain>
          Breadcrumbs
        </Divider>
        <Form.List name="breadcrumbs">
          {(fields, { add, remove }) => (
            <Flex vertical gap={8}>
              {fields.length === 0 && <Alert type="info" showIcon title="No breadcrumbs. They are optional and show above the first section." />}
              {fields.map((field) => (
                <Flex key={field.key} gap={8} align="flex-start">
                  <Form.Item name={[field.name, "label"]} style={{ flex: 1, marginBottom: 0 }} rules={[{ required: true, message: "Label" }]}>
                    <Input placeholder="Label" />
                  </Form.Item>
                  <Form.Item name={[field.name, "href"]} style={{ flex: 1, marginBottom: 0 }}>
                    <Input placeholder="/path (optional)" spellCheck={false} />
                  </Form.Item>
                  <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} aria-label="Remove breadcrumb" />
                </Flex>
              ))}
              <Button type="dashed" icon={<PlusOutlined />} onClick={() => add({ label: "", href: "" })} disabled={fields.length >= 10}>
                Add breadcrumb
              </Button>
            </Flex>
          )}
        </Form.List>
      </Form>
    </Drawer>
  );
}
