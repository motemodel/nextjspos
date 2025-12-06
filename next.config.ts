import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  experimental: {
    globalNotFound: true
  },
};

export default nextConfig;
