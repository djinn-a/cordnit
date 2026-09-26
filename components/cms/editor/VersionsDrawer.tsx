"use client";

import { HistoryOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Checkbox, Drawer, Empty, Popconfirm, Tag, Typography } from "antd";
import { useState } from "react";
import { rollbackPageAction } from "@/server/actions/publish";
import { useCmsAction } from "../hooks/useCmsAction";
import { useRevealKey } from "../hooks/useRevealKey";
import ItemList from "../shared/ItemList";
import RelativeTime from "../shared/RelativeTime";
import type { EditorPage, EditorVersion } from "./types";

export default function VersionsDrawer({
  open,
  onClose,
  page,
  versions,
  onRolledBack,
}: Readonly<{
  open: boolean;
  onClose: () => void;
  page: EditorPage;
  versions: EditorVersion[];
  onRolledBack: (lockVersion: number) => void;
}>) {
  const { run, pending } = useCmsAction();
  const revealKey = useRevealKey();
  const [restoreDraft, setRestoreDraft] = useState(true);
  const liveVersion = page.liveSlug ? page.publishedVersion : null;

  return (
    <Drawer title={<span><HistoryOutlined /> Version history</span>} open={open} onClose={onClose} size={440}>
      <Typography.Paragraph type="secondary">
        Every publish is kept. Restoring republishes that version as a new one, so history is never lost.
      </Typography.Paragraph>
      {versions.length === 0 ? (
        <Empty description="Not published yet" />
      ) : (
        <ItemList
          items={versions}
          rowKey={(v) => v.version}
          renderItem={(v) => (
            <>
              <div style={{ minWidth: 0 }}>
                <Typography.Text strong style={{ display: "block" }}>Version {v.version}</Typography.Text>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  <RelativeTime value={v.createdAt} />
                </Typography.Text>
                {v.note && <Typography.Text type="secondary" style={{ display: "block" }}>{v.note}</Typography.Text>}
              </div>
              {v.version === liveVersion ? (
                <Tag color="green">Live</Tag>
              ) : (
                  <Popconfirm
                    key={revealKey}
                    title={`Restore v${v.version}?`}
                    description={
                      <Checkbox checked={restoreDraft} onChange={(e) => setRestoreDraft(e.target.checked)}>
                        Also replace the current draft
                      </Checkbox>
                    }
                    okText="Restore & publish"
                    onConfirm={async () => {
                      const result = await run(
                        rollbackPageAction,
                        { pageId: page.id, lockVersion: page.lockVersion, version: v.version, restoreDraft },
                        { success: `Restored v${v.version} (now live as v${(page.publishedVersion ?? 0) + 1})` },
                      );
                      if (result.ok) onRolledBack(result.data.lockVersion);
                    }}
                  >
                    <Button size="small" icon={<RollbackOutlined />} loading={pending}>
                      Restore
                    </Button>
                  </Popconfirm>
              )}
            </>
          )}
        />
      )}
    </Drawer>
  );
}
