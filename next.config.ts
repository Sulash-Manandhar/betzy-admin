import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/public/uploads/**",
        port: "5250",
      },
      {
        protocol: "https",
        hostname: "api.betzy.fun",
        pathname: "/public/uploads/**",
      },
    ],
  },
  typedRoutes: true,
};

export default nextConfig;
