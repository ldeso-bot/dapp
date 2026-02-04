import { EarningStatus } from '@/shared/models/walletData';
import { BadgeVariant } from '../StatusCards/StatusCards';

type PortfolioEarningStatus =
  | 'all-earning'
  | 'some-paused'
  | 'not-earning'
  | 'no-positions';

type StatusInfo = {
  statusLabel: string;
  statusColor: BadgeVariant;
  tooltip: string;
};

export const PORTFOLIO_EARNING_STATUS_MAP: Record<
  PortfolioEarningStatus,
  StatusInfo
> = {
  'all-earning': {
    statusLabel: 'All active',
    statusColor: 'green',
    tooltip: 'All your positions are active.',
  },
  'some-paused': {
    statusLabel: 'Some active',
    statusColor: 'yellow',
    tooltip: 'One or more positions are not active',
  },
  'not-earning': {
    statusLabel: 'Not active',
    statusColor: 'gray',
    tooltip: 'No positions active.',
  },
  'no-positions': {
    statusLabel: 'No positions',
    statusColor: 'gray',
    tooltip: 'No positions found.',
  },
};

export const LOCK_EARNING_STATUS_MAP: Record<EarningStatus, StatusInfo> = {
  earning: {
    statusLabel: 'earning',
    statusColor: 'green',
    tooltip: 'The lock is earning rewards.',
  },
  paused: {
    statusLabel: 'temporarily paused',
    statusColor: 'yellow',
    tooltip: 'The lock is paused.',
  },
};
