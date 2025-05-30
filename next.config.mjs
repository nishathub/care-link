/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 't4.ftcdn.net',
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
