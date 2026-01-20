'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import SelectInput from '@/shared/components/Form/SelectInput';
import TokenAmountInput from '@/shared/components/Form/TokenAmountInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { formatStringToNumber } from '@/shared/utils/subgraph.utils';
import { useEffect } from 'react';
import { PayWithOptions } from '../components/PayWithOptions';
import { useRetireCarbonForm } from '../hooks/useRetireCarbonForm';
import { useRetireCarbonQuoter } from '../hooks/useRetireCarbonQuoter';
import { RetireCarbonFields } from '../retire.constants';

const RetireCarbonForm: FormFlowStep<RetireCarbonFields> = ({ next, data }) => {
  const { form } = data;
  const { watch } = form;

  const onSubmit = () => {
    next();
  };

  const {
    selectedCarbonCreditId,
    selectedPaymentOption,
    isLoading,
    carbonClasses,
    carbonCredits,
    priceQuoted,
  } = useRetireCarbonForm(watch);

  // Update priceQuoted in form when it changes from the quoter
  const { priceQuotedWei, priceQuotedForOneTonWei } = useRetireCarbonQuoter({
    form,
  });
  console.log('priceQuotedForOneTonWei', priceQuotedForOneTonWei);
  console.log('priceQuotedWei', priceQuotedWei);

  useEffect(() => {
    form.setValue('priceQuotedWei', priceQuotedWei);
  }, [priceQuotedWei, form]);

  const priceQuotedPerTonne = formatStringToNumber(
    priceQuotedForOneTonWei,
    selectedPaymentOption?.token.decimals
  );

  const maxAmount = priceQuotedPerTonne
    ? (selectedPaymentOption?.balance ?? 0) / priceQuotedPerTonne
    : undefined;

  // Auto select the first carbon credit when selecting a carbon class
  useEffect(() => {
    if (carbonCredits?.length) {
      form.setValue('carbonCredit', carbonCredits?.[0]?.creditTokenId ?? '');
    }
  }, [carbonCredits, form]);

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
              value={selectedCarbonCreditId}
              placeholder="Select from available carbon credits"
              defaultValue={form.getValues('carbonCredit')}
              items={
                carbonCredits?.map((carbonCredit) => ({
                  label: carbonCredit.project.name,
                  value: carbonCredit.creditTokenId,
                })) ?? []
              }
              error={form.formState.errors.carbonCredit}
              {...form.register('carbonCredit')}
            />
            <TokenAmountInput
              label="Amount (Tonnes)"
              availableBalance={maxAmount}
              errorMessage={form.formState.errors.amountTonnes}
              inputProps={{
                type: 'number',
                'aria-label': 'Token Input',
                placeholder: 'Select a token first',
                ...form.register('amountTonnes'),
              }}
              name="amountTonnes"
              control={form.control}
            />
            <PayWithOptions name="paymentMethod" control={form.control} />
            {priceQuotedPerTonne && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div>Price per Tonne</div>
                  <div className="flex gap-2">
                    {selectedPaymentOption?.token.icon(2)}
                    <span>{priceQuotedPerTonne}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>Total</div>
                  <div className="flex gap-2">
                    {selectedPaymentOption?.token.icon(2)}
                    <span>{priceQuoted}</span>
                  </div>
                </div>
              </div>
            )}
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
