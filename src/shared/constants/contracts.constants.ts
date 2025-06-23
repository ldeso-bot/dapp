import USDC from '@/shared/utils/abis/USDC.json';
import USDCTransferWithPermit from '@/shared/utils/abis/USDCTransferWithPermit.json';
import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

type contractInfo = {
  [base.id]: Address;
  [baseSepolia.id]: Address;
  abi: object;
};

const contracts: Record<string, contractInfo> = {
  USDCTransferWithPermit: {
    [base.id]: '0x1B0128280d7f42Ea7E2c4d581ADc944C64303f7a',
    [baseSepolia.id]: '0x6E7070CA35df41A9f856d9530d3BA42C9a0E06Fa',
    abi: USDCTransferWithPermit,
  },
  USDC: {
    [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    [baseSepolia.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // No USDC on testnet
    abi: USDC,
  },
  KlimaProtocol: {
    [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // TODO: add mainnet address
    [baseSepolia.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // TODO: add testnet address
    abi: USDC,
  },
};

export type ContractName = keyof typeof contracts;

export default contracts;
