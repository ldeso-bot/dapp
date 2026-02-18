import { CARBONMARK_APP_RETIREMENTS_URL } from '@/shared/constants/urls.constants';
import type { Address } from 'viem';

export const getCarbonmarkReceiptUrl = (
  chainId: number,
  txHash: Address,
  retirementIndex: number = 0
) => {
  const id = `${chainId}-${txHash.toLowerCase()}-${retirementIndex}`;
  return `${CARBONMARK_APP_RETIREMENTS_URL}/id/${id}`;
};
