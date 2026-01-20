'use client';

import { alertAtom } from '@/features/Alert/alert.atom';
import { useTransactionWithValidation } from '@/features/MyHoldings/hooks/useTransactionWithValidation';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import { DialogHeader } from '@/shared/components/Dialog/DialogHeader';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import {
  formatAmountWithCommas,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
import { useAtom, useSetAtom } from 'jotai';
import { useAccount } from 'wagmi';
import { claimIncentivesDialogAtom } from '../claimIncentives.utils';

export default function ClaimIncentivesForm() {
  const setAlert = useSetAtom(alertAtom);
  const [dialog, setDialog] = useAtom(claimIncentivesDialogAtom);
  const { address, chain } = useAccount();
  const { contract: stakingContract } = useContract('StakingManagerDiamond');

  const claimableK2 = dialog.claimableK2 ?? 0;
  const accruedK2 = dialog.accruedK2 ?? 0;
  const accruingK2 = dialog.accruingK2 ?? 0;
  const claimableK2Usd = dialog.claimableK2Usd ?? 0;

  const { executeWithValidation, isExecuting } =
    useTransactionWithValidation<WalletData>({
      queryKey: [`wallet-data-${address}`],
    });

  const close = () =>
    setDialog({
      open: false,
      claimableK2: null,
      accruedK2: null,
      accruingK2: null,
      claimableK2Usd: null,
    });

  const onConfirm = async () => {
    try {
      if (!stakingContract || !address || !chain) {
        throw new Error('Wallet or contract not ready');
      }
      await executeWithValidation(() =>
        stakingContract.write.claimK2([], { chain })
      );
      setAlert({
        title: 'K2 Incentives Claimed',
        description: `Successfully claimed ${formatAmountWithCommas(claimableK2)} K2 incentives from kVCM locks.`,
        type: 'success',
      });
      close();
    } catch (error) {
      const handled = handleWeb3Error(error);
      setAlert({
        title: 'K2 Incentives Claim Failed',
        description: handled.error ?? 'Transaction failed',
        type: 'error',
      });
    }
  };

  return (
    <Card className="rounded-lg px-6 py-4 max-h-[70vh] overflow-y-auto w-[42rem] mx-auto">
      <div className="space-y-4">
        <DialogHeader
          onClose={close}
          showCloseButton
          title="Claim K2 Incentives"
        />
        <div className="space-y-2">
          <p className="text-size-14 text-gray-600">
            These are K2 incentives earned from your kVCM locks. Claiming them
            doesn&apos;t affect your kVCM principal or maturity dates.
          </p>
        </div>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="space-y-1">
              <span className="text-size-14 font-medium text-green-900">
                Total K2 incentives to claim
              </span>
              <div className="text-[2.8rem] font-bold text-green-900 tabular-nums my-2">
                {formatAmountWithCommas(claimableK2)} K2
              </div>
              <p className="text-size-12 text-green-700">
                {formatPriceUSDWithCommas(claimableK2Usd)}
              </p>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-4 border border-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-size-14 font-medium text-foreground">
                Breakdown
              </span>
              <Tooltip content="K2 incentives are earned from your kVCM locks over time." />
            </div>
            <div className="space-y-2 text-size-14">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Accrued to date</span>
                  <Tooltip content="K2 incentives from finished kVCM locks (matured/claimed). This amount won't change unless you claim it." />
                </div>
                <span className="font-medium tabular-nums">
                  {formatAmountWithCommas(accruedK2)} K2
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Accruing</span>
                  <Tooltip content="K2 incentives tied to Active kVCM locks. Already claimable AND will continue to increase while those locks remain Active." />
                </div>
                <span className="font-medium tabular-nums">
                  {formatAmountWithCommas(accruingK2)} K2
                </span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="text-size-12 text-gray-700">
              <span className="font-medium">Note:</span> Your kVCM principal
              remains locked and will mature at the original dates. Only the K2
              incentives are being claimed.
            </div>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <Button
            colors="primary"
            context="flow"
            className="flex-1 rounded-xl"
            type="button"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            type="button"
            colors="secondary"
            context="flow"
            className="flex-1 rounded-xl"
            loading={isExecuting}
            disabled={claimableK2 <= 0}
            onClick={onConfirm}
          >
            {isExecuting ? 'Claiming...' : 'Confirm Claim'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
