"use client";

import { DesktopOutlined, ExportOutlined, MobileOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Segmented, Spin, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";

type Device = "desktop" | "mobile";
const DEVICE_WIDTH: Record<Device, number> = { desktop: 1440, mobile: 390 };

/**
 * Renders the real site (draft) in an iframe, scaled so a 1440px layout fits the pane.
 * Every draft write bumps lockVersion, so the frame reloads exactly once per committed change.
 */
export default function PreviewPane({ pageId, lockVersion }: Readonly<{ pageId: string; lockVersion: number }>) {
  const [device, setDevice] = useState<Device>("desktop");
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [manualNonce, setManualNonce] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => setBoxWidth(entry?.contentRect.width ?? 0));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const src = `/preview/${pageId}?v=${lockVersion}-${manualNonce}`;
  const frameKey = `${src}|${device}`;
  const loading = loadedKey !== frameKey;
  const virtualWidth = DEVICE_WIDTH[device];
  const scale = boxWidth > 0 ? Math.min(1, boxWidth / virtualWidth) : 1;

  return (
    <Card
      size="small"
      title="Live preview"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      styles={{ body: { flex: 1, padding: 0, minHeight: 0, display: "flex" } }}
      extra={
        <Flex gap={4} align="center">
          <Segmented<Device>
            size="small"
            value={device}
            onChange={setDevice}
            options={[
              { value: "desktop", icon: <DesktopOutlined />, title: "Desktop" },
              { value: "mobile", icon: <MobileOutlined />, title: "Mobile" },
            ]}
          />
          <Tooltip title="Reload preview">
            <Button size="small" type="text" icon={<ReloadOutlined />} onClick={() => setManualNonce((n) => n + 1)} aria-label="Reload preview" />
          </Tooltip>
          <Tooltip title="Open preview in a new tab">
            <Button size="small" type="text" icon={<ExportOutlined />} href={src} target="_blank" aria-label="Open preview in new tab" />
          </Tooltip>
        </Flex>
      }
    >
      <div ref={boxRef} style={{ position: "relative", flex: 1, overflow: "hidden", background: "#eef1f6" }}>
        {loading && (
          <Flex align="center" justify="center" style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(238,241,246,0.6)" }}>
            <Spin />
          </Flex>
        )}
        <div
          style={{
            width: virtualWidth,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            margin: device === "mobile" && boxWidth > virtualWidth ? `0 ${(boxWidth - virtualWidth) / 2}px` : 0,
          }}
        >
          <iframe
            key={frameKey}
            src={src}
            title="Draft preview"
            className="cms-preview-frame"
            onLoad={() => setLoadedKey(frameKey)}
          />
        </div>
      </div>
    </Card>
  );
}
