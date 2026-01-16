export const USE_LOCAL_GRAPH_NODE = process.env.USE_LOCAL_GRAPH_NODE === 'true';

export const FORCE_WALLET_ADDRESS = process.env.FORCE_WALLET_ADDRESS
  ? process.env.FORCE_WALLET_ADDRESS.toLowerCase()
  : undefined;

export const USE_MOCKS = process.env.USE_MOCKS === 'true';

export const IS_DEVELOPMENT =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'development';

export const PROTOCOL_DATA_CACHE_TIME_SECONDS = IS_DEVELOPMENT ? 1 : 60;
export const WALLET_DATA_CACHE_TIME_SECONDS = 1;

export const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

export const DEFAULT_TO_TESTNET =
  process.env.NEXT_PUBLIC_DEFAULT_TO_TESTNET === 'true';

export const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  process.env.WALLETCONNECT_PROJECT_ID ||
  '';
