// This file should be deleted once we have the actual API calls

import { ONE_MATURITY_PERIOD } from '@/shared/constants/protocol.constants';

export const getMockMaturationTimestamp = (index: number) => {
  return Date.now() / 1000 + (index + 0.25) * ONE_MATURITY_PERIOD;
};

export const getMockYieldPercent = (index: number) => {
  return 0.03 + (Math.log(index + 1) / Math.log(40 + 1)) * 0.03;
};