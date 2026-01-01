'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import SelectInput from '@/shared/components/Form/SelectInput';
import TokenAmountInput from '@/shared/components/Form/TokenAmountInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useEffect, useState } from 'react';
import { PayWithOptions } from '../components/PayWithOptions';
import { PriceDetails } from '../components/PriceDetails';
import { RetireCarbonFields } from '../retire.constants';

const RetireCarbonForm: FormFlowStep<RetireCarbonFields> = ({ next, data }) => {
  const { form } = data;
  const [paymentMethod, setPaymentMethod] = useState('kvcm');

  const onSubmit = () => {
    next();
  };

  const { data: protocolData, isLoading } = useProtocolData();

  const carbonClasses = protocolData?.carbonClasses ?? [];

  const selectedCarbonClassId = form.watch('carbonClass');

  const selectedCarbonClass = carbonClasses.find(
    (c) => c.carbonClassId === selectedCarbonClassId
  );

  form.watch('carbonCredit');

  const carbonCredits = selectedCarbonClass?.registeredTokens ?? [];

  // Auto select the first carbon credit when selecting a carbon class
  useEffect(() => {
    if (selectedCarbonClass?.registeredTokens.length) {
      form.setValue(
        'carbonCredit',
        selectedCarbonClass.registeredTokens[0].creditTokenId
      );
    }
  }, [selectedCarbonClass, form]);


  return (
    <Card
      title="Retire Carbon"
      className="w-[45rem] rounded-xl border border-gray-200 h-fit"
      titleClassName="font-semibold text-gray-800 text-size-20 tracking-tight"
      skeletonClassName="h-[56.6rem]"
    >
      {!isLoading && (
        <Form className="-mt-1.5" onSubmit={form.handleSubmit(onSubmit)}>
          <InputGroup>
            <SelectInput
              label="Carbon Class"
              defaultValue={form.getValues('carbonClass')}
              items={carbonClasses.map((carbonClass) => ({
                label: carbonClass.name,
                value: carbonClass.carbonClassId,
              }))}
              error={form.formState.errors.carbonClass}
              {...form.register('carbonClass')}
            />
            <SelectInput
              label="Carbon Credit"
              placeholder="Select from available carbon credits"
              defaultValue={form.getValues('carbonCredit')}
              items={carbonCredits.map((carbonCredit) => ({
                label: carbonCredit.project.name,
                value: carbonCredit.creditTokenId,
              }))}
              error={form.formState.errors.carbonCredit}
              {...form.register('carbonCredit')}
            />
            <TokenAmountInput
              errorMessage={form.formState.errors.amount}
              inputProps={{
                type: 'number',
                'aria-label': 'Token Input',
                placeholder: 'Select a token first',
                ...form.register('amount'),
              }}
              name="amount"
              control={form.control}
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
      )}
    </Card>
  );
};

export default RetireCarbonForm;
