import USDC from '../dal/web3/abis/USDC.json';
import USDCTransferWithPermit from '../dal/web3/abis/USDCTransferWithPermit.json';

type contractInfo = {
  mainnet: string;
  testnet: string;
  abi: object;
};

const contracts: Record<string, contractInfo> = {
  USDCTransferWithPermit: {
    mainnet: '0x1B0128280d7f42Ea7E2c4d581ADc944C64303f7a',
    testnet: '0x6E7070CA35df41A9f856d9530d3BA42C9a0E06Fa',
    abi: USDCTransferWithPermit,
  },
  USDC: {
    mainnet: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    testnet: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // No USDC on testnet
    abi: USDC,
  },
};

export type ContractName = keyof typeof contracts;

export default contracts;
