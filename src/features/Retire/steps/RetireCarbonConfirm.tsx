'use client';

import { alertAtom } from '@/features/Alert/alert.atom';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Dialog from '@/shared/components/Dialog/Dialog';
import Input from '@/shared/components/Form/Input';
import InputError from '@/shared/components/Form/layout/InputError';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { ROUTES } from '@/shared/constants/route.constants';
import { CarbonCreditIconImg } from '@/shared/constants/tokens.constants';
import { useAllowance } from '@/shared/hooks/useAllowance';
import { useContract } from '@/shared/hooks/web3/useContract';
import { TOKEN_STANDARDS } from '@/shared/models/shared';
import {
  formatAddress,
  formatAmountWithCommas,
} from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import { useRetireCarbon } from '../hooks/useRetireCarbon';
import { useRetireCarbonForm } from '../hooks/useRetireCarbonForm';
import { RetireCarbonFields } from '../retire.constants';
import { retireCarbonDialogAtom } from '../retire.utils';

const RetireCarbonConfirm: FormFlowStep<RetireCarbonFields> = ({
  previous,
  data,
}) => {
  const { parsedForm, form } = data;
  const setRetireCarbonDialogState = useSetAtom(retireCarbonDialogAtom);
  const setAlert = useSetAtom(alertAtom);

  const {
    selectedCarbonCredit,
    selectedPaymentOption,
    inputTokenInfo,
    amountWei,
    priceQuoted,
    maxInputTokenInWei,
    refetch: refetchWalletData,
  } = useRetireCarbonForm(form.watch);

  const onSubmit = async () => {
    setRetireCarbonDialogState({ open: false, token: null });
  };

  const { contract } = useContract('RetirementAggregator');

  const { isAllowed, setAllowance, isSettingAllowance } = useAllowance({
    tokenAddress: inputTokenInfo?.address || '',
    tokenStandard: TOKEN_STANDARDS.ERC20,
    spender: contract?.address || '',
    amount: maxInputTokenInWei,
  });

  const handleSetAllowance = async (amount?: bigint) => {
    const result = await setAllowance(amount);
    if (!result) {
      form.setError('root', {
        message: 'Failed to approve token',
      });
    }
  };

  const { retireCarbon, isExecuting } = useRetireCarbon({
    creditTokenAddress: selectedCarbonCredit?.address ?? '',
    creditTokenId: selectedCarbonCredit?.tokenId ?? 0,
    amount: amountWei,
    carbonClassId: parsedForm.current?.carbonClass ?? '',
    inputTokenAddress: inputTokenInfo?.address ?? '',
    inputTokenIdentifier: selectedPaymentOption.token.id,
    maxInputTokenIn: maxInputTokenInWei,
  });

  const handleRetireCarbon = async () => {
    const result = await retireCarbon();
    if (result?.error === null) {
      // Show success message
      setAlert({
        title: 'Retirement complete',
        description: `You've successfully retired ${parsedForm.current?.amountTonnes} ${selectedCarbonCredit?.name} tonnes! Your carbon credits have been permanently retired and you've received verifiable proof of your climate action.`,
        type: 'success',
        links: [
          {
            label: 'View My Holdings',
            href: ROUTES.MY_HOLDINGS,
          },
        ],
      });
      // Reset form
      form.reset();
      // Refetch wallet data
      refetchWalletData();
      // Go to previous step
      previous();
    } else {
      form.setError('root', { message: 'Failed to retire carbon' });
    }
  };

  return (
    <Dialog className="bg-overlay-10" open={true}>
      <Card
        className="w-[36rem] border-0 rounded-xl"
        titleClassName="font-bold text-void-80 text-size-18"
        title="Confirm your transaction"
      >
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4 pt-3">
            To complete this transaction, please allow our smart contract to
            transfer tokens on your behalf.
            <Input
              label="Contract Address"
              value={formatAddress(contract?.address)}
              readOnly
            />
            <Input
              label="You are sending"
              readOnly
              iconSize="sm"
              iconSrc={selectedPaymentOption.token.iconSrc}
              value={`${formatAmountWithCommas(priceQuoted)} ${selectedPaymentOption?.token.symbol}`}
            />
            <Input
              label="You are retiring"
              readOnly
              iconSize="sm"
              iconSrc={CarbonCreditIconImg}
              value={`${formatAmountWithCommas(parsedForm.current?.amountTonnes)} ${selectedCarbonCredit?.name} Tonnes`}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            {!isAllowed && (
              <Button
                loading={isSettingAllowance}
                colors="secondary"
                context="flow"
                type="submit"
                onClick={() => handleSetAllowance()}
              >
                Approve
              </Button>
            )}
            {isAllowed && (
              <Button
                colors="secondary"
                context="flow"
                type="submit"
                onClick={handleRetireCarbon}
                loading={isExecuting}
              >
                Retire Carbon
              </Button>
            )}
            <Button colors="primary" context="flow" onClick={previous}>
              Cancel
            </Button>
            <InputError error={form.formState.errors.root} />
          </div>
        </form>
      </Card>
    </Dialog>
  );
};

export default RetireCarbonConfirm;
