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
    description: 'View and manage your liquidity positions.',
    onClick: (openConnectModal) => openConnectModal(),
  });

  return (
    <OnboardingContainer
      title="Liquidity Pools"
      description="Deposit liquidity to benefit from trading fees. Stake your liquidity in Klima Protocol for a fixed duration to become eligible for a variable share of kVCM incentives and K2 incentives. Unstake once your chosen term ends."
    >
      <NoPositionsHeader
        title="No staked positions"
        icon={<WaterDropIcon className="w-10 h-10 fill-[#00994a]" />}
        description="Deposit liquidity tokens to become eligible for protocol incentives."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:w-2xl w-full mx-auto my-4">
        <NoPositionsInfoCard
          title="Dual rewards"
          icon={<TrendingUpIcon className="w-5 h-5 fill-[#00994a]" />}
          description="DEX fees + variable kVCM & K2 incentives"
        />
        <NoPositionsInfoCard
          title="Fixed terms"
          icon={<CalendarIcon className="w-5 h-5 fill-[#00994a]" />}
          description="Choose your own deposit duration"
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
