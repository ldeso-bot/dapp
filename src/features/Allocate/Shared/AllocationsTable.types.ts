import { CardProps } from '@/shared/components/Card/Card';
import { TokenInfo } from '@/shared/constants/tokens.constants';
import { Allocation } from '@/shared/models/walletData';

export type AllocationsCardProps = CardProps & {
  data: Allocation[] | undefined;
  tokenInfo: TokenInfo;
};

export type AllocationsTableItemProps = Omit<AllocationsCardProps, 'data'> & {
  allocation: Allocation;
};
