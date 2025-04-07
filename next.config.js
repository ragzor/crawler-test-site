/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placekitten.com", "via.placeholder.com", "picsum.photos"],
  },
  experimental: {
    // Enable various experimental features that might challenge crawlers
    serverActions: true,
  },
};

module.exports = nextConfig;
