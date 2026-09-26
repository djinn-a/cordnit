import type { NextConfig } from "next";

const MIN_NODE_MAJOR = 22;
const nodeMajor = Number(process.versions.node.split(".")[0]);
if (nodeMajor < MIN_NODE_MAJOR) {
  throw new Error(
    `Node.js ${MIN_NODE_MAJOR}+ is required (running ${process.versions.node}). Run \`nvm use\` in the project root.`,
  );
}

const nextConfig: NextConfig = {
  // Allow phone / LAN access to Next.js dev assets (JS chunks, HMR, images).
  // Without this, physical devices on the LAN IP get HTML but blocked /_next resources.
  // Include both observed LAN addresses for this machine.
  allowedDevOrigins: ["192.168.29.86", "192.168.2.1"],
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // Server Function arguments include passwords; actions log their own argument-free lines.
  logging: { serverFunctions: false },
  serverExternalPackages: ["postgres"],
  async redirects() {
    return [{ source: "/home", destination: "/", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
