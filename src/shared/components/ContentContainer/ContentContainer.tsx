'use client';

import { useHasPreviouslyConnected } from '@/shared/hooks/useHasPreviouslyConnected';
import { cn } from '@/shared/utils/component.utils';
import { useAccount } from 'wagmi';

export const ContentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isConnected } = useAccount();
  const { hasPreviouslyConnected } = useHasPreviouslyConnected();

  const isLoggedOut = !isConnected && !hasPreviouslyConnected;

  return (
    <div className="flex-1 bg-surface-3 p-6">
      <div
        className={cn('mx-auto w-full', {
          'max-w-[1200px]': !isLoggedOut,
        })}
      >
        {children}
      </div>
    </div>
  );
};
