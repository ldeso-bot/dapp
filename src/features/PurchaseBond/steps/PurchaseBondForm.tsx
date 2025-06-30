'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import SelectInput from '@/shared/components/Form/SelectInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import Yield from '@/shared/components/Yield/Yield';
import { tokens } from '@/shared/constants/tokens.constants';
import {
  MATURITY_DATES,
  MATURITY_DATES_OPTIONS,
  PurchaseBondFields,
} from '../purchaseBond.constants';

const PurchaseBondForm: FormFlowStep<PurchaseBondFields> = ({ next, data }) => {
  const { form } = data;
  const { handleSubmit, formState } = form;

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = () => {
    next();
  };

  return (
    <Card title="Purchase a Bond" className="w-flowcard">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pt-3">
          <SelectInput
            // If we can bond only Klima this can be a simple Input
            label="Token"
            disabled={true}
            value={tokens.kvcm.symbol}
            items={Object.values(tokens).map((token) => ({
              value: token.symbol,
              label: token.symbol,
              icon: token.icon(),
            }))}
            {...form.register('token')}
          />
          <Yield baseApy={0.06} riskyYield={0.14}></Yield>
          <Input
            label="Amount"
            type="number"
            iconSrc={tokens.kvcm.iconSrc}
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
            Bond Klima
          </Button>
          <Button colors="primary" context="flow" href="/">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PurchaseBondForm;
