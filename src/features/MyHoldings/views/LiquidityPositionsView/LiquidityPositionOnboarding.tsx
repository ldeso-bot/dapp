'use client';

import { EmptyStateButton } from '@/shared/components/EmptyState/EmptyStateButton';
import { CalendarIcon } from '@/shared/components/Svg/CalendarIcon';
import { TrendingUpIcon } from '@/shared/components/Svg/TrendingUpIcon';
import { WaterDropIcon } from '@/shared/components/Svg/WaterDropIcon';
import { useEmptyStateButton } from '@/shared/hooks/useEmptyStateButton';
import { LearnMoreLink } from '../../shared/LearnMoreLink';
import { NoPositionsHeader } from '../../shared/NoPositionsHeader';
import { NoPositionsInfoCard } from '../../shared/NoPositionsInfoCard';
import { OnboardingContainer } from '../../shared/OnboardingContainer';

export const LiquidityPositionOnboarding = () => {
  const emptyStateButtonConfig = useEmptyStateButton({
    onStartAction: () => {},
    disconnectedDescription: 'View and manage your liquidity positions.',
    noLocksDescription:
      'Provide liquidity on the DEX to get LP tokens, then stake here.',
    hasLocksActionText: 'Start Selling',
  });

  return (
    <OnboardingContainer
      title="Liquidity Positions"
      description="Deposit liquidity to earn trading fees. Stake your LP in Klima for a fixed term to earn an additional share of kVCM incentives, plus K2 incentives. Unstake when your term ends."
    >
      <NoPositionsHeader
        title="No Staked Positions"
        icon={<WaterDropIcon className="w-10 h-10 fill-[#00994a]" />}
        description="Stake liquidity tokens to earn protocol rewards."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:w-2xl w-full mx-auto my-4">
        <NoPositionsInfoCard
          title="Dual Rewards"
          icon={<TrendingUpIcon className="w-5 h-5 fill-[#00994a]" />}
          description="DEX fees + kVCM & K2 rewards"
        />
        <NoPositionsInfoCard
          title="Fixed Terms"
          icon={<CalendarIcon className="w-5 h-5 fill-[#00994a]" />}
          description="Choose your maturity date"
        />
      </div>
      <div className="flex flex-col gap-0.5 mx-auto mb-4">
        <div className="text-size-12 text-center text-gray-900 my-1">
          Supported pools
        </div>
        <div className="flex gap-2">
          <div className="text-size-12 font-medium text-gray-900 bg-[#00994a]/10 rounded-full px-3 py-1">
            kVCM/USDC
          </div>
          <div className="text-size-12 font-medium text-gray-900 bg-[#00994a]/10 rounded-full px-3 py-1">
            kVCM/K2
          </div>
        </div>
      </div>
      <div className="mb-2">
        <EmptyStateButton
          cta={{
            ...emptyStateButtonConfig,
            className: 'w-full max-w-2xl mx-auto h-12 mb-2',
          }}
        />
      </div>
      <LearnMoreLink />
    </OnboardingContainer>
  );
};
