/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true, domains: ['content.michaelvozzo.com'] },
};

module.exports = nextConfig;
