import { CardProps } from '@/shared/components/Card/Card';
import Icon from '@/shared/components/Icon/Icon';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { KVcmLock } from '@/shared/models/walletData';
import { formatDate } from '@/shared/utils/string.utils';
import HoldingsCard from '../../Shared/HoldingsCard';

export default function KvcmLocksCard(props: CardProps) {
  const { data } = useWalletData();

  const getIcon = () => {
    return <Icon icon={tokens.klima.icon} size={16} />;
  };

  const getButtonTooltip = (bond: KVcmLock) => {
    return <div>This bond matures on {formatDate(bond.endTimestamp)}</div>;
  };

  return (
    <HoldingsCard
      {...props}
      title="kVCM Locks"
      tooltip="There should be a tooltip here"
      data={data?.kvcmLocks}
      getIcon={getIcon}
      getButtonLabel={() => 'Claim'}
      getButtonTooltip={getButtonTooltip}
    />
  );
}
