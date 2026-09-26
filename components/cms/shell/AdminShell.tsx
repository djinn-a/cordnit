"use client";

import {
  AppstoreOutlined,
  BlockOutlined,
  FileTextOutlined,
  HistoryOutlined,
  NodeIndexOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { BRAND } from "../theme";

const NAV = [
  { key: "/admin", icon: <FileTextOutlined />, label: "Pages" },
  { key: "/admin/blocks", icon: <BlockOutlined />, label: "Global Blocks" },
  { key: "/admin/layouts", icon: <AppstoreOutlined />, label: "Layouts" },
  { key: "/admin/redirects", icon: <NodeIndexOutlined />, label: "Redirects" },
  { key: "/admin/activity", icon: <HistoryOutlined />, label: "Activity" },
  { key: "/admin/settings", icon: <SettingOutlined />, label: "Settings" },
] as const;

function activeKey(pathname: string): string {
  if (pathname === "/admin" || pathname.startsWith("/admin/pages")) return "/admin";
  return NAV.find((n) => n.key !== "/admin" && pathname.startsWith(n.key))?.key ?? "/admin";
}

export default function AdminShell({ children, userSlot }: Readonly<{ children: ReactNode; userSlot: ReactNode }>) {
  const pathname = usePathname() ?? "/admin";
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuProps["items"] = NAV.map((n) => ({
    key: n.key,
    icon: n.icon,
    label: <Link href={n.key}>{n.label}</Link>,
  }));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        width={232}
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "auto" }}
      >
        <Link
          href="/admin"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            height: 56,
            padding: collapsed ? "0 24px" : "0 20px",
            color: "#fff",
            textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Image src="/fev.svg" alt="" width={28} height={28} />
          {!collapsed && <strong style={{ fontSize: 16, letterSpacing: 0.2 }}>Cordinit CMS</strong>}
        </Link>
        <Menu theme="dark" mode="inline" selectedKeys={[activeKey(pathname)]} items={items} style={{ padding: 8, borderInlineEnd: 0 }} />
      </Layout.Sider>
      <Layout>
        <Layout.Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 16,
            borderBottom: `1px solid ${BRAND.border}`,
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          {userSlot}
        </Layout.Header>
        <Layout.Content style={{ padding: 24, minWidth: 0 }}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
}
