import AAMDiamond from '@/shared/utils/abis/AAMDiamond';
import RetirementAggregator from '@/shared/utils/abis/RetirementAggregator';
import StakingManagerDiamond from '@/shared/utils/abis/StakingManagerDiamond.json';
import USDC from '@/shared/utils/abis/USDC.json';
import USDCTransferWithPermit from '@/shared/utils/abis/USDCTransferWithPermit.json';
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
  USDCTransferWithPermit: {
    [base.id]: '0x1B0128280d7f42Ea7E2c4d581ADc944C64303f7a',
    [baseSepolia.id]: '0x6E7070CA35df41A9f856d9530d3BA42C9a0E06Fa',
    abi: USDCTransferWithPermit,
  },
  USDC: {
    [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    [baseSepolia.id]: '0x9F10F3cF0eE0EfA366bc280008b354E155e15421', // No USDC on testnet
    abi: USDC,
  },
  StakingManagerDiamond: {
    [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // TODO: add mainnet address
    [baseSepolia.id]: '0x4bfd0C3f99Ed111eb7a702a599e099243b58BB68',
    abi: StakingManagerDiamond,
  },
  RewardManagerDiamond: {
    [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // TODO: add mainnet address
    [baseSepolia.id]: '0xE6525E4d1982fb8a29dA81C5CfB3C0201e8f121b',
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
    [baseSepolia.id]: '0x4231968b210489379BB40f1C2e6275978477094b', // No testnet address yet
    abi: USDC,
  },
  K2: {
    [base.id]: '0x59081d974a0C635Fae3e8195F34f879B591B6519',
    [baseSepolia.id]: '0xDBaeE9Af470913Ba360379817661C836d8657ebD', // No testnet address yet
    abi: USDC,
  },
  KVCM_K2: {
    [base.id]: '0x578f2f191C6b67D547bACA166B6B2aa9Dc8CB691',
    [baseSepolia.id]: '0xB888e0c1299C2A002E5b53fD15AC36FedA1320aF', // No testnet address yet
    abi: USDC,
  },
  KVCM_USDC: {
    [base.id]: '0x5C0D76fab1822bDeb47308eD6028231761ED723E',
    [baseSepolia.id]: '0x978b80D755E7eEC07667118151b084CD192DAa2e', // No testnet address yet
    abi: USDC,
  },
  AERO: {
    [base.id]: '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
    [baseSepolia.id]: '0x00000000000000000000000000000000000000000', // No testnet address yet
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
