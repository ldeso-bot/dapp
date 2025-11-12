'use client';

import Button from '@/shared/components/Button/Button';
import SoloCard from '@/shared/components/Card/SoloCard';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import SelectInput from '@/shared/components/Form/SelectInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import Yield from '@/shared/components/Yield/Yield';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  DEFAULT_LP_TOKEN,
  isLpToken,
  lpTokens,
  tokens,
} from '@/shared/constants/tokens.constants';
import {
  MATURITY_DATES,
  MATURITY_DATES_OPTIONS,
} from '@/shared/utils/protocol.utils';
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
    <SoloCard title="Lock LP Tokens">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
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
            defaultValue={MATURITY_DATES[0]}
          />
        </InputGroup>
        <ButtonGroup>
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
        </ButtonGroup>
      </Form>
    </SoloCard>
  );
};

export default StakeLpTokenForm;
