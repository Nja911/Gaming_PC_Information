import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/gaming-pc/builds/40000", destination: "/gaming-pc/builds/50000", permanent: true },
      { source: "/gaming-pc/builds/60000", destination: "/gaming-pc/builds/80000", permanent: true },
      { source: "/gaming-pc/builds/75000", destination: "/gaming-pc/builds/80000", permanent: true },
      { source: "/gaming-pc/builds/125000", destination: "/gaming-pc/builds/150000", permanent: true },
      { source: "/gaming-pc/builds/250000", destination: "/gaming-pc/builds/275000", permanent: true },
    ];
  },
};

export default nextConfig;
