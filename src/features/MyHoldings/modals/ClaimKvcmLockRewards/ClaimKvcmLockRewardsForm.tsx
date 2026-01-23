'use client';

import { useClaimKvcmLockRewards } from '@/features/MyHoldings/modals/ClaimKvcmLockRewards/hooks/useClaimKvcmLockRewards';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import { useContractInfo } from '@/shared/hooks/web3/useContract';
import RewardManagerDiamond from '@/shared/utils/abis/RewardManagerDiamond';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { formatStringToNumber } from '@/shared/utils/subgraph.utils';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { isNonNullish } from 'remeda';
import { useReadContract } from 'wagmi';
import { claimKvcmLockRewardsDialogAtom } from './claimKvcmLockRewards.utils';

const ClaimKvcmLockRewardsDialog = () => {
  const [claimKvcmLockRewardsDialog, setClaimKvcmLockRewardsDialog] = useAtom(
    claimKvcmLockRewardsDialogAtom
  );
  const { claimToken, isSubmitting } = useClaimKvcmLockRewards();
  const rewardManager = useContractInfo('RewardManagerDiamond');

  const args = useMemo(() => {
    return claimKvcmLockRewardsDialog.lockId
      ? ([BigInt(claimKvcmLockRewardsDialog.lockId ?? 0)] as const)
      : undefined;
  }, [claimKvcmLockRewardsDialog.lockId]);

  const { data: yieldAmount } = useReadContract({
    address: rewardManager.address as `0x${string}`,
    abi: RewardManagerDiamond,
    functionName: 'getKvcmLockYield',
    args,
    query: {
      enabled: !!claimKvcmLockRewardsDialog.lockId && !!rewardManager.address,
    },
  });

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = async () => {
    if (!claimKvcmLockRewardsDialog.lockId) return;

    const { success } = await claimToken(claimKvcmLockRewardsDialog.lockId);
    if (success) {
      setClaimKvcmLockRewardsDialog({
        open: false,
        lockId: null,
      });
    }
  };

  const amount = formatStringToNumber(yieldAmount as bigint | undefined, 18);
  console.log('amount', yieldAmount);

  return (
    <Card className="rounded-lg px-6 py-4 overflow-y-auto w-[42rem]">
      {isNonNullish(yieldAmount) && (
        <>
          <h2 className="text-size-20 font-semibold text-gray-900">
            Claim token
          </h2>
          <p className="text-size-14 text-gray-500">
            You are about to claim {formatAmountWithCommas(amount, 2)} KVCM from
            your matured lock.
          </p>
          <Form>
            <ButtonGroup>
              <Button
                colors="secondary"
                context="flow"
                type="submit"
                loading={isSubmitting}
                onClick={onSubmit}
              >
                Claim
              </Button>
              <Button
                colors="primary"
                context="flow"
                disabled={isSubmitting}
                onClick={() =>
                  setClaimKvcmLockRewardsDialog({
                    open: false,
                    lockId: null,
                  })
                }
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Form>
        </>
      )}
    </Card>
  );
};

export default ClaimKvcmLockRewardsDialog;
