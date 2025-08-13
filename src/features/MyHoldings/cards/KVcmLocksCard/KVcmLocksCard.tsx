import { lockTokenDialogAtom } from '@/features/MyHoldings/modals/LockToken/lockToken.utils';
import Button from '@/shared/components/Button/Button';
import { CardProps } from '@/shared/components/Card/Card';
import Icon from '@/shared/components/Icon/Icon';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import Plus from '@/shared/images/plus.svg';
import { Lock } from '@/shared/models/walletData';
import { formatDate } from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import HoldingsCard from '../../Shared/HoldingsCard';

export default function KvcmLocksCard(props: CardProps) {
  const { data } = useWalletData();
  const setLockTokenDialogState = useSetAtom(lockTokenDialogAtom);

  const kvcmLocks = data?.locks.filter((lock) => lock.token === 'kvcm');

  const getButtonTooltip = (kVcmLock: Lock) => {
    return <div>This bond matures on {formatDate(kVcmLock.endTimestamp)}</div>;
  };

  return (
    <HoldingsCard
      {...props}
      title="kVCM Locks"
      tooltip="There should be a tooltip here"
      data={kvcmLocks}
      getIcon={() => tokens.kvcm.icon(1.6)}
      getButtonLabel={() => 'Claim'}
      getButtonTooltip={getButtonTooltip}
      getButtonHref={(lock) =>
        `${ROUTES.MY_HOLDINGS}?action=unlock_token_${lock.id}`
      }
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
