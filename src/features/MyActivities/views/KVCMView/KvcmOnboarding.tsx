'use client';

import { EmptyStateButton } from '@/shared/components/EmptyState/EmptyStateButton';
import { AllocateIcon } from '@/shared/components/Svg/AllocateIcon';
import { CalendarIcon } from '@/shared/components/Svg/CalendarIcon';
import { LockIcon } from '@/shared/components/Svg/LockIcon';
import { TrendingUpIcon } from '@/shared/components/Svg/TrendingUpIcon';
import { useEmptyStateButton } from '@/shared/hooks/useEmptyStateButton';
import { LearnMoreLink } from '../../shared/LearnMoreLink';
import { NoPositionsHeader } from '../../shared/NoPositionsHeader';
import { NoPositionsInfoCard } from '../../shared/NoPositionsInfoCard';
import { OnboardingContainer } from '../../shared/OnboardingContainer';

export const KvcmOnboarding = () => {
  const emptyStateButtonConfig = useEmptyStateButton({
    description: 'View and manage your kVCM locks.',
    onClick: (openConnectModal) => openConnectModal(),
  });

  return (
    <OnboardingContainer
      title="kVCM Locks"
      description="Lock kVCM for a fixed term to receive incentives when the term ends. Locked kVCM can also be allocated to carbon classes to influence protocol pricing. Incentives (K2) accrue on locked kVCM and are claimable anytime."
    >
      <NoPositionsHeader
        title="No active locks"
        icon={<LockIcon className="w-10 h-10 fill-[#00994a]" />}
        description="Create your first kVCM lock to participate in carbon class allocation and receive incentives."
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:w-2xl w-full mx-auto my-4">
        <NoPositionsInfoCard
          title="Fixed terms"
          icon={<CalendarIcon className="w-5 h-5 fill-[#00994a]" />}
          description="Choose your lock duration"
        />
        <NoPositionsInfoCard
          title="Dual incentives"
          icon={<TrendingUpIcon className="w-5 h-5 fill-[#00994a]" />}
          description="kVCM + K2 incentives"
        />
        <NoPositionsInfoCard
          title="Allocate to carbon"
          icon={<AllocateIcon className="w-5 h-5 fill-[#00994a]" />}
          description="Influence carbon class pricing"
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
