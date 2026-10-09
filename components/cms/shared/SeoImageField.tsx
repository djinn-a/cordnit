"use client";

import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { createClient } from "@supabase/supabase-js";
import { Alert, App, Button, Flex, Image, Input, Typography, Upload } from "antd";
import { useState } from "react";
import type { SeoImage } from "@/lib/cms/document";
import { createSeoImageUploadAction } from "@/server/actions/media";
import { useCmsAction } from "../hooks/useCmsAction";

const ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_BYTES = 5 * 1024 * 1024;
const RECOMMENDED = { width: 1200, height: 630 };

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
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

type Props = {
  value?: SeoImage;
  onChange?: (value: SeoImage | undefined) => void;
  /** Recommended pixel size; a warning shows when the upload differs. Pass null to skip (e.g. logos). */
  recommended?: { width: number; height: number } | null;
};

/** Controlled antd form field: uploads to Supabase Storage through a one-time signed URL. */
export default function SeoImageField({ value, onChange, recommended = RECOMMENDED }: Readonly<Props>) {
  const { message } = App.useApp();
  const { run } = useCmsAction();
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    if (!ACCEPT.split(",").includes(file.type)) return void message.error("Use a JPG, PNG or WebP image.");
    if (file.size > MAX_BYTES) return void message.error("Images must be 5 MB or smaller.");

    setUploading(true);
    try {
      const [dimensions, ticket] = await Promise.all([
        readDimensions(file),
        run(createSeoImageUploadAction, { fileName: file.name, contentType: file.type as "image/jpeg", size: file.size }),
      ]);
      if (!ticket.ok) return;
      const { error } = await storage()
        .from(ticket.data.bucket)
        .uploadToSignedUrl(ticket.data.path, ticket.data.token, file, { contentType: file.type });
      if (error) return void message.error("Upload failed. Try again.");
      onChange?.({ url: ticket.data.publicUrl, ...(dimensions ?? {}), alt: value?.alt });
      message.success("Image uploaded");
    } finally {
      setUploading(false);
    }
  }

  const offSize =
    recommended && value?.width && value.height && (value.width !== recommended.width || value.height !== recommended.height);

  return (
    <Flex vertical gap={8}>
      {value?.url ? (
        <Flex gap={12} align="flex-start">
          <Image src={value.url} alt={value.alt ?? ""} width={160} style={{ borderRadius: 6, objectFit: "cover", aspectRatio: "1.91 / 1" }} />
          <Flex vertical gap={6} style={{ flex: 1, minWidth: 0 }}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }} ellipsis={{ tooltip: value.url }}>
              {value.width && value.height ? `${value.width} x ${value.height}px` : value.url}
            </Typography.Text>
            <Input
              placeholder="Alt text (describe the image)"
              value={value.alt ?? ""}
              maxLength={200}
              onChange={(e) => onChange?.({ ...value, alt: e.target.value })}
            />
            <Flex gap={8}>
              <Upload accept={ACCEPT} showUploadList={false} beforeUpload={(f) => (void upload(f), false)} disabled={uploading}>
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
        <Upload.Dragger accept={ACCEPT} showUploadList={false} beforeUpload={(f) => (void upload(f), false)} disabled={uploading}>
          <p style={{ margin: 0 }}>
            <UploadOutlined /> {uploading ? "Uploading..." : "Click or drop an image"}
          </p>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            JPG, PNG or WebP, up to 5 MB{recommended ? `. Best at ${recommended.width} x ${recommended.height}px.` : "."}
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
