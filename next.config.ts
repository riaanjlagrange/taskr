import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@libsql/client', '@prisma/adapter-libsql'],
  allowedDevOrigins: [
    "http://192.168.8.*:*"
  ],
  turbopack: {},
};

export default nextConfig;
