import type { NextConfig } from "next";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const isAnalyze = process.env.ANALYZE === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, // use SWC compiler for faster minification

  images: {
    // Allow external images (for <Image />)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack(config, { isServer }) {
    // 🔍 Bundle Analyzer (enable via ANALYZE=true npm run build)
    if (isAnalyze) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: isServer
            ? "../analyze-server.html"
            : "./analyze-client.html",
        })
      );
    }

    return config;
  },

  experimental: {
    optimizeCss: true, // reduces CSS size
    scrollRestoration: true,
    //serverActions: true,
  },

  compress: true, // enable gzip compression for faster responses
};

export default nextConfig;
