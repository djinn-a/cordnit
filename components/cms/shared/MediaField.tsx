"use client";

import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { createClient } from "@supabase/supabase-js";
import { Alert, App, Button, Flex, Image, Input, Typography, Upload } from "antd";
import { useState } from "react";
import type { SeoImage } from "@/lib/cms/document";
import { MEDIA_RULES, describeRule, type MediaPurpose, type MediaType } from "@/lib/cms/media";
import { createMediaUploadAction, verifyMediaUploadAction } from "@/server/actions/media";
import { useCmsAction } from "../hooks/useCmsAction";

let browserStorage: ReturnType<typeof createClient> | null = null;
function storage() {
  browserStorage ??= createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return browserStorage.storage;
}

function readDimensions(file: File): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      resolve(img.naturalWidth && img.naturalHeight ? { width: img.naturalWidth, height: img.naturalHeight } : null);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

export type MediaFieldProps = {
  value?: SeoImage;
  onChange?: (value: SeoImage | undefined) => void;
  purpose: MediaPurpose;
  /** Recommended pixel size; a warning shows when the upload differs. */
  recommended?: { width: number; height: number } | null;
};

/** Controlled antd form field: uploads to Supabase Storage through a one-time signed URL, then the server verifies the bytes. */
export default function MediaField({ value, onChange, purpose, recommended = null }: Readonly<MediaFieldProps>) {
  const { message } = App.useApp();
  const { run } = useCmsAction();
  const [uploading, setUploading] = useState(false);
  const rule = MEDIA_RULES[purpose];
  const accept = rule.types.join(",");

  async function upload(file: File) {
    if (!rule.types.includes(file.type as MediaType)) return void message.error(`Use ${describeRule(purpose)}.`);
    if (file.size > rule.maxBytes) return void message.error(`This image is too large. Use ${describeRule(purpose)}.`);

    setUploading(true);
    try {
      const [dimensions, ticket] = await Promise.all([
        readDimensions(file),
        run(createMediaUploadAction, { purpose, fileName: file.name, contentType: file.type as MediaType, size: file.size }),
      ]);
      if (!ticket.ok) return;
      const { error } = await storage()
        .from(ticket.data.bucket)
        .uploadToSignedUrl(ticket.data.path, ticket.data.token, file, { contentType: file.type });
      if (error) return void message.error("Upload failed. Try again.");
      const verified = await run(verifyMediaUploadAction, { purpose, path: ticket.data.path });
      if (!verified.ok) return;
      onChange?.({ url: ticket.data.publicUrl, ...(dimensions ?? {}), alt: value?.alt ?? "" });
      message.success("Image uploaded. Add alt text, then save.");
    } finally {
      setUploading(false);
    }
  }

  const offSize =
    recommended && value?.width && value.height && (value.width !== recommended.width || value.height !== recommended.height);
  const contain = purpose === "logo" || purpose === "icon";

  return (
    <Flex vertical gap={8}>
      {value?.url ? (
        <Flex gap={12} align="flex-start">
          <Image
            src={value.url}
            alt={value.alt ?? ""}
            width={contain ? 96 : 160}
            style={{ borderRadius: 6, objectFit: contain ? "contain" : "cover", aspectRatio: contain ? "1 / 1" : "1.91 / 1", background: "#e9ecef", padding: contain ? 8 : 0 }}
          />
          <Flex vertical gap={6} style={{ flex: 1, minWidth: 0 }}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }} ellipsis={{ tooltip: value.url }}>
              {value.width && value.height ? `${value.width} x ${value.height}px` : value.url}
            </Typography.Text>
            <Input
              placeholder="Alt text (describe the image for screen readers and search engines)"
              value={value.alt ?? ""}
              maxLength={200}
              status={value.alt?.trim() ? undefined : "warning"}
              onChange={(e) => onChange?.({ ...value, alt: e.target.value })}
            />
            <Flex gap={8}>
              <Upload accept={accept} showUploadList={false} beforeUpload={(f) => (void upload(f), false)} disabled={uploading}>
                <Button size="small" icon={<UploadOutlined />} loading={uploading}>
                  Replace
                </Button>
              </Upload>
              <Button size="small" danger type="text" icon={<DeleteOutlined />} onClick={() => onChange?.(undefined)}>
                Remove
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Upload.Dragger accept={accept} showUploadList={false} beforeUpload={(f) => (void upload(f), false)} disabled={uploading}>
          <p style={{ margin: 0 }}>
            <UploadOutlined /> {uploading ? "Uploading..." : "Click or drop an image"}
          </p>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {describeRule(purpose)}
            {recommended ? `. Best at ${recommended.width} x ${recommended.height}px.` : "."}
          </Typography.Text>
        </Upload.Dragger>
      )}
      {offSize && (
        <Alert
          type="warning"
          showIcon
          title={`This image is ${value.width} x ${value.height}px. Social networks crop to ${recommended.width} x ${recommended.height}px, so parts may be cut off.`}
        />
      )}
    </Flex>
  );
}
