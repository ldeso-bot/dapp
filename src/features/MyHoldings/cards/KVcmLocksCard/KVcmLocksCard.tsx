import { lockTokenDialogAtom } from '@/features/LockToken/lockToken.utils';
import Button from '@/shared/components/Button/Button';
import { CardProps } from '@/shared/components/Card/Card';
import Icon from '@/shared/components/Icon/Icon';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import Plus from '@/shared/images/plus.svg';
import { KVcmLock } from '@/shared/models/walletData';
import { formatDate } from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import HoldingsCard from '../../Shared/HoldingsCard';

export default function KvcmLocksCard(props: CardProps) {
  const { data } = useWalletData();
  const setLockTokenDialogState = useSetAtom(lockTokenDialogAtom);

  const getButtonTooltip = (bond: KVcmLock) => {
    return <div>This bond matures on {formatDate(bond.endTimestamp)}</div>;
  };

  return (
    <HoldingsCard
      {...props}
      title="kVCM Locks"
      tooltip="There should be a tooltip here"
      data={data?.kvcmLocks}
      getIcon={() => tokens.kvcm.icon(1.6)}
      getButtonLabel={() => 'Claim'}
      getButtonTooltip={getButtonTooltip}
      titleAddOnFar={
        <Button
          colors="secondary"
          onClick={() => {
            setLockTokenDialogState({ open: true, token: 'kvcm' });
          }}
        >
          <Icon icon={Plus} size={1.6} /> Lock
        </Button>
      }
    />
  );
}
