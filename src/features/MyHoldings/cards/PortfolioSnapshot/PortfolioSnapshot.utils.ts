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
    statusLabel: 'All earning',
    statusColor: 'green',
    tooltip: 'All your positions are actively earning rewards.',
  },
  'some-paused': {
    statusLabel: 'Some paused',
    statusColor: 'yellow',
    tooltip:
      'One or more positions not accruing (matured, unlocked, or schedule paused).',
  },
  'not-earning': {
    statusLabel: 'Not earning',
    statusColor: 'gray',
    tooltip: 'No positions are earning rewards.',
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
