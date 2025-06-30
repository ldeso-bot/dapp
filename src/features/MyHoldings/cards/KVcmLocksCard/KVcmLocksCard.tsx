import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { KVcmLock } from '@/shared/models/walletData';
import { formatDate } from '@/shared/utils/string.utils';
import HoldingsCard from '../../Shared/HoldingsCard';

export default function KvcmLocksCard(props: CardProps) {
  const { data } = useWalletData();

  const getButtonTooltip = (bond: KVcmLock) => {
    return <div>This bond matures on {formatDate(bond.endTimestamp)}</div>;
  };

  return (
    <HoldingsCard
      {...props}
      title="kVCM Locks"
      tooltip="There should be a tooltip here"
      data={data?.kvcmLocks}
      getIcon={() => tokens.kvcm.icon(16)}
      getButtonLabel={() => 'Claim'}
      getButtonTooltip={getButtonTooltip}
    />
  );
}
