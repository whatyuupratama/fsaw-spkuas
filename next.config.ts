import type { NextConfig } from 'next';

const externalHosts = [
  'media.istockphoto.com',
  'i.pinimg.com',
  'media.licdn.com',
  'cdn.discordapp.com',
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: externalHosts.map((hostname) => ({
      protocol: 'https',
      hostname,
    })),
  },
};

export default nextConfig;
