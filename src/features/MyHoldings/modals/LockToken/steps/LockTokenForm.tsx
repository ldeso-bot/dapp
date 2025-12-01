'use client';

import DurationSelector from '@/features/MyHoldings/modals/LockToken/components/DurationSelector';
import DurationStepper from '@/features/MyHoldings/modals/LockToken/components/DurationStepper';
import YieldBreakdownCard from '@/features/MyHoldings/shared/YieldBreakdownCard';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import InputGroup from '@/shared/components/Form/layout/InputGroup';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import {
  DEFAULT_ALLOCATION_TOKEN,
  isToken,
  tokens,
} from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useSetAtom } from 'jotai';
import DurationSlider from '../components/DurationSlider';
import {
  findClosestMaturityByDays,
  lockTokenDialogAtom,
  LockTokenFields,
} from '../lockToken.utils';

const PurchaseBondForm: FormFlowStep<LockTokenFields> = ({ data }) => {
  const { form } = data;
  const { data: protocolData } = useProtocolData();
  const { handleSubmit, formState, watch } = form;
  const setLockTokenDialogState = useSetAtom(lockTokenDialogAtom);

  const token = watch('token');
  const duration = watch('duration');
  const typedToken = isToken(token) ? token : DEFAULT_ALLOCATION_TOKEN;

  // @todo - calculations need some work and not final...
  const selectedMaturity = findClosestMaturityByDays(
    Number(duration),
    protocolData?.lockedkVcmYieldRates ?? []
  );

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = () => {
    // next();
  };

  return (
    <Card className="rounded-lg px-6 py-4 max-h-[70vh] overflow-y-auto">
      <h2 className="text-size-20 font-semibold text-gray-900">
        Lock kVCM Tokens
      </h2>
      <p className="text-size-14 text-gray-500">
        Lock your kVCM tokens to earn yield.
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Input
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
          {selectedMaturity && (
            <YieldBreakdownCard
              amount={watch('amount')}
              selectedMaturity={selectedMaturity}
            />
          )}
        </InputGroup>
        <div className="text-size-12 text-void-40 space-y-1 pt-2 border-t border-void-20">
          <p>
            <strong>¹</strong> Base yield from kVCM inflation is zero-risk and
            guaranteed at maturity.
          </p>
          <p>
            <strong>²</strong> K2 token incentives are variable and not
            guaranteed. Actual rewards may differ.
          </p>
        </div>
        <ButtonGroup>
          <Button
            className="rounded-xl"
            colors="secondary"
            context="flow"
            type="submit"
          >
            Lock kVCM
          </Button>
          <Button
            colors="primary"
            context="flow"
            className="rounded-xl"
            onClick={() =>
              setLockTokenDialogState({ open: false, token: null })
            }
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};

export default PurchaseBondForm;
