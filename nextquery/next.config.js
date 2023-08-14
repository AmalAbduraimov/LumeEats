/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["basketdesk.s3.ap-southeast-1.amazonaws.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
