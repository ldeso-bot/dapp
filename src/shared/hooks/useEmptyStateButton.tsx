import { LockIcon } from '@/shared/components/Svg/LockIcon';
import { TuneIcon } from '@/shared/components/Svg/TuneIcon';
import { WalletIcon } from '@/shared/components/Svg/WalletIcon';
import type { WalletState } from '@/shared/utils/emptyState.utils';
import { useMemo, useState } from 'react';

type Props = {
  onStartAction?: () => void;
  disconnectedDescription?: string;
  noLocksDescription?: string;
  hasLocksActionText?: string;
  lockedKvcmAmount?: number;
  lockedK2Amount?: number;
  totalUsdValue?: number;
};

const defaultMockBalances = {
  lockedKvcm: { amount: 850.25, usdValue: 2125.63 },
  lockedK2: { amount: 425.0, usdValue: 1275.0 },
};

export const useEmptyStateButton = ({
  onStartAction,
  disconnectedDescription = 'View and manage your allocations.',
  noLocksDescription = 'Lock kVCM or K2 tokens in positions before you can allocate.',
  hasLocksActionText = 'Start Allocating',
  lockedKvcmAmount = defaultMockBalances.lockedKvcm.amount,
  lockedK2Amount = defaultMockBalances.lockedK2.amount,
  totalUsdValue = defaultMockBalances.lockedKvcm.usdValue +
    defaultMockBalances.lockedK2.usdValue,
}: Props = {}) => {
  const [walletState, setWalletState] = useState<WalletState>('disconnected');

  const states: WalletState[] = useMemo(
    () => ['disconnected', 'connected-no-locks', 'has-locks'],
    []
  );

  const LocksDescription = () => (
    <>
      You have{' '}
      <span className="font-medium text-foreground">
        {lockedKvcmAmount.toLocaleString()} kVCM
      </span>{' '}
      and{' '}
      <span className="font-medium text-foreground">
        {lockedK2Amount.toLocaleString()} K2
      </span>{' '}
      <span className="text-foreground">
        (${totalUsdValue.toLocaleString()})
      </span>{' '}
      locked and ready to allocate.
    </>
  );

  const getButtonConfig = () => {
    let text: string;
    let icon: React.ComponentType<{ className?: string }>;
    let description: string | React.ReactNode;

    switch (walletState) {
      case 'disconnected':
        text = 'Connect wallet to start';
        icon = WalletIcon;
        description = disconnectedDescription;
        break;
      case 'connected-no-locks':
        text = 'Lock Tokens First';
        icon = LockIcon;
        description = noLocksDescription;
        break;
      case 'has-locks':
        text = hasLocksActionText;
        icon = TuneIcon;
        description = <LocksDescription />;
        break;
    }

    return {
      text,
      icon,
      description,
      onClick: () => {
        if (walletState !== 'has-locks') {
          const currentIndex = states.indexOf(walletState);
          setWalletState(states[(currentIndex + 1) % states.length]);
        } else {
          onStartAction?.();
        }
      },
    };
  };

  return getButtonConfig();
};
