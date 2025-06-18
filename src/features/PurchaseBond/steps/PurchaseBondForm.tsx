'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import FormErrors from '@/shared/components/FormErrors/FormErrors';
import Input from '@/shared/components/Input/Input';
import SelectInput from '@/shared/components/SelectInput/SelectInput';
import Yield from '@/shared/components/Yield/Yield';
import { tokens } from '@/shared/constants/tokens.constants';
import {
  MATURITY_DATES_OPTIONS,
  PurchaseBondFC,
  PurchaseBondFields,
} from '../purchaseBond.constants';

const PurchaseBondForm: PurchaseBondFC = ({ next, data }) => {
  const { form } = data;
  const { handleSubmit, formState } = form;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (_data: PurchaseBondFields) => {
    next();
  };
  console.info(form.register('maturityDate'));
  return (
    <Card title="Purchase a Bond" className="w-flowcard">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pt-3">
          <SelectInput
            label="Token"
            disabled={true}
            value={tokens.klima.symbol}
            items={Object.values(tokens).map((token) => ({
              value: token.symbol,
              label: token.symbol,
              icon: token.icon,
            }))}
            {...form.register('token')}
          />
          <Yield baseApy={0.06} riskyYield={0.14}></Yield>
          <Input
            label="Amount"
            type="number"
            icon={tokens.klima.icon}
            {...form.register('amount')}
          />
          <SelectInput
            label="Maturity Date"
            items={MATURITY_DATES_OPTIONS}
            {...form.register('maturityDate')}
            defaultValue={'1y'}
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
        <FormErrors formState={formState} />
      </form>
    </Card>
  );
};

export default PurchaseBondForm;
