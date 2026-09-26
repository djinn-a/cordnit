"use client";

import { App, ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import type { ReactNode } from "react";
import { cmsTheme } from "./theme";

export default function AdminProviders({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ConfigProvider theme={cmsTheme} locale={enUS}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
