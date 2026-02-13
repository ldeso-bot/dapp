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
  const k2Lock = k2.locks[0];
  const maturedCount = k2Lock?.isClaimable ? 1 : 0;
  const soonToBeMaturedCount = k2Lock?.isPendingUnlock ? 1 : 0;

  if (!k2.claimableValue && !soonToBeMaturedCount) {
    return [];
  }

  return createActionBadges({
    view: 'k2',
    unitLabel: 'deposits',
    maturedCount,
    soonToBeMaturedCount,
    claimableValue: k2.claimableRewardsPlusPrincipalAmount,
  });
};

export {
  createK2ActionBadges,
  createKvcmActionBadges,
  createLiquidityActionBadges,
};
