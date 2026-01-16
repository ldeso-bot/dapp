import { base } from 'viem/chains';
import contracts from './contracts.constants';

export const DOCS_URL = `https://docs.klimaprotocol.com`;
export const CARBON_SELLERS_HANDBOOK_URL = `https://docs.klimaprotocol.com/carbon-sellers-handbook/overview`;
export const DISCORD_URL = `https://discord.com/invite`;

export const BUY_KVCM_URL = `https://aerodrome.finance/swap?from=${contracts.USDC[base.id]}&to=${contracts.KVCM[base.id]}&chain1=${base.id}`;
export const BUY_K2_URL = `https://aerodrome.finance/swap?from=${contracts.USDC[base.id]}&to=${contracts.K2[base.id]}&chain1=${base.id}`;
export const DEPOSIT_KVCM_USDC_LIQUIDITY_URL = `https://aerodrome.finance/deposit?token0=${contracts.KVCM[base.id]}&token1=${contracts.USDC[base.id]}&type=-1&chain0=${base.id}&chain1=${base.id}&factory=0x420DD381b31aEf6683db6B902084cB0FFECe40Da`;
export const DEPOSIT_KVCM_K2_LIQUIDITY_URL = `https://aerodrome.finance/deposit?token0=${contracts.KVCM[base.id]}&token1=${contracts.K2[base.id]}&type=-1&chain0=${base.id}&chain1=${base.id}&factory=0x420DD381b31aEf6683db6B902084cB0FFECe40Da`;
