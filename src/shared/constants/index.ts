import { base, baseSepolia } from 'viem/chains';
import contracts from './contracts.constants';

const NETWORK = 'mainnet' as 'testnet' | 'mainnet';

const constants = {
  NETWORK,
  CHAIN: NETWORK === 'testnet' ? baseSepolia : base,
  contracts,
};

export default constants;
