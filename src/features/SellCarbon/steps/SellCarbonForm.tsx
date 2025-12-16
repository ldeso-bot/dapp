'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import SelectInput from '@/shared/components/Form/SelectInput';
import TokenAmountInput from '@/shared/components/Form/TokenAmountInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { SlippageSlider } from '../components/SlippageSlider';
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
      className="w-[45rem] rounded-xl border border-gray-200"
      titleClassName="font-semibold text-gray-800 text-size-20 tracking-tight"
    >
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
          <Input
            className="h-[4rem] pointer-events-none"
            label="Receive"
            placeholder="Select a token first"
            readOnly
          />
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
    </Card>
  );
};

export default SellCarbonForm;
