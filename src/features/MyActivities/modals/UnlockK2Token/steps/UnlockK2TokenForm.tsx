'use client';

import { alertAtom } from '@/features/Alert/alert.atom';
import { useUnlockK2 } from '@/features/MyActivities/modals/UnlockK2Token/hooks/useUnlockK2';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import TokenAmountInput from '@/shared/components/Form/TokenAmountInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useSetAtom } from 'jotai';
import {
  unlockK2TokenDialogAtom,
  UnlockTokenFields,
} from '../unlockK2Token.utils';

const UnlockK2TokenForm: FormFlowStep<UnlockTokenFields> = ({ data }) => {
  const { form } = data;
  const { handleSubmit, formState } = form;
  const { unlockK2, lock, isExecuting } = useUnlockK2(form);
  const setUnlockTokenDialogState = useSetAtom(unlockK2TokenDialogAtom);
  const setAlert = useSetAtom(alertAtom);

  // Handle form submission by directly unlocking the tokens
  const onSubmit = async () => {
    const result = await unlockK2();

    if (result.error) {
      setAlert({
        title: 'Unlock Failed',
        description: result.error,
        type: 'error',
      });
      return;
    }

    setAlert({
      title: 'Unlock Successful',
      description: `You've successfully unlocked ${form.watch('amount')} of your ${tokens[lock!.token].symbol} tokens! You can manage your positions in the "My Activities" dashboard.`,
      type: 'success',
      links: [
        {
          label: 'My Activities',
          href: ROUTES.MY_ACTIVITIES,
        },
      ],
    });
    setUnlockTokenDialogState({ open: false, lock: null });
  };

  if (!lock) return null;

  return (
    <Card title="Request unlock of your K2 tokens" className="w-[42rem]">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <TokenAmountInput
            name="amount"
            control={form.control}
            label="Amount to unlock"
            tokenIconSrc={tokens.k2.iconSrc}
            errorMessage={formState.errors.amount}
            inputProps={{
              type: 'number',
              'aria-label': 'Token Input',
              placeholder: 'Enter amount',
              max: lock.availableForUnlockRequestAmount,
              min: 0,
              step: 10 ** -tokens.k2.decimals,
            }}
            availableBalance={lock.availableForUnlockRequestAmount}
          />
        </InputGroup>
        <ButtonGroup>
          <div className="flex gap-3 w-full">
            <Button
              colors="primary"
              context="flow"
              onClick={() =>
                setUnlockTokenDialogState({ open: false, lock: null })
              }
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              colors="secondary"
              context="flow"
              type="submit"
              disabled={isExecuting || !formState.isValid}
              className="flex-1"
            >
              {isExecuting ? 'Unlocking...' : `Unlock ${tokens.k2.symbol}`}
            </Button>
          </div>
        </ButtonGroup>
      </Form>
    </Card>
  );
};

export default UnlockK2TokenForm;
