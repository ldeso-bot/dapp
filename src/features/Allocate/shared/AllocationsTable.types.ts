import { CardProps } from '@/shared/components/Card/Card';
import { TokenInfo } from '@/shared/constants/tokens.constants';
import { SortConfig } from '@/shared/hooks/useSortableData';
import { Allocation } from '@/shared/models/walletData';
import { ReactNode } from 'react';

export type AllocationsCardProps = CardProps & {
  data: Allocation[] | undefined;
  tokenInfo: TokenInfo;
  noAllocationComponent: ReactNode;
  showCategoryFilter?: boolean;
  sortConfig?: SortConfig<Allocation>;
  onSort?: (key: keyof Allocation) => void;
};

export type AllocationsTableItemProps = Omit<AllocationsCardProps, 'data'> & {
  allocation: Allocation;
};
