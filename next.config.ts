import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/kasane.html",
        permanent: false,
      },
      {
        source: "/admin",
        destination: "/portal",
        permanent: false,
      },
      {
        source: "/admin/:path*",
        destination: "/portal",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
