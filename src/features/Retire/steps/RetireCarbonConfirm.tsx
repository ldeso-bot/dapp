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
import { RetirementReceiptCard } from '../components/RetirementReceiptCard';
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
    batchId: selectedCarbonCredit?.batchId ?? 0,
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
        title: 'Retirement complete [t157]',
        description: (
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6 mb-2 lg:mb-0">
            <div className="flex flex-col gap-3">
              <span>Your carbon credits have been permanently retired. [t158]</span>
              <LinkOpenInNew
                href={getScanLink(chainId, result.hash)}
                className="text-size-14 font-bold text-green-80"
              >
                Proof of your climate action [t159]
              </LinkOpenInNew>
            </div>
            <RetirementReceiptCard receiptUrl={receiptUrl} />
          </div>
        ),
        links: [],
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
        className="w-[36rem] border-0 rounded-xl text-text-1"
        titleClassName="font-bold text-size-18"
        title="Confirm your transaction [t149]"
      >
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4 pt-3">
            To complete this transaction, please allow our smart contract to
            transfer tokens on your behalf. [t150]
            <Input
              label="Contract Address [t151]"
              value={formatAddress(retirementAggregatorContract?.address)}
              readOnly
            />
            <Input
              label="You are sending [t152]"
              readOnly
              iconSize="sm"
              iconSrc={selectedPaymentOption?.token?.iconSrc}
              value={`${formatAmountWithCommas(priceQuoted, 'auto')} ${selectedPaymentOption?.token?.symbol ?? ''}`}
            />
            <Input
              label="You are retiring [t153]"
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
                className="text-text-static-light"
                onClick={() => handleSetAllowance()}
                disabled={isSettingAllowance}
              >
                {isSettingAllowance ? 'Approving...' : 'Approve [t154]'}
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
                {isExecuting ? 'Retiring...' : 'Retire Carbon [t155]'}
              </Button>
            )}
            <Button
              colors="primary"
              context="flow"
              className="border-border-strong"
              onClick={previous}
            >
              Cancel [t156]
            </Button>
            <InputError error={form.formState.errors.root} />
          </div>
        </form>
      </Card>
    </Dialog>
  );
};

export default RetireCarbonConfirm;
