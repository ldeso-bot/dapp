import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_RPC_URL:
      process.env.NEXT_PUBLIC_BASE_RPC_URL ?? process.env.BASE_RPC_URL,
    NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL:
      process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL ??
      process.env.BASE_SEPOLIA_RPC_URL,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    /** See: https://dev.to/dinhkhai0201/module-not-found-cant-resolve-pino-pretty-g6 */
    config.externals.push('pino-pretty', 'encoding');
    return config;
  },
  turbopack: {
    root: './',
  },
};

export default nextConfig;
