'use client';

import Button from '@/shared/components/Button/Button';
import SoloCard from '@/shared/components/Card/SoloCard';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useAtomValue } from 'jotai';
import {
  tooltip,
  unstakeLpTokenDialogAtom,
  UnstakeLpTokenFields,
} from '../unstakeLpToken.utils';

const UnstakeLpTokenForm: FormFlowStep<UnstakeLpTokenFields> = ({
  next,
  data,
}) => {
  const { form } = data;
  const { handleSubmit, formState } = form;
  const unstakeLpTokenDialogState = useAtomValue(unstakeLpTokenDialogAtom);
  const liquidityPosition = unstakeLpTokenDialogState.liquidityPosition;

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = () => {
    next();
  };

  if (!liquidityPosition) return null;
  return (
    <SoloCard title="Unlock LP Tokens">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Input
            label="Token"
            value={tokens[liquidityPosition.token].symbol}
            iconSrc={tokens[liquidityPosition.token].iconSrc}
            readOnly={true}
          />
          <Input
            label="Amount"
            type="number"
            iconSrc={tokens[liquidityPosition.token].iconSrc}
            {...form.register('amount')}
            error={formState.errors.amount}
          />
          <Input
            label="K2 Rewards"
            iconSrc={tokens.k2.iconSrc}
            readOnly={true}
            value={`${liquidityPosition.rewards.k2} ${tokens.k2.symbol}`}
            tooltip={tooltip}
          />
          <Input
            label="KVCM Rewards"
            iconSrc={tokens.kvcm.iconSrc}
            readOnly={true}
            value={`${liquidityPosition.rewards.kvcm} ${tokens.kvcm.symbol}`}
            tooltip={tooltip}
          />
        </InputGroup>
        <ButtonGroup>
          <Button colors="secondary" context="flow" type="submit">
            Unlock
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

export default UnstakeLpTokenForm;
