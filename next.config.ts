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

  // // Your existing rewrites — kept exactly same
  // async rewrites() {
  //   return [
  //     {
  //       source: "/en-US",
  //       destination: "/",
  //     },
  //     {
  //       source: "/en-US/:path*",
  //       destination: "/:path*",
  //     },
  //   ];
  // },

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
        // This will allow ALL paths from this hostname
        pathname: "/**",
      },
    ],
    // Optional: Add domains for broader compatibility
    domains: ["jes-web-assets-us.s3.us-west-2.amazonaws.com"],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
