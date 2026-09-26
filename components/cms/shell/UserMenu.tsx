"use client";

import { ExportOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space, Typography, type MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/server/actions/auth";
import { useCmsAction } from "../hooks/useCmsAction";

export default function UserMenu({ username }: Readonly<{ username: string }>) {
  const router = useRouter();
  const { navigate } = useCmsAction();

  const items: MenuProps["items"] = [
    { key: "site", icon: <ExportOutlined />, label: <a href="/" target="_blank" rel="noreferrer">View site</a> },
    { key: "settings", icon: <SettingOutlined />, label: "Settings", onClick: () => router.push("/admin/settings") },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      label: "Sign out",
      onClick: () => void navigate(logoutAction, undefined),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <button
        type="button"
        aria-label="Account menu"
        style={{ background: "none", border: 0, cursor: "pointer", padding: 4 }}
      >
        <Space>
          <Avatar size="small" icon={<UserOutlined />} style={{ background: "#2251ff" }} />
          <Typography.Text strong>{username}</Typography.Text>
        </Space>
      </button>
    </Dropdown>
  );
}
