import { CardProps } from '@/shared/components/Card/Card';
import Icon from '@/shared/components/Icon/Icon';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { K2Lock } from '@/shared/models/walletData';
import { formatDate } from '@/shared/utils/string.utils';
import HoldingsCard from '../../Shared/HoldingsCard';

export default function K2LocksCard(props: CardProps) {
  const { data } = useWalletData();

  const getIcon = () => {
    return <Icon icon={tokens.klimax.icon} size={16} />;
  };

  const getButtonTooltip = (k2Lock: K2Lock) => {
    return <div>This bond matures on {formatDate(k2Lock.endTimestamp)}</div>;
  };

  return (
    <HoldingsCard
      {...props}
      title="K2 Locks"
      tooltip="There should be a tooltip here"
      data={data?.k2Locks}
      getIcon={getIcon}
      getButtonLabel={() => 'Claim'}
      getButtonTooltip={getButtonTooltip}
    />
  );
}
