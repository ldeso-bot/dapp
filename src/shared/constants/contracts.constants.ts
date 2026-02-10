import AAMDiamond from '@/shared/utils/abis/AAMDiamond';
import RetirementAggregator from '@/shared/utils/abis/RetirementAggregator';
import StakingManagerDiamond from '@/shared/utils/abis/StakingManagerDiamond';
import USDC from '@/shared/utils/abis/USDC.json';
import VelodromeSugar from '@/shared/utils/abis/VelodromeSugar.json';
import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import RewardManagerDiamond from '../utils/abis/RewardManagerDiamond';

type contractInfo = {
  [base.id]: Address;
  [baseSepolia.id]: Address;
  abi: object;
};

const contracts = {
  USDC: {
    [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    [baseSepolia.id]: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    abi: USDC,
  },
  StakingManagerDiamond: {
    [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // TODO: add mainnet address
    [baseSepolia.id]: '0x659e2f31Ea9C5903D7A01a7290C78E10C6341338',
    abi: StakingManagerDiamond,
  },
  RewardManagerDiamond: {
    [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // TODO: add mainnet address
    [baseSepolia.id]: '0x40CFF01992B0768a205001df8C0c0930967a3C3b',
    abi: RewardManagerDiamond,
  },
  AAMDiamond: {
    [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // TODO: add mainnet address
    [baseSepolia.id]: '0x5BC312a85ac0A5d14D5FeDb05B4f96AB256eD14E',
    abi: AAMDiamond,
  },
  VelodromeSugar: {
    [base.id]: '0x9DE6Eab7a910A288dE83a04b6A43B52Fd1246f1E',
    [baseSepolia.id]: '0x00000000000000000000000000000000000000000', // No testnet address
    abi: VelodromeSugar,
  },
  KVCM: {
    [base.id]: '0x00fBAC94Fec8D4089d3fe979F39454F48c71A65d',
    [baseSepolia.id]: '0x4231968b210489379BB40f1C2e6275978477094b',
    abi: USDC,
  },
  K2: {
    [base.id]: '0x59081d974a0C635Fae3e8195F34f879B591B6519',
    [baseSepolia.id]: '0xDBaeE9Af470913Ba360379817661C836d8657ebD',
    abi: USDC,
  },
  KVCM_K2: {
    [base.id]: '0x578f2f191C6b67D547bACA166B6B2aa9Dc8CB691',
    [baseSepolia.id]: '0x978b80D755E7eEC07667118151b084CD192DAa2e',
    abi: USDC,
  },
  KVCM_USDC: {
    [base.id]: '0x5C0D76fab1822bDeb47308eD6028231761ED723E',
    [baseSepolia.id]: '0xB888e0c1299C2A002E5b53fD15AC36FedA1320aF',
    abi: USDC,
  },
  AERO: {
    [base.id]: '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
    [baseSepolia.id]: '0x00000000000000000000000000000000000000000', // No testnet address
    abi: USDC,
  },
  RetirementAggregator: {
    [base.id]: '0xda0a793d7c32ab80bcdab7f8c725c96db22464f4',
    [baseSepolia.id]: '0xc0309c29162f699a3445a7a9aeb0acbe568f5fe0',
    abi: RetirementAggregator,
  },
  Null: {
    [base.id]: '0x0000000000000000000000000000000000000000',
    [baseSepolia.id]: '0x0000000000000000000000000000000000000000',
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
