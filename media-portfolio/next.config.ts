import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    // This allows the build to finish even if there are linting errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This allows the build to finish even if there are type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
