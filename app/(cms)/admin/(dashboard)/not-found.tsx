"use client";

import { Button, Result } from "antd";

export default function AdminNotFound() {
  return (
    <Result
      status="404"
      title="Not found"
      subTitle="This page, block or item doesn't exist. It may have been deleted."
      extra={
        <Button type="primary" href="/admin">
          Back to pages
        </Button>
      }
    />
  );
}
