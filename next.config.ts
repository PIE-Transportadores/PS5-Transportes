import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    AWESOME_API_TOKEN: process.env.AWESOME_API_TOKEN,
  },
};

export default nextConfig;
