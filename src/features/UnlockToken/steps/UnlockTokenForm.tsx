'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { formatPercentage } from '@/shared/utils/string.utils';
import { useAtomValue } from 'jotai';
import {
  tooltip,
  unlockTokenDialogAtom,
  UnlockTokenFields,
} from '../unlockToken.utils';

const UnlockTokenForm: FormFlowStep<UnlockTokenFields> = ({ next, data }) => {
  const { form } = data;
  const { handleSubmit } = form;
  const unlockTokenDialogState = useAtomValue(unlockTokenDialogAtom);
  const lock = unlockTokenDialogState.lock;

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = () => {
    next();
  };

  if (!lock) return null;

  return (
    <Card title="Claim your matured bond">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pt-3">
          <Input
            label="Token"
            value={tokens[lock.token].symbol}
            iconSrc={tokens[lock.token].iconSrc}
            readOnly={true}
          />
          <Input
            label="Bond Amount"
            type="number"
            iconSrc={tokens[lock.token].iconSrc}
            value={lock.balance}
            readOnly={true}
          />
          <Input
            label="K2 Rewards"
            type="number"
            iconSrc={tokens.k2.iconSrc}
            value={lock.balance}
            readOnly={true}
            tooltip={tooltip}
          />
          <Input
            label="Carbon Yield"
            value={formatPercentage(lock.apyPercent)}
            readOnly={true}
            tooltip={tooltip}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Button colors="secondary" context="flow" type="submit">
            Claim
          </Button>
          <Button
            colors="primary"
            context="flow"
            href={`${ROUTES.MY_HOLDINGS}`}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default UnlockTokenForm;
