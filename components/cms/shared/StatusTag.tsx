"use client";

import { Tag, Tooltip } from "antd";

type Props = {
  isLive: boolean;
  hasUnpublishedChanges: boolean;
  publishedVersion?: number | null;
};

export default function StatusTag({ isLive, hasUnpublishedChanges, publishedVersion }: Readonly<Props>) {
  if (!isLive) {
    return <Tag color="default">Draft</Tag>;
  }
  if (hasUnpublishedChanges) {
    return (
      <Tooltip title="Live, with edits that are not published yet">
        <Tag color="gold">Live · edited</Tag>
      </Tooltip>
    );
  }
  return <Tag color="green">Live{publishedVersion ? ` · v${publishedVersion}` : ""}</Tag>;
}
