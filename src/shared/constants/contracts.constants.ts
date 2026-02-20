import AAMDiamond from '@/shared/utils/abis/AAMDiamond';
import RetirementAggregator from '@/shared/utils/abis/RetirementAggregator';
import StakingManagerDiamond from '@/shared/utils/abis/StakingManagerDiamond';
import USDC from '@/shared/utils/abis/USDC.json';
import VelodromeSugar from '@/shared/utils/abis/VelodromeSugar.json';
import ZKMEVerifyUpgradeable from '@/shared/utils/abis/ZKMEVerifyUpgradeable';
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
    [base.id]: '0x5101a7ca3E8815C0FeeD8976F109EE01D8ED0c3D',
    [baseSepolia.id]: '0xB288c457083B5Cb7C5008CF9e135B370B2206f8B',
    abi: StakingManagerDiamond,
  },
  RewardManagerDiamond: {
    [base.id]: '0xada87d6f68054d0caB4789b332279b18932e928F',
    [baseSepolia.id]: '0x5CB8440D322Aecd648d010c27dB0AF2C4067d8D8',
    abi: RewardManagerDiamond,
  },
  AAMDiamond: {
    [base.id]: '0x1C24239309398220883207681602BfF4D10fbde1',
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
  ZKMEVerifyUpgradeable: {
    [base.id]: '0x8c81bbc5cC9B6cdbb5c0e5DD8b9D5bfaF3575710',
    [baseSepolia.id]: '0xF58De9599C57bBAD68Fea0F39b73913daFcf0976',
    abi: ZKMEVerifyUpgradeable,
  },
} satisfies Record<string, contractInfo>;

export type ContractName = keyof typeof contracts;

export const ZKME_COOPERATOR_ADDRESS: Address =
  '0x3549200e160Fe6cd3348e19c0cb74d53A95Ece85';

/**
 * The indexes of the Aerodrome pools
 * @description These are the indexes of the Aerodrome pools in the Aerodrome Sugar contract
 */
export const AERODROME_KVCM_USDC_POOL_INDEX = 13785;
export const AERODROME_K2_USDC_POOL_INDEX = 9137;

export default contracts;
