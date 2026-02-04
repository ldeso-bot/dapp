'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import TokenAmountInput from '@/shared/components/Form/TokenAmountInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { tokens } from '@/shared/constants/tokens.constants';
import { useAtom } from 'jotai';
import {
  unlockK2TokenDialogAtom,
  UnlockTokenFields,
} from '../unlockK2Token.utils';

const UnlockK2TokenForm: FormFlowStep<UnlockTokenFields> = ({ next, data }) => {
  const { form } = data;
  const { handleSubmit } = form;
  const [unlockTokenDialogState, setUnlockTokenDialogState] = useAtom(
    unlockK2TokenDialogAtom
  );
  const lock = unlockTokenDialogState.lock;

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = () => {
    next();
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
            inputProps={{
              type: 'number',
              'aria-label': 'Token Input',
              placeholder: 'Select a token first',
              ...form.register('amount'),
              max: lock.lockedAmount,
              min: 0,
              step: 0.001,
            }}
            availableBalance={lock.lockedAmount}
          />
        </InputGroup>
        <ButtonGroup>
          <Button colors="secondary" context="flow" type="submit">
            Unlock
          </Button>
          <Button
            colors="primary"
            context="flow"
            onClick={() =>
              setUnlockTokenDialogState({ open: false, lock: null })
            }
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};

export default UnlockK2TokenForm;
