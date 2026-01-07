// This file should be deleted once we have the actual API calls

import { ONE_MATURITY_PERIOD } from '@/shared/constants/protocol.constants';
import { ApiCreditToken, TOKEN_STANDARDS } from '@/shared/models/shared';

export const getMockMaturationTimestamp = (index: number) => {
  return Date.now() / 1000 + (index + 0.25) * ONE_MATURITY_PERIOD;
};

export const getMockYieldPercent = (index: number) => {
  return 0.03 + (Math.log(index + 1) / Math.log(40 + 1)) * 0.03;
};

export const mockTokens: ApiCreditToken[] = [
  {
    creditTokenId: '0x1234567890123456789012345678901234567901',
    tokenId: 0,
    address: '0x1234567890123456789012345678901234567901',
    name: 'Credit Token 1',
    decimals: 18,
    standard: TOKEN_STANDARDS.ERC20,
    project: {
      name: 'Credit Token 1',
    },
  },
];
