import { CardProps } from '@/shared/components/Card/Card';
import { TokenInfo } from '@/shared/constants/tokens.constants';
import { Allocation } from '@/shared/models/walletData';
import { ReactNode } from 'react';

export type AllocationsCardProps = CardProps & {
  data: Allocation[] | undefined;
  tokenInfo: TokenInfo;
  noAllocationComponent: ReactNode;
};

export type AllocationsTableItemProps = Omit<AllocationsCardProps, 'data'> & {
  allocation: Allocation;
};
