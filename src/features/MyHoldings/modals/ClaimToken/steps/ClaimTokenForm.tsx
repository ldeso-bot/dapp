'use client';

import { useClaimKvcmLockRewards } from '@/features/MyHoldings/modals/ClaimKvcmLockRewards/hooks/useClaimKvcmLockRewards';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { Token } from '@/shared/constants/tokens.constants';
import { getTokenSymbol } from '@/shared/utils/token.utils';
import { useAtom } from 'jotai';
import { claimTokenDialogAtom, ClaimTokenFields } from '../claimToken.utils';

const ClaimTokenForm: FormFlowStep<ClaimTokenFields> = ({ data }) => {
  const { form } = data;
  const { handleSubmit } = form;
  const [claimTokenDialog, setClaimTokenDialog] = useAtom(claimTokenDialogAtom);
  const { claimToken, isSubmitting } = useClaimKvcmLockRewards();

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = async () => {
    if (!claimTokenDialog.lockId) return;

    const { success } = await claimToken(claimTokenDialog.lockId);
    if (success) {
      setClaimTokenDialog({
        open: false,
        token: null,
        amount: null,
        lockId: null,
      });
    }
  };

  if (!claimTokenDialog.token || !claimTokenDialog.amount) return null;

  return (
    <Card className="rounded-lg px-6 py-4 overflow-y-auto w-[42rem]">
      <h2 className="text-size-20 font-semibold text-gray-900">Claim token</h2>
      <p className="text-size-14 text-gray-500">
        You are about to claim {claimTokenDialog.amount ?? 0}{' '}
        {getTokenSymbol(claimTokenDialog.token as Token)} from your matured
        lock.
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ButtonGroup>
          <Button
            colors="secondary"
            context="flow"
            type="submit"
            loading={isSubmitting}
          >
            Claim
          </Button>
          <Button
            colors="primary"
            context="flow"
            disabled={isSubmitting}
            onClick={() =>
              setClaimTokenDialog({
                open: false,
                token: null,
                amount: null,
                lockId: null,
              })
            }
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};

export default ClaimTokenForm;
