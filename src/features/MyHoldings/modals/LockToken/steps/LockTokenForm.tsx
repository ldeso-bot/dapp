'use client';

import DurationSelector from '@/features/MyHoldings/modals/LockToken/components/DurationSelector';
import DurationStepper from '@/features/MyHoldings/modals/LockToken/components/DurationStepper';
import YieldBreakdownCard from '@/features/MyHoldings/Shared/YieldBreakdownCard';
import Button from '@/shared/components/Button/Button';
import SoloCard from '@/shared/components/Card/SoloCard';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import SelectInput from '@/shared/components/Form/SelectInput';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ALLOCATION_TOKENS_FORM_INPUT_ITEMS } from '@/shared/constants/form.constants';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  DEFAULT_ALLOCATION_TOKEN,
  tokens,
} from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { isToken } from '@/shared/utils/typeguards';
import { useAtomValue } from 'jotai';
import DurationSlider from '../components/DurationSlider';
import { findClosestMaturityByDays, lockTokenDialogAtom, LockTokenFields } from '../lockToken.utils';

const PurchaseBondForm: FormFlowStep<LockTokenFields> = ({ data }) => {
  const { form } = data;
  const { data: protocolData } = useProtocolData();
  const { handleSubmit, formState, watch } = form;
  const lockTokenDialogState = useAtomValue(lockTokenDialogAtom);

  const token = watch('token');
  const duration = watch('duration');
  const typedToken = isToken(token) ? token : DEFAULT_ALLOCATION_TOKEN;

  // @todo - calculations need some work and not final...
  const selectedMaturity = findClosestMaturityByDays(Number(duration), protocolData?.lockedkVcmYieldRates ?? []);

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = () => {
    // next();
  };

  return (
    <SoloCard title="Purchase a Bond" className="min-h-[60vh] max-h-[75vh] overflow-y-auto">
      <Form className="pb-5" onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <SelectInput
            label="Token"
            defaultValue={lockTokenDialogState.token ?? 'kvcm'}
            items={ALLOCATION_TOKENS_FORM_INPUT_ITEMS}
            {...form.register('token')}
          />
          <Input
            label="Amount"
            type="number"
            iconSrc={tokens[typedToken].iconSrc}
            {...form.register('amount')}
            error={formState.errors.amount}
          />
          <DurationSelector control={form.control} />
          <div className="space-y-2 flex flex-col gap-2">
            <DurationStepper control={form.control} />
            <DurationSlider control={form.control} />
          </div>
          <YieldBreakdownCard
            amount={watch('amount')}
            selectedMaturity={selectedMaturity}
          />
        </InputGroup>
        <div className="text-size-12 text-void-40 space-y-1 pt-2 border-t border-void-20">
          <p>
            <strong>¹</strong> Base yield from kVCM inflation is zero-risk and guaranteed at maturity.
          </p>
          <p>
            <strong>²</strong> K2 token incentives are variable and not guaranteed. Actual rewards may differ.
          </p>
        </div>
        <ButtonGroup>
          <Button
            className="rounded-xl"
            colors="secondary"
            context="flow"
            type="submit"
          >
            Bond Klima
          </Button>
          <Button
            colors="primary"
            context="flow"
            className="rounded-xl"
            href={`${ROUTES.MY_HOLDINGS}`}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </SoloCard>
  );
};

export default PurchaseBondForm;
