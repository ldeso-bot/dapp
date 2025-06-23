import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    /** See: https://dev.to/dinhkhai0201/module-not-found-cant-resolve-pino-pretty-g6 */
    config.externals.push('pino-pretty', 'encoding');
    return config;
  },
};

export default nextConfig;
