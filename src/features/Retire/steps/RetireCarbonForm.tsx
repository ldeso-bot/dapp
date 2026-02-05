'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import SelectInput from '@/shared/components/Form/SelectInput';
import { TextArea } from '@/shared/components/Form/TextArea';
import TokenAmountInput from '@/shared/components/Form/TokenAmountInput';
import { MandatoryAsterisk } from '@/shared/components/MandatoryAsterisk';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { countries } from '@/shared/constants/countries.constants';
import { formatStringToNumber } from '@/shared/utils/subgraph.utils';
import { useEffect } from 'react';
import { PayWithOptions } from '../components/PayWithOptions';
import { useRetireCarbonForm } from '../hooks/useRetireCarbonForm';
import { useRetireCarbonQuoter } from '../hooks/useRetireCarbonQuoter';
import { RetireCarbonFields } from '../retire.constants';

const RetireCarbonForm: FormFlowStep<RetireCarbonFields> = ({ next, data }) => {
  const { form } = data;
  const { watch } = form;

  const {
    selectedCarbonCredit,
    selectedPaymentOption,
    isLoading,
    carbonClasses,
    carbonCredits,
    priceQuoted,
    isConsumptionInfoRequiredCredit,
  } = useRetireCarbonForm(watch);

  // Update priceQuoted in form when it changes from the quoter
  const { priceQuotedWei, priceQuotedForOneTonWei } = useRetireCarbonQuoter({
    form,
  });

  useEffect(() => {
    form.setValue('priceQuotedWei', priceQuotedWei);
  }, [priceQuotedWei, form]);

  const priceQuotedPerTonne = formatStringToNumber(
    priceQuotedForOneTonWei,
    selectedPaymentOption?.token.decimals
  );

  // Auto select the first carbon credit when selecting a carbon class
  useEffect(() => {
    if (carbonCredits?.length && form.getValues('carbonCredit') === '') {
      form.setValue('carbonCredit', carbonCredits?.[0]?.creditTokenId ?? '');
    }
  }, [carbonCredits, form]);

  const onSubmit = (data: RetireCarbonFields) => {
    // Validate PURO-specific fields if credit symbol starts with PURO
    if (isConsumptionInfoRequiredCredit) {
      if (!data.country) {
        form.setError('country', {
          type: 'manual',
          message: 'Country is required',
        });
        return;
      }
      if (!data.consumptionPeriodStart) {
        form.setError('consumptionPeriodStart', {
          type: 'manual',
          message: 'Start date is required',
        });
        return;
      }
      if (!data.consumptionPeriodEnd) {
        form.setError('consumptionPeriodEnd', {
          type: 'manual',
          message: 'End date is required',
        });
        return;
      }
      if (data.consumptionPeriodEnd <= data.consumptionPeriodStart) {
        form.setError('consumptionPeriodEnd', {
          type: 'manual',
          message: 'Consuption periode end date must be after start date',
        });
        return;
      }
    }
    next();
  };

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
            {/* Standard fields */}
            <SelectInput
              label="Carbon Class"
              defaultValue={form.getValues('carbonClass')}
              placeholder="Select from available carbon classes"
              items={carbonClasses.map((carbonClass) => ({
                label: carbonClass.name,
                value: carbonClass.carbonClassId,
              }))}
              error={form.formState.errors.carbonClass}
              {...form.register('carbonClass')}
            />
            <SelectInput
              label="Carbon Credit"
              value={selectedCarbonCredit?.creditTokenId ?? ''}
              placeholder="Select from available carbon credits"
              defaultValue={form.getValues('carbonCredit')}
              items={
                carbonCredits?.map((carbonCredit) => ({
                  label: carbonCredit.symbol,
                  value: carbonCredit.creditTokenId,
                })) ?? []
              }
              error={form.formState.errors.carbonCredit}
              {...form.register('carbonCredit')}
            />
            <TokenAmountInput
              label="Amount (Tonnes)"
              availableBalance={selectedCarbonCredit?.amount ?? 0}
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
            <Input
              mandatory
              label="Who will this retirement be credited to?"
              placeholder="Beneficiary name"
              error={form.formState.errors.beneficiaryName}
              {...form.register('beneficiaryName')}
            />
            <Input
              label=""
              placeholder="Beneficiary wallet address (optional)"
              error={form.formState.errors.beneficiaryAddress}
              {...form.register('beneficiaryAddress')}
            />
            <TextArea
              mandatory
              label="Retirement Message"
              placeholder="Describe the purpose of this retirement"
              error={form.formState.errors.retirementMessage}
              {...form.register('retirementMessage')}
            />
          </InputGroup>
          {/* Consumption info required fields */}
          {isConsumptionInfoRequiredCredit && (
            <>
              <SelectInput
                mandatory
                label="In what country will this certificate be consumed?"
                placeholder="Select one"
                items={countries}
                error={form.formState.errors.country}
                {...form.register('country')}
              />
              <div className="flex flex-col gap-2 w-full">
                <label className="text-size-14 font-medium">
                  Consumption period - when will this asset be used?{' '}
                  <MandatoryAsterisk />
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      mandatory
                      label=""
                      type="date"
                      placeholder="Start"
                      error={form.formState.errors.consumptionPeriodStart}
                      {...form.register('consumptionPeriodStart')}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      mandatory
                      label=""
                      type="date"
                      placeholder="End"
                      error={form.formState.errors.consumptionPeriodEnd}
                      {...form.register('consumptionPeriodEnd')}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <PayWithOptions name="paymentMethod" control={form.control} />
          <div className="flex flex-col gap-4">
            {priceQuotedPerTonne ? (
              <div className="flex flex-col gap-2">
                <div>Price per Tonne</div>
                <div className="flex gap-2">
                  {selectedPaymentOption?.token.icon(2)}
                  <span>{priceQuotedPerTonne}</span>
                </div>
              </div>
            ) : null}
            {priceQuoted ? (
              <div className="flex flex-col gap-2">
                <div>Total</div>
                <div className="flex gap-2">
                  {selectedPaymentOption?.token.icon(2)}
                  <span>{priceQuoted}</span>
                </div>
              </div>
            ) : null}
          </div>
          <ButtonGroup className="flex-row w-full">
            <Button
              className="rounded-md"
              colors="secondary"
              context="flow"
              disabled={!priceQuotedWei}
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
