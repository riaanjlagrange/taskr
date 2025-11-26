import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg'],
  allowedDevOrigins: [
    "http://192.168.8.*:*"
  ],
  turbopack: {},
};

export default nextConfig;
