import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nyc3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "sfo3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "www.worldometers.info",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "http",
        hostname: "api.zenexcloud.com",
      },
      {
        protocol: "http",
        hostname: "31.220.111.98",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
