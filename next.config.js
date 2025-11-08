/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blogger.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.fourthwall.com',
      },
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com',
      },
    ],
  },
  // Enable compression
  compress: true,
  // Optimize production builds
  swcMinify: true,
}

module.exports = nextConfig
