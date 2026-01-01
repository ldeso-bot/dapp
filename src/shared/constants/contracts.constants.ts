import KlimaDiamond from '@/shared/utils/abis/KlimaDiamond.json';
import USDC from '@/shared/utils/abis/USDC.json';
import USDCTransferWithPermit from '@/shared/utils/abis/USDCTransferWithPermit.json';
import VelodromeSugar from '@/shared/utils/abis/VelodromeSugar.json';
import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

type contractInfo = {
  [base.id]: Address;
  [baseSepolia.id]: Address;
  abi: object;
};

const contracts = {
  USDCTransferWithPermit: {
    [base.id]: '0x1B0128280d7f42Ea7E2c4d581ADc944C64303f7a',
    [baseSepolia.id]: '0x6E7070CA35df41A9f856d9530d3BA42C9a0E06Fa',
    abi: USDCTransferWithPermit,
  },
  USDC: {
    [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    [baseSepolia.id]: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // No USDC on testnet
    abi: USDC,
  },
  StakingManagerDiamond: {
    [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // TODO: add mainnet address
    [baseSepolia.id]: '0x4bfd0C3f99Ed111eb7a702a599e099243b58BB68',
    abi: KlimaDiamond,
  },
  AAMDiamond: {
    [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // TODO: add mainnet address
    [baseSepolia.id]: '0x5BC312a85ac0A5d14D5FeDb05B4f96AB256eD14E',
    abi: KlimaDiamond,
  },
  VelodromeSugar: {
    [base.id]: '0x9DE6Eab7a910A288dE83a04b6A43B52Fd1246f1E',
    [baseSepolia.id]: '0x00000000000000000000000000000000000000000', // No testnet address
    abi: VelodromeSugar,
  },
  KVCM: {
    [base.id]: '0x00fBAC94Fec8D4089d3fe979F39454F48c71A65d',
    [baseSepolia.id]: '0x4231968b210489379BB40f1C2e6275978477094b', // No testnet address yet
    abi: USDC,
  },
  K2: {
    [base.id]: '0x59081d974a0C635Fae3e8195F34f879B591B6519',
    [baseSepolia.id]: '0xDBaeE9Af470913Ba360379817661C836d8657ebD', // No testnet address yet
    abi: USDC,
  },
  AERO: {
    [base.id]: '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
    [baseSepolia.id]: '0x00000000000000000000000000000000000000000', // No testnet address yet
    abi: USDC,
  },
} satisfies Record<string, contractInfo>;

export type ContractName = keyof typeof contracts;

/**
 * The indexes of the Aerodrome pools
 * @description These are the indexes of the Aerodrome pools in the Aerodrome Sugar contract
 */
export const AERODROME_KVCM_USDC_POOL_INDEX = 13785;
export const AERODROME_K2_USDC_POOL_INDEX = 9137;

export default contracts;
