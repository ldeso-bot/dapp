'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import InputError from '@/shared/components/Form/layout/InputError';
import SelectInput from '@/shared/components/Form/SelectInput';
import TokenAmountInput from '@/shared/components/Form/TokenAmountInput';
import LinkOpenInNew from '@/shared/components/LinkWithIcon';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { AlertIcon } from '@/shared/components/Svg/AlertIcon';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { CARBON_SELLERS_HANDBOOK_URL } from '@/shared/constants/urls.constants';
import { formatStringToNumber } from '@/shared/utils/subgraph.utils';
import { useEffect } from 'react';
import { zeroAddress } from 'viem';
import { useSellCarbonForm } from '../hooks/useSellCarbonForm';
import { useSellCarbonQuoter } from '../hooks/useSellCarbonQuoter';
import { SellCarbonFields } from '../sellCarbon.constants';

const SellCarbonForm: FormFlowStep<SellCarbonFields> = ({ next, data }) => {
  const { form } = data;
  const { handleSubmit, watch } = form;

  const onSubmit = () => {
    next();
  };

  const {
    isLoading,
    creditBalances,
    carbonClass,
    selectedBalance,
    carbonClasses,
    amountToSellWei,
  } = useSellCarbonForm(watch);

  // Preselect the first carbon class when selecting a token
  useEffect(() => {
    if (carbonClasses.length && carbonClasses[0]) {
      form.setValue('carbonClass', carbonClasses[0].carbonClassId);
    }
  }, [carbonClasses, form]);

  const { data: quoteWei, isError } = useSellCarbonQuoter({
    carbonClass: carbonClass || '',
    tokenAddress: selectedBalance?.creditToken.address || '',
    tokenId: selectedBalance?.creditToken.tokenId || 0,
    amountToSellWei,
    maturityId: 0,
    couponBurnParams: {
      tonnes: 0,
      from: zeroAddress,
    },
  });

  const kvcmOutQuoteWei = form.watch('kvcmOutQuoteWei');
  useEffect(() => {
    form.setValue('kvcmOutQuoteWei', quoteWei);
  }, [quoteWei, form]);

  const error = isError
    ? 'Could not get a quote for supplying carbon'
    : undefined;

  return (
    <Card
      title="Supply Carbon"
      className="w-[50rem] rounded-xl border border-gray-200 h-fit"
      titleClassName="font-semibold text-gray-800 text-size-20 tracking-tight"
      skeletonClassName="h-[56.6rem]"
    >
      {!isLoading && (
        <>
          <div className="flex-1">
            <div className="font-base text-gray-500 text-size-14">
              Quotes are not guaranteed due to ever-changing network conditions.
              Slippage may occur.
              <span className="inline-flex items-center align-middle ml-1.5">
                <Tooltip
                  className="max-w-[30rem] text-size-12 p-3"
                  content="Slippage in blockchain-enabled transactions is the difference between the price you expect (or are quoted) when you submit a swap and the actual price you get when the trade executes on-chain. Slippage occurs due to small time delays when executing a transaction on the blockchain and can range from 0.2%-1% (trending toward the lower value). The quoted kVCM includes an extra 1% to account for slippage."
                />
              </span>
            </div>
          </div>
          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4 pt-3">
              <SelectInput
                label="Token"
                items={Object.values(creditBalances).map((balance) => ({
                  label: balance.creditToken.symbol,
                  value: balance.creditToken.creditTokenId,
                }))}
                defaultValue={form.getValues('token')}
                {...form.register('token')}
                error={form.formState.errors.token}
              />
              <div className="flex items-center justify-between text-size-12 ">
                <div className="flex items-center gap-2">
                  <AlertIcon className="w-4 h-4" />
                  <span className="text-gray-600">
                    No eligible credits detected?
                  </span>
                </div>
                <LinkOpenInNew href={CARBON_SELLERS_HANDBOOK_URL} withoutIcon>
                  Contact us to whitelist your credit type
                </LinkOpenInNew>
              </div>

              <SelectInput
                label="Carbon Class"
                items={Object.values(carbonClasses).map((carbonClass) => ({
                  label: carbonClass.name,
                  value: carbonClass.carbonClassId,
                }))}
                value={carbonClass}
                {...form.register('carbonClass')}
                error={form.formState.errors.carbonClass}
              />
              <TokenAmountInput
                label="Amount (Tonnes)"
                availableBalance={selectedBalance?.balance ?? 0}
                errorMessage={form.formState.errors.amountToSellTonnes}
                inputProps={{
                  type: 'number',
                  'aria-label': 'Token Input',
                  placeholder: 'Select a token first',
                  ...form.register('amountToSellTonnes'),
                  max: selectedBalance?.balance ?? 0,
                  min: 0,
                  step: 0.001,
                }}
                name="amountToSellTonnes"
                control={form.control}
              />

              <Input
                className="h-[4rem] pointer-events-none"
                label="Receive"
                readOnly
                value={
                  selectedBalance
                    ? `${formatStringToNumber(kvcmOutQuoteWei, 18)} KVCM`
                    : 'Select a token first'
                }
              />
            </div>
            <ButtonGroup className="flex-col w-full">
              <Button
                colors="secondary"
                context="flow"
                type="submit"
                disabled={!kvcmOutQuoteWei}
              >
                Supply Carbon
              </Button>
            </ButtonGroup>
            <InputError error={{ message: error }} />
          </form>
        </>
      )}
    </Card>
  );
};

export default SellCarbonForm;
