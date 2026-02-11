import { WalletIcon } from '@/shared/components/Svg/WalletIcon';

type Props = {
  onClick?: (openConnectModal: () => void) => void;
  description?: string;
};

export const useEmptyStateButton = ({
  onClick,
  description = 'View and manage your allocations.',
}: Props = {}) => {
  return {
    text: 'Connect wallet to start',
    icon: WalletIcon,
    description,
    onClick: (openConnectModal: () => void) => {
      if (onClick) return onClick(openConnectModal);
      openConnectModal();
    },
  };
};
