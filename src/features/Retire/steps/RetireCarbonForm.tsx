'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import SelectInput from '@/shared/components/Form/SelectInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { useState } from 'react';
import AmountInput from '../components/AmountInput/AmountInput';
import PayWithOptions from '../components/PayWithOptions/PayWithOptions';
import PriceDetails from '../components/PriceDetails/PriceDetails';
import { RetireCarbonFields, carbonPrices } from '../retire.constants';

const RetireCarbonForm: FormFlowStep<RetireCarbonFields> = ({ next, data }) => {
  const { form } = data;
  const [paymentMethod, setPaymentMethod] = useState('kvcm');

  const onSubmit = () => {
    next();
  };

  if (!carbonPrices.length) {
    return null;
  }

  return (
    <Card
      title="Retire Carbon"
      className="w-[36rem] border-0 rounded-xl"
      titleClassName="font-bold text-void-80 text-size-18">
      <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pt-3">
          <SelectInput
            label="Carbon Class"
            defaultValue={`${carbonPrices[0].category}-${carbonPrices[0].type}`}
            items={Object.values(carbonPrices).map((carbonPrice) => ({
              label: `${carbonPrice.category} - ${carbonPrice.type}`,
              value: `${carbonPrice.category}-${carbonPrice.type}`,
            }))}
            {...form.register('carbonClass')}
          />
          <SelectInput
            label="Carbon Credit"
            defaultValue={`${carbonPrices[1].category}-${carbonPrices[1].type}`}
            items={Object.values(carbonPrices).map((carbonPrice) => ({
              label: `${carbonPrice.category} - ${carbonPrice.type}`,
              value: `${carbonPrice.category}-${carbonPrice.type}`,
            }))}
            {...form.register('carbonCredit')}
          />
          <AmountInput form={form} />
          <PayWithOptions value={paymentMethod} onChange={setPaymentMethod} />
          <PriceDetails paymentMethod={paymentMethod} />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Button disabled className="rounded-md" colors="secondary" context="flow" type="submit">
            Retire Carbon
          </Button>
          <Button className="rounded-md" colors="primary" context="flow" href="/">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RetireCarbonForm;
