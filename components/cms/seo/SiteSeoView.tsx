"use client";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, App, Button, Card, Flex, Form, Input, Switch, Tag, Typography } from "antd";
import { useState } from "react";
import type { SeoImage, SiteSeo } from "@/lib/cms/document";
import { SYSTEM_DISALLOW, applyTitleTemplate } from "@/lib/seo/site";
import { saveSiteSeoAction } from "@/server/actions/site-settings";
import { useCmsAction } from "../hooks/useCmsAction";
import { applyFieldErrors } from "../shared/form-errors";
import PageHeader from "../shared/PageHeader";
import SeoImageField from "../shared/SeoImageField";

function trimOrUndefined(value: string | undefined): string | undefined {
  return value?.trim() || undefined;
}

function cleanImage(image: SeoImage | undefined): SeoImage | undefined {
  if (!image?.url) return undefined;
  return { url: image.url, width: image.width, height: image.height, alt: trimOrUndefined(image.alt) };
}

function cleanList(values: string[] | undefined): string[] {
  return [...new Set((values ?? []).map((v) => v?.trim()).filter(Boolean))];
}

export default function SiteSeoView({ initial, lockVersion: initialLock }: Readonly<{ initial: SiteSeo; lockVersion: number }>) {
  const [form] = Form.useForm<SiteSeo>();
  const { run, pending } = useCmsAction();
  const { message } = App.useApp();
  const [lockVersion, setLockVersion] = useState(initialLock);
  const template = Form.useWatch("titleTemplate", form) ?? initial.titleTemplate;
  const discourageAll = Form.useWatch(["robots", "discourageAll"], form) ?? initial.robots.discourageAll;

  async function save() {
    const v = await form.validateFields();
    const seo: SiteSeo = {
      siteName: v.siteName.trim(),
      titleTemplate: v.titleTemplate.trim(),
      defaultTitle: v.defaultTitle.trim(),
      defaultDescription: v.defaultDescription.trim(),
      defaultOgImage: cleanImage(v.defaultOgImage),
      twitterHandle: trimOrUndefined(v.twitterHandle),
      organization: {
        legalName: trimOrUndefined(v.organization?.legalName),
        logo: cleanImage(v.organization?.logo),
        sameAs: cleanList(v.organization?.sameAs),
      },
      robots: { discourageAll: v.robots?.discourageAll === true, extraDisallow: cleanList(v.robots?.extraDisallow) },
    };
    const r = await run(saveSiteSeoAction, { lockVersion, seo }, { success: "SEO settings are live", silentValidation: true });
    if (r.ok) {
      setLockVersion(r.data.lockVersion);
      return;
    }
    const fieldErrors = r.error.fieldErrors
      ? Object.fromEntries(Object.entries(r.error.fieldErrors).map(([key, errs]) => [key.replace(/^seo\.?/, ""), errs]))
      : undefined;
    const leftover = applyFieldErrors(form, fieldErrors);
    if (r.error.code === "VALIDATION" && leftover.length) message.error(leftover[0]);
  }

  return (
    <>
      <PageHeader
        title="SEO"
        subtitle="Site-wide defaults for search engines and social sharing. Changes go live as soon as you save."
        extra={
          <Button type="primary" onClick={save} loading={pending}>
            Save
          </Button>
        }
      />
      <Form<SiteSeo> form={form} layout="vertical" initialValues={initial} requiredMark="optional" disabled={pending}>
        <div style={{ display: "grid", gap: 16, maxWidth: 720 }}>
          <Card title="Site defaults">
            <Form.Item label="Site name" name="siteName" rules={[{ required: true, whitespace: true, message: "Site name is required." }, { max: 60 }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Title template"
              name="titleTemplate"
              extra={`%s is replaced by the page title, e.g. "${applyTitleTemplate(template || "%s", "About Us")}".`}
              rules={[
                { required: true, message: "Title template is required." },
                { max: 80 },
                { validator: (_, v: string) => (!v || v.includes("%s") ? Promise.resolve() : Promise.reject(new Error("Include %s where the page title goes."))) },
              ]}
            >
              <Input spellCheck={false} />
            </Form.Item>
            <Form.Item label="Default title" name="defaultTitle" extra="Used when a page has no title of its own." rules={[{ required: true, whitespace: true }, { max: 70 }]}>
              <Input showCount maxLength={70} />
            </Form.Item>
            <Form.Item
              label="Default meta description"
              name="defaultDescription"
              extra="Used when a page has no meta description."
              rules={[{ required: true, whitespace: true }, { max: 170 }]}
            >
              <Input.TextArea showCount maxLength={170} autoSize={{ minRows: 2, maxRows: 4 }} />
            </Form.Item>
            <Form.Item label="Default share image" name="defaultOgImage" extra="Shown when a page has no share image of its own.">
              <SeoImageField />
            </Form.Item>
            <Form.Item label="X (Twitter) handle" name="twitterHandle" rules={[{ pattern: /^@?[A-Za-z0-9_]{1,15}$/, message: "Use a handle like @cordinit." }]}>
              <Input placeholder="@cordinit" spellCheck={false} />
            </Form.Item>
          </Card>

          <Card title="Organization" extra={<Typography.Text type="secondary">Helps search engines show your brand panel</Typography.Text>}>
            <Form.Item label="Legal name" name={["organization", "legalName"]} rules={[{ max: 120 }]}>
              <Input placeholder="Cordinit Ltd" />
            </Form.Item>
            <Form.Item label="Logo" name={["organization", "logo"]} extra="Square or wide PNG on a plain background, at least 112px.">
              <SeoImageField recommended={null} />
            </Form.Item>
            <Form.Item label="Social profiles" extra="Full https:// links, e.g. your LinkedIn company page.">
              <Form.List name={["organization", "sameAs"]}>
                {(fields, { add, remove }) => (
                  <Flex vertical gap={8}>
                    {fields.map((field) => (
                      <Flex key={field.key} gap={8} align="flex-start">
                        <Form.Item
                          name={field.name}
                          style={{ flex: 1, marginBottom: 0 }}
                          rules={[{ required: true, message: "Enter a URL." }, { pattern: /^https:\/\/\S+$/, message: "Use a full https:// URL." }]}
                        >
                          <Input placeholder="https://www.linkedin.com/company/..." spellCheck={false} />
                        </Form.Item>
                        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} aria-label="Remove profile" />
                      </Flex>
                    ))}
                    <Button type="dashed" icon={<PlusOutlined />} onClick={() => add("")} disabled={fields.length >= 10}>
                      Add profile
                    </Button>
                  </Flex>
                )}
              </Form.List>
            </Form.Item>
          </Card>

          <Card title="Crawling">
            <Form.Item
              label="Discourage all search engines"
              name={["robots", "discourageAll"]}
              valuePropName="checked"
              extra="Blocks every crawler in robots.txt, empties the sitemap and marks every page noindex. Use only for staging or emergencies."
            >
              <Switch />
            </Form.Item>
            {discourageAll && (
              <Alert type="error" showIcon style={{ marginBottom: 16 }} title="Search engines will drop this site from results while this is on." />
            )}
            <Form.Item label="Always blocked">
              <Flex gap={6} wrap>
                {SYSTEM_DISALLOW.map((p) => (
                  <Tag key={p}>{p}</Tag>
                ))}
              </Flex>
            </Form.Item>
            <Form.Item label="Also block these paths" extra="Each path must start with /. Prefer “Hide from search engines” on a page for single pages.">
              <Form.List name={["robots", "extraDisallow"]}>
                {(fields, { add, remove }) => (
                  <Flex vertical gap={8}>
                    {fields.map((field) => (
                      <Flex key={field.key} gap={8} align="flex-start">
                        <Form.Item
                          name={field.name}
                          style={{ flex: 1, marginBottom: 0 }}
                          rules={[{ required: true, message: "Enter a path." }, { pattern: /^\/\S*$/, message: "Start with / and use no spaces." }]}
                        >
                          <Input placeholder="/drafts/" spellCheck={false} />
                        </Form.Item>
                        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} aria-label="Remove path" />
                      </Flex>
                    ))}
                    <Button type="dashed" icon={<PlusOutlined />} onClick={() => add("")} disabled={fields.length >= 30}>
                      Add path
                    </Button>
                  </Flex>
                )}
              </Form.List>
            </Form.Item>
          </Card>
        </div>
      </Form>
    </>
  );
}
