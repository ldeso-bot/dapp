'use client';

import { alertAtom } from '@/features/Alert/alert.atom';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Dialog from '@/shared/components/Dialog/Dialog';
import Input from '@/shared/components/Form/Input';
import InputError from '@/shared/components/Form/layout/InputError';
import LinkOpenInNew from '@/shared/components/LinkWithIcon';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { CarbonCreditIconImg } from '@/shared/constants/tokens.constants';
import { CARBONMARK_URL } from '@/shared/constants/urls.constants';
import { useAllowance } from '@/shared/hooks/useAllowance';
import { useChainId } from '@/shared/hooks/web3/useChainId';
import { useContract } from '@/shared/hooks/web3/useContract';
import { TOKEN_STANDARDS } from '@/shared/models/shared';
import {
  dateStringToTimestamp,
  formatAddress,
  formatAmountWithCommas,
} from '@/shared/utils/string.utils';
import { getCarbonmarkReceiptUrl } from '@/shared/utils/urls.utils';
import { getScanLink } from '@/shared/utils/web3.utils';
import { useFormo } from '@formo/analytics';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
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
  const chainId = useChainId();

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

  const { contract: retirementAggregatorContract } = useContract(
    'RetirementAggregator'
  );
  const { contract: aamContractContract } = useContract('AAMDiamond');

  const spenderAddress =
    inputTokenInfo?.name === 'KVCM'
      ? aamContractContract?.address
      : retirementAggregatorContract?.address;

  const { isAllowed, setAllowance, isSettingAllowance } = useAllowance({
    tokenAddress: inputTokenInfo?.address || '',
    tokenStandard: TOKEN_STANDARDS.ERC20,
    spender: spenderAddress ?? '',
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
    inputTokenIdentifier: selectedPaymentOption?.token?.id ?? 'kvcm',
    maxInputTokenIn: maxInputTokenInWei,
    beneficiaryName: parsedForm.current?.beneficiaryName ?? '',
    beneficiaryAddress: parsedForm.current?.beneficiaryAddress,
    retirementMessage: parsedForm.current?.retirementMessage ?? '',
    consumptionPeriodStart: dateStringToTimestamp(
      parsedForm.current?.consumptionPeriodStart
    ),
    consumptionPeriodEnd: dateStringToTimestamp(
      parsedForm.current?.consumptionPeriodEnd
    ),
    countryCode: parsedForm.current?.country,
  });

  const analytics = useFormo();

  const handleRetireCarbon = async () => {
    const result = await retireCarbon();
    if (result.hash) {
      analytics.track('retire_carbon', {
        hash: result.hash,
        carbonClass: parsedForm.current?.carbonClass,
        amount: parsedForm.current?.amountTonnes,
        creditToken: selectedCarbonCredit?.symbol,
      });
      const receiptUrl = getCarbonmarkReceiptUrl(chainId, result.hash, 0);

      setAlert({
        title: 'Retirement complete',
        description: (
          <>
            Your carbon credits have been permanently retired. Proof of your
            climate action can be accessed{' '}
            <LinkOpenInNew href={getScanLink(chainId, result.hash)}>
              here
            </LinkOpenInNew>
            .
            <br />
            <Link
              href={receiptUrl}
              target="_blank"
              className="underline"
              rel="noopener noreferrer"
            >
              View your retirement receipt
            </Link>{' '}
            (powered by{' '}
            <Link
              target="_blank"
              className="underline"
              href={CARBONMARK_URL}
              rel="noopener noreferrer"
            >
              Carbonmark
            </Link>
            , our partner in carbon retirements).
          </>
        ),
        type: 'success',
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
              value={formatAddress(retirementAggregatorContract?.address)}
              readOnly
            />
            <Input
              label="You are sending"
              readOnly
              iconSize="sm"
              iconSrc={selectedPaymentOption?.token?.iconSrc}
              value={`${formatAmountWithCommas(priceQuoted, 'auto')} ${selectedPaymentOption?.token?.symbol ?? ''}`}
            />
            <Input
              label="You are retiring"
              readOnly
              iconSize="sm"
              iconSrc={CarbonCreditIconImg}
              value={`${formatAmountWithCommas(parsedForm.current?.amountTonnes, 'auto')} ${selectedCarbonCredit?.symbol} Tonnes`}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            {!isAllowed && (
              <Button
                colors="secondary"
                context="flow"
                type="submit"
                onClick={() => handleSetAllowance()}
                disabled={isSettingAllowance}
              >
                {isSettingAllowance ? 'Approving...' : 'Approve'}
              </Button>
            )}
            {isAllowed && (
              <Button
                colors="secondary"
                context="flow"
                type="submit"
                onClick={handleRetireCarbon}
                disabled={isExecuting}
              >
                {isExecuting ? 'Retiring...' : 'Retire Carbon'}
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
