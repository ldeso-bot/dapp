'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import SelectInput from '@/shared/components/Form/SelectInput';
import TokenAmountInput from '@/shared/components/Form/TokenAmountInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import SlippageSlider from '../components/SlippageSlider/SlippageSlider';
import { SellCarbonFields, carbonPrices } from '../sellCarbon.constants';

const SellCarbonForm: FormFlowStep<SellCarbonFields> = ({ next, data }) => {
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
      title="Sell Carbon"
      className="w-[36rem] border-0 rounded-xl"
      titleClassName="font-bold text-void-80 text-size-18">
      <div className="flex-1">
        <div className="font-base text-void-50 text-size-12">
          Quotes are not guaranteed due to ever-changing network conditions. Slippage may occur. Learn more
        </div>
      </div>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pt-3">
          <SelectInput
            label="Token"
            defaultValue={`${carbonPrices[0].category}-${carbonPrices[0].type}`}
            items={Object.values(carbonPrices).map((carbonPrice) => ({
              label: `${carbonPrice.category} - ${carbonPrice.type}`,
              value: `${carbonPrice.category}-${carbonPrice.type}`,
            }))}
            {...form.register('token')}
          />
          <SelectInput
            label="Carbon Class"
            defaultValue={`${carbonPrices[1].category}-${carbonPrices[1].type}`}
            items={Object.values(carbonPrices).map((carbonPrice) => ({
              label: `${carbonPrice.category} - ${carbonPrice.type}`,
              value: `${carbonPrice.category}-${carbonPrice.type}`,
            }))}
            {...form.register('carbonClass')}
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
          <Input className="h-[4rem]" label="Receive" placeholder="Select a token first" readOnly />
          <SlippageSlider form={form} />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Button colors="secondary" context="flow" type="submit">
            Sell Carbon
          </Button>
          <Button colors="primary" context="flow" href={`${ROUTES.SELL_CARBON}`}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SellCarbonForm;
