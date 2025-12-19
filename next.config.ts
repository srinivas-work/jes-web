import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/en-US",
  //       permanent: false,
  //     },
  //     {
  //       // Redirect everything EXCEPT already prefixed paths
  //       source: "/:path((?!en-US).*)",
  //       destination: "/en-US/:path",
  //       permanent: false,
  //     },
  //   ];
  // },

  async rewrites() {
    return [
      // --- Existing rewrites ---
      // {
      //   source: "/en-US",
      //   destination: "/",
      // },
      // {
      //   source: "/en-US/:path*",
      //   destination: "/:path*",
      // },

      // --- React app rewrites ---
      {
        // Allow React-router paths like /react/dashboard, /react/profile, etc.
        source: "/lp/quantity-take-off",
        destination: "/ads",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "jes-web-assets-us.s3.us-west-2.amazonaws.com",
        pathname: "/**",
      },
    ],
    domains: [
      "jes-eng.vercel.app",
      "jes-web-assets-us.s3.us-west-2.amazonaws.com",
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
