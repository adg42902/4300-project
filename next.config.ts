import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Example for images from Spotify
        protocol: 'https',
        hostname: 'i.scdn.co', // Spotify image domain
        port: '', // Leave empty if not using a specific port
        pathname: '/**', // Allow all paths
      },
      {
        // Example for another image domain
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com', // Another image domain
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
