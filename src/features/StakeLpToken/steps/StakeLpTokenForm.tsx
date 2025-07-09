'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import SelectInput from '@/shared/components/Form/SelectInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import Yield from '@/shared/components/Yield/Yield';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  DEFAULT_LP_TOKEN,
  lpTokens,
  tokens,
} from '@/shared/constants/tokens.constants';
import {
  MATURITY_DATES,
  MATURITY_DATES_OPTIONS,
} from '@/shared/utils/protocol.utils';
import { isLpToken } from '@/shared/utils/typeguards';
import { useAtomValue } from 'jotai';
import {
  stakeLpTokenDialogAtom,
  StakeLpTokenFields,
} from '../stakeLpToken.utils';

const StakeLpTokenForm: FormFlowStep<StakeLpTokenFields> = ({ next, data }) => {
  const { form } = data;
  const { handleSubmit, formState, watch } = form;
  const stakeLpTokenDialogState = useAtomValue(stakeLpTokenDialogAtom);

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = () => {
    next();
  };

  const token = watch('token');

  const typedToken = isLpToken(token) ? token : DEFAULT_LP_TOKEN;

  return (
    <Card title="Lock LP Tokens">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pt-3">
          <SelectInput
            label="Token"
            defaultValue={stakeLpTokenDialogState.token ?? DEFAULT_LP_TOKEN}
            items={Object.entries(lpTokens).map(([key, token]) => ({
              value: key,
              label: token.symbol,
              icon: token.icon(),
            }))}
            {...form.register('token')}
          />
          <Yield baseApy={0.06} riskyYield={0.14}></Yield>
          <Input
            label="Amount"
            type="number"
            iconSrc={tokens[typedToken].iconSrc}
            {...form.register('amount')}
            error={formState.errors.amount}
          />
          <SelectInput
            label="Maturity Date"
            items={MATURITY_DATES_OPTIONS}
            {...form.register('maturityDate')}
            // Select Input being a custom (non HTML input) we cannot set the default value using react hook form
            defaultValue={MATURITY_DATES[0]}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Button colors="secondary" context="flow" type="submit">
            Lock LP Tokens
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

export default StakeLpTokenForm;
