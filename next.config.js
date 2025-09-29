/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  typescript: {
    // During development, type errors won't fail the build
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },
  eslint: {
    // During development, lint errors won't fail the build
    ignoreDuringBuilds: process.env.NODE_ENV === "development",
  },
};

module.exports = nextConfig;
