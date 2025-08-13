import { CardProps } from '@/shared/components/Card/Card';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { Lock } from '@/shared/models/walletData';
import { formatDate } from '@/shared/utils/string.utils';
import HoldingsCard from '../../Shared/HoldingsCard';

export default function K2LocksCard(props: CardProps) {
  const { data } = useWalletData();

  const k2Locks = data?.locks.filter((lock) => lock.token === 'k2');

  const getButtonTooltip = (k2Lock: Lock) => {
    return <div>This bond matures on {formatDate(k2Lock.endTimestamp)}</div>;
  };

  return (
    <HoldingsCard
      {...props}
      title="K2 Locks"
      tooltip="There should be a tooltip here"
      data={k2Locks}
      getIcon={() => tokens.k2.icon(1.6)}
      getButtonLabel={() => 'Claim'}
      getButtonTooltip={getButtonTooltip}
      getButtonHref={(lock) =>
        `${ROUTES.MY_HOLDINGS}?action=unlock_token_${lock.id}`
      }
    />
  );
}
