"use client";

import { Flex, Typography } from "antd";
import type { ReactNode } from "react";

export default function PageHeader({
  title,
  subtitle,
  extra,
}: Readonly<{ title: ReactNode; subtitle?: ReactNode; extra?: ReactNode }>) {
  return (
    <Flex justify="space-between" align="flex-start" gap={16} wrap style={{ marginBottom: 20 }}>
      <div style={{ minWidth: 0 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
        {subtitle && (
          <Typography.Text type="secondary" style={{ display: "block", marginTop: 4 }}>
            {subtitle}
          </Typography.Text>
        )}
      </div>
      {extra && <Flex gap={8} wrap>{extra}</Flex>}
    </Flex>
  );
}
