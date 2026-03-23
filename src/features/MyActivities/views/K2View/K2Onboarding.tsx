'use client';

import { EmptyStateButton } from '@/shared/components/EmptyState/EmptyStateButton';
import { AllocateIcon } from '@/shared/components/Svg/AllocateIcon';
import { ClockIcon } from '@/shared/components/Svg/ClockIcon';
import { SaveAltIcon } from '@/shared/components/Svg/SaveAltIcon';
import { TrendingUpIcon } from '@/shared/components/Svg/TrendingUpIcon';
import { useEmptyStateButton } from '@/shared/hooks/useEmptyStateButton';
import { LearnMoreLink } from '../../shared/LearnMoreLink';
import { NoPositionsHeader } from '../../shared/NoPositionsHeader';
import { NoPositionsInfoCard } from '../../shared/NoPositionsInfoCard';
import { OnboardingContainer } from '../../shared/OnboardingContainer';

export const K2Onboarding = () => {
  const emptyStateButtonConfig = useEmptyStateButton({
    description: 'View and manage your K2 deposits. [t246]',
    onClick: (openConnectModal) => openConnectModal(),
  });

  return (
    <OnboardingContainer
      title="K2 Position [t247]"
      description="Lock K2 and allocate your tokens to influence carbon class execution rates. Participation is incentivized via variable kVCM and K2 rewards. Unlock your tokens after 24 hours. [t248]"
    >
      <NoPositionsHeader
        title="No K2 position [t249]"
        icon={<SaveAltIcon className="w-10 h-10 fill-[#00994a]" />}
        description="Deposit K2 to earn variable rewards and allocate to carbon classes. [t250]"
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:w-2xl w-full mx-auto my-4">
        <NoPositionsInfoCard
          title="Variable rewards [t251]"
          icon={<TrendingUpIcon className="w-5 h-5 fill-[#00994a]" />}
          description="K2 incentives + kVCM incentives [t252]"
        />
        <NoPositionsInfoCard
          title="Unlock after 24 hours [t253]"
          icon={<ClockIcon className="w-5 h-5 fill-[#00994a]" />}
          description="Request unlock, claim at cutoff [t254]"
        />
        <NoPositionsInfoCard
          title="Allocate to carbon [t255]"
          icon={<AllocateIcon className="w-5 h-5 fill-[#00994a]" />}
          description="Shape carbon class execution rates. [t256]"
        />
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
