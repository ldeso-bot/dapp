'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import SelectInput from '@/shared/components/Form/SelectInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import AmountInput from '../components/AmountInput/AmountInput';
import PayWithOptions from '../components/PayWithOptions/PayWithOptions';
import { RetireCarbonFields, carbonPrices } from '../retire.constants';

const RetireCarbonForm: FormFlowStep<RetireCarbonFields> = ({ next, data }) => {
  const { form } = data;
  const { handleSubmit } = form;

  const onSubmit = () => {
    next();
  };

  if (!carbonPrices.length) {
    return null;
  }

  return (
    <Card
      title="Retire Carbon"
      className="w-flowcard"
      titleClassName="text-size-18 font-bold text-void-80">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
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
          <PayWithOptions />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Button colors="secondary" context="flow" type="submit">
            Retire Carbon
          </Button>
          <Button colors="primary" context="flow" href="/">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RetireCarbonForm;
