import dotenv from 'dotenv';
dotenv.config();

export const USE_LOCAL_GRAPH_NODE = process.env.USE_LOCAL_GRAPH_NODE === 'true';

export const USE_MOCKS = !(process.env.USE_MOCKS === 'false');

export const IS_DEVELOPMENT =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'development';

export const PROTOCOL_DATA_CACHE_TIME_SECONDS = IS_DEVELOPMENT ? 1 : 60;
export const WALLET_DATA_CACHE_TIME_SECONDS = 1;
