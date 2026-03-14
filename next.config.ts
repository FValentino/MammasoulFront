import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vqoxdndipnhmhenmwkfn.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "https://b3d62b1962be.ngrok-free.app",
  ],
};

export default nextConfig;
