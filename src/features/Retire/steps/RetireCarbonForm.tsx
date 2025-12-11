'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import SelectInput from '@/shared/components/Form/SelectInput';
import TokenAmountInput from '@/shared/components/Form/TokenAmountInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { tokens } from '@/shared/constants/tokens.constants';
import { useState } from 'react';
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
      className="w-[45rem] rounded-xl border border-gray-200"
      titleClassName="font-semibold text-gray-800 text-size-20 tracking-tight"
    >
      <Form className="-mt-1.5" onSubmit={form.handleSubmit(onSubmit)}>
        <InputGroup>
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
            placeholder="Select from available carbon credits"
            defaultValue={`${carbonPrices[1].category}-${carbonPrices[1].type}`}
            items={Object.values(carbonPrices).map((carbonPrice) => ({
              label: `${carbonPrice.category} - ${carbonPrice.type}`,
              value: `${carbonPrice.category}-${carbonPrice.type}`,
            }))}
            {...form.register('carbonCredit')}
          />
          <TokenAmountInput
            tokenIconSrc={tokens.kvcm.iconSrc}
            errorMessage={form.formState.errors.amount}
            inputProps={{
              type: 'number',
              'aria-label': 'Token Input',
              placeholder: 'Select a token first',
              ...form.register('amount'),
            }}
          />
          <PayWithOptions value={paymentMethod} onChange={setPaymentMethod} />
          <PriceDetails paymentMethod={paymentMethod} />
        </InputGroup>
        <ButtonGroup className="flex-row w-full">
          <Button
            className="rounded-md"
            colors="primary"
            context="flow"
            href="/"
          >
            Cancel
          </Button>
          <Button
            disabled
            className="rounded-md"
            colors="secondary"
            context="flow"
            type="submit"
          >
            Retire Carbon
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};

export default RetireCarbonForm;
