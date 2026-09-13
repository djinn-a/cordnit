import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone / LAN access to Next.js dev assets (JS chunks, HMR, images).
  // Without this, physical devices on the LAN IP get HTML but blocked /_next resources.
  // Include both observed LAN addresses for this machine.
  allowedDevOrigins: ["192.168.29.86", "192.168.2.1"],
};

export default nextConfig;
