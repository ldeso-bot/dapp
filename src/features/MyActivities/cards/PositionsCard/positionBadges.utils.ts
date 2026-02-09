import { ROUTES } from '@/shared/constants/route.constants';
import type { AggregatedHoldingsData } from '../../hooks/useHoldingsData';
import type { ActionBadge } from '../../shared/PositionStatusCard';

type BadgeConfig = {
  maturedCount: number;
  soonToBeMaturedCount: number;
  claimableValue: number;
  unitLabel: string;
  view: 'kvcm' | 'liquidity' | 'k2';
};

const createActionBadges = (props: BadgeConfig) => {
  const badges: ActionBadge[] = [];
  const { view, unitLabel, maturedCount, soonToBeMaturedCount } = props;

  if (maturedCount) {
    badges.push({
      variant: 'green',
      text: `Claimable now: ${maturedCount} ${unitLabel} `,
      href: `${ROUTES.MY_ACTIVITIES}?activeView=${view}`,
    });
  }

  if (soonToBeMaturedCount) {
    badges.push({
      variant: 'blue',
      text: `Claimable soon: ${soonToBeMaturedCount} ${unitLabel}`,
      href: `${ROUTES.MY_ACTIVITIES}?activeView=${view}`,
    });
  }
  return badges;
};

const createKvcmActionBadges = (props: AggregatedHoldingsData) => {
  const { kvcm } = props;
  return createActionBadges({
    view: 'kvcm',
    unitLabel: 'locks',
    maturedCount: kvcm.maturedLocks.length,
    soonToBeMaturedCount: kvcm.soonToBeMaturedLocks.length,
    claimableValue: kvcm.claimableValue,
  });
};

const createLiquidityActionBadges = (props: AggregatedHoldingsData) => {
  const {
    liquidityMaturedLocks,
    liquiditySoonToBeMaturedLocks,
    claimableValueFromLiquidity,
  } = props;

  return createActionBadges({
    unitLabel: 'locks',
    view: 'liquidity',
    maturedCount: liquidityMaturedLocks.length,
    claimableValue: claimableValueFromLiquidity,
    soonToBeMaturedCount: liquiditySoonToBeMaturedLocks.length,
  });
};

const createK2ActionBadges = (props: AggregatedHoldingsData) => {
  const { k2 } = props;
  const maturedCount = k2.maturedLocks.length;
  const soonToBeMaturedCount = k2.soonToBeMaturedLocks.length;

  if (!k2.claimableValue && !soonToBeMaturedCount) {
    return [];
  }

  const displayMaturedCount = maturedCount || (k2.claimableValue ? 1 : 0);

  return createActionBadges({
    view: 'k2',
    unitLabel: 'deposits',
    maturedCount: displayMaturedCount,
    soonToBeMaturedCount,
    claimableValue: k2.claimableValue,
  });
};

export {
  createK2ActionBadges,
  createKvcmActionBadges,
  createLiquidityActionBadges,
};
