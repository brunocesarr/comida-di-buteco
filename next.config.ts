import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdb-static-files.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'comidadibuteco.com.br' },
    ],
  },
};

export default nextConfig;
