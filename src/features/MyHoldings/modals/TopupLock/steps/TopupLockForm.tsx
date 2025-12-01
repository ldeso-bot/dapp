'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import {
  DEFAULT_LP_TOKEN,
  isLpToken,
  tokens,
} from '@/shared/constants/tokens.constants';
import { useAtom } from 'jotai';
import { K2Incentives } from '../components/K2Incentives';
import { StatsCard } from '../components/StatsCard';
import { TotalMaturity } from '../components/TotalMaturity';
import {
  resetTopupLockDialog,
  topupLockDialogAtom,
  TopupLockFields,
} from '../topupLock.utils';

const TopupLockForm: FormFlowStep<TopupLockFields> = ({ next, data }) => {
  const { form } = data;
  const { handleSubmit, formState, watch } = form;
  const [topupLockDialogState, setTopupLockDialogState] =
    useAtom(topupLockDialogAtom);

  const token = watch('token');
  const typedToken = isLpToken(token) ? token : DEFAULT_LP_TOKEN;

  const currentLockAmount = topupLockDialogState.currentLockAmount ?? 0;
  const totalAccruingRewards = topupLockDialogState.totalAccruingRewards ?? 0;
  const tokenSymbol = topupLockDialogState.tokenSymbol ?? '';
  const maturityDate = topupLockDialogState.maturityDate ?? null;
  const baseApy = topupLockDialogState.baseApy ?? 0;

  // Wrapping next into handleSubmit to ensure the form is valid before going to the validation step
  const onSubmit = () => {
    next();
  };

  const reset = () => {
    setTopupLockDialogState(resetTopupLockDialog());
  };

  return (
    <Card className="rounded-lg px-6 py-4 overflow-y-auto w-[42rem]">
      <h2 className="text-size-20 font-semibold text-gray-900">Top up lock</h2>
      <p className="text-size-14 text-gray-500">
        Keep this maturity; new amount accrues from now.
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <StatsCard
          baseApy={baseApy}
          tokenSymbol={tokenSymbol}
          maturityDate={maturityDate}
          currentLockAmount={currentLockAmount}
          totalAccruingRewards={totalAccruingRewards}
        />
        <Input
          label="Amount to add"
          type="number"
          iconSrc={tokens[typedToken].iconSrc}
          {...form.register('amount')}
          error={formState.errors.amount}
        />
        <div className="flex flex-col gap-3">
          <TotalMaturity
            tokenSymbol={tokenSymbol}
            currentLockAmount={currentLockAmount}
            totalAccruingRewards={totalAccruingRewards}
          />
          <K2Incentives k2Incentives={totalAccruingRewards} />
        </div>
        <ButtonGroup className="flex-row">
          <Button colors="primary" context="flow" onClick={() => reset()}>
            Cancel
          </Button>
          <Button colors="secondary" context="flow" type="submit">
            Confirm top up
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};

export default TopupLockForm;
