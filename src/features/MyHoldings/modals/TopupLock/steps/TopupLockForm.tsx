'use client';

import { useLockToken } from '@/features/MyHoldings/modals/LockToken/lockToken.utils';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Form/Input';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Form from '@/shared/components/Form/layout/Form';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  AllocatableToken,
  DEFAULT_LP_TOKEN,
  isToken,
  tokens,
} from '@/shared/constants/tokens.constants';
import { useTransactionHandler } from '@/shared/hooks/useTransactionHandler';
import { useAtom } from 'jotai';
import { parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import { K2Incentives } from '../components/K2Incentives';
import { StatsCard } from '../components/StatsCard';
import { TotalMaturity } from '../components/TotalMaturity';
import {
  resetTopupLockDialog,
  topupLockDialogAtom,
  TopupLockFields,
} from '../topupLock.utils';

export const TopupLockForm: FormFlowStep<TopupLockFields> = ({ data }) => {
  const { form } = data;
  const { isConnected } = useAccount();
  const { handleSubmit, formState, watch } = form;

  const [topupLockDialogState, setTopupLockDialogState] =
    useAtom(topupLockDialogAtom);
  const { handleTransaction, isSubmitting } = useTransactionHandler();

  const token = watch('token');
  const amount = watch('amount');
  const maturityId = watch('maturityId');

  const typedToken = isToken(token) ? token : DEFAULT_LP_TOKEN;
  const tokenInfo = tokens[typedToken];

  const currentLockAmount = topupLockDialogState.currentLockAmount ?? 0;
  const totalAccruingRewards = topupLockDialogState.totalAccruingRewards ?? 0;
  const tokenSymbol = topupLockDialogState.tokenSymbol ?? '';
  const maturityDate = topupLockDialogState.maturityDate ?? null;
  const baseApy = topupLockDialogState.baseApy ?? 0;

  const amountWei =
    amount && amount > 0 ? parseUnits(String(amount), tokenInfo.decimals) : 0n;

  const { lock } = useLockToken({
    token: typedToken as AllocatableToken,
    amount: amountWei,
    maturityId: maturityId ?? topupLockDialogState.maturityId ?? 1,
  });

  const onSubmit = async () => {
    if (!isConnected) return;
    await handleTransaction(lock, {
      successTitle: 'Top up Successful',
      successDescription: `You've successfully topped up ${amount} ${tokenInfo.symbol}! You can manage your positions in the "My Holdings" dashboard.`,
      errorDescription: 'Something went wrong with your top up.',
      successLinks: [{ label: 'My Holdings', href: ROUTES.MY_HOLDINGS }],
      onSuccess: () => {
        setTimeout(() => {
          // Small delay to let UI update before closing modal
          setTopupLockDialogState(resetTopupLockDialog());
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
      },
    });
  };

  const reset = () => setTopupLockDialogState(resetTopupLockDialog());

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
          <Button
            colors="secondary"
            context="flow"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Topping up...' : 'Confirm top up'}
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};
