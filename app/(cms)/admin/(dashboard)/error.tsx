"use client";

import { Button, Result } from "antd";
import { useEffect } from "react";

export default function AdminError({ error, reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  useEffect(() => {
    console.error("[admin] render error", error.digest ?? "", error);
  }, [error]);

  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle={error.digest ? `Reference: ${error.digest}. Try again, or reload the page.` : "Try again, or reload the page."}
      extra={[
        <Button type="primary" key="retry" onClick={reset}>
          Try again
        </Button>,
        <Button key="home" href="/admin">
          Back to pages
        </Button>,
      ]}
    />
  );
}
