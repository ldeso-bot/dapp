import dotenv from 'dotenv';
dotenv.config();

export const USE_LOCAL_GRAPH_NODE = process.env.USE_LOCAL_GRAPH_NODE === 'true';

export const USE_MOCKS = !(process.env.USE_MOCKS === 'false');

export const IS_DEVELOPMENT = (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'development');
