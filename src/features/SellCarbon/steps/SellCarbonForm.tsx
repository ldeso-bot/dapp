'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import SelectInput from '@/shared/components/Form/SelectInput';
import TokenAmountInput from '@/shared/components/Form/TokenAmountInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { parseAmount } from '@/shared/utils/string.utils';
import { useEffect, useMemo } from 'react';
import { zeroAddress } from 'viem';
import SellCarbonQuoter from '../components/SellCarbonQuoter';
import { SlippageSlider } from '../components/SlippageSlider';
import { SellCarbonFields } from '../sellCarbon.constants';

const SellCarbonForm: FormFlowStep<SellCarbonFields> = ({ next, data }) => {
  const { form } = data;
  const { handleSubmit, watch } = form;

  const onSubmit = () => {
    next();
  };

  const { data: walletData, isLoading } = useWalletData();
  const creditBalances = walletData?.creditBalances ?? [];

  const token = watch('token');

  const carbonClass = watch('carbonClass');

  const selectedBalance = creditBalances.find(
    (b) => b.creditToken.creditTokenId === token
  );

  const carbonClasses = useMemo(
    () => selectedBalance?.registeredClasses ?? [],
    [selectedBalance]
  );

  const amount = watch('amount');

  /* TODO: Remove this when quoter works */
  useEffect(() => {
    form.setValue('amountReceived', Math.random() * 100);
  }, [token, carbonClass, form]);

  // Preselect the first carbon class when selecting a token
  useEffect(() => {
    if (carbonClasses.length) {
      form.setValue('carbonClass', carbonClasses[0].carbonClassId);
    }
  }, [carbonClasses, form]);

  return (
    <Card
      title="Sell Carbon"
      className="w-[45rem] rounded-xl border border-gray-200 h-fit"
      titleClassName="font-semibold text-gray-800 text-size-20 tracking-tight"
      skeletonClassName="h-[56.6rem]"
    >
      {!isLoading && (
        <>
          <div className="flex-1">
            <div className="font-base text-gray-500 text-size-14">
              Quotes are not guaranteed due to ever-changing network conditions.
              Slippage may occur.{' '}
              <a
                href="#" // TODO: add link
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-80 underline"
              >
                Learn more
              </a>
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
                  label: balance.creditToken.name,
                  value: balance.creditToken.creditTokenId,
                }))}
                defaultValue={form.getValues('token')}
                {...form.register('token')}
                error={form.formState.errors.token}
              />
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
                availableBalance={selectedBalance?.balance ?? 0}
                errorMessage={form.formState.errors.amount}
                inputProps={{
                  type: 'number',
                  'aria-label': 'Token Input',
                  placeholder: 'Select a token first',
                  ...form.register('amount'),
                  max: selectedBalance?.balance ?? 0,
                  min: 0,
                }}
                name="amount"
                control={form.control}
              />
              {/* TODO: set maturityId and couponBurnParams */}
              {selectedBalance && carbonClass && amount && (
                <SellCarbonQuoter
                  form={form}
                  carbonClass={carbonClass}
                  address={selectedBalance?.creditToken.address}
                  tokenId={selectedBalance?.creditToken.tokenId}
                  amount={parseAmount(
                    amount,
                    selectedBalance.creditToken.decimals
                  )}
                  maturityId={0}
                  couponBurnParams={{
                    tonnes: 0,
                    from: zeroAddress,
                  }}
                />
              )}
              <SlippageSlider form={form} />
            </div>
            <ButtonGroup className="flex-row w-full">
              <Button
                colors="primary"
                context="flow"
                href={`${ROUTES.SELL_CARBON}`}
              >
                Cancel
              </Button>
              <Button colors="secondary" context="flow" type="submit">
                Sell Carbon
              </Button>
            </ButtonGroup>
          </form>
        </>
      )}
    </Card>
  );
};

export default SellCarbonForm;
