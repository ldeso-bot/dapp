'use client';

import { alertAtom } from '@/features/Alert/alert.atom';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Dialog from '@/shared/components/Dialog/Dialog';
import Input from '@/shared/components/Form/Input';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { DEV_MODE } from '@/shared/constants/config.constants';
import { ROUTES } from '@/shared/constants/route.constants';
import { CarbonCreditIconImg } from '@/shared/constants/tokens.constants';
import { useAllowance } from '@/shared/hooks/useAllowance';
import { useChainId } from '@/shared/hooks/web3/useChainId';
import { useContract } from '@/shared/hooks/web3/useContract';
import { TOKEN_STANDARDS } from '@/shared/models/shared';
import { applySlippage } from '@/shared/utils/math.utils';
import { formatAddress } from '@/shared/utils/string.utils';
import { formatStringToNumber } from '@/shared/utils/subgraph.utils';
import { getTransactionTransferLogs } from '@/shared/utils/web3.utils';
import { useSetAtom } from 'jotai';
import { useAccount } from 'wagmi';
import { useSellCarbon } from '../hooks/useSellCarbon';
import { useSellCarbonForm } from '../hooks/useSellCarbonForm';
import { SellCarbonFields } from '../sellCarbon.constants';
import { sellCarbonDialogAtom } from '../sellCarbon.utils';

const SellCarbonConfirm: FormFlowStep<SellCarbonFields> = ({
  previous,
  data,
}) => {
  const { parsedForm, form } = data;
  const setSellCarbonDialogState = useSetAtom(sellCarbonDialogAtom);
  const setAlert = useSetAtom(alertAtom);

  const {
    selectedBalance,
    amountToSellWei,
    refetch: refetchWalletData,
  } = useSellCarbonForm(form.watch);

  const onSubmit = async () => {
    setSellCarbonDialogState({ open: false, token: null });
  };

  const { contract } = useContract('AAMDiamond');

  const { allowance, isAllowed, setAllowance, isSettingAllowance } =
    useAllowance({
      tokenAddress: selectedBalance?.creditToken.address || '',
      tokenStandard: TOKEN_STANDARDS.ERC20,
      spender: parsedForm.current?.carbonClass || '',
      amount: amountToSellWei,
    });

  const handleSetAllowance = async (amount?: bigint) => {
    const result = await setAllowance(amount);
    if (!result) {
      form.setError('root', {
        message: 'Failed to approve token',
      });
    }
  };

  const minKvcmOut = applySlippage(
    parsedForm.current?.kvcmOutQuoteWei ?? 0n,
    -(parsedForm.current?.slippage ?? 0)
  );

  const kvcmOutString = `${formatStringToNumber(parsedForm.current?.kvcmOutQuoteWei, 18)} KVCM`;

  const { address } = useAccount();
  const { sellCarbon, isExecuting } = useSellCarbon({
    carbonClass: parsedForm.current?.carbonClass || '',
    amount: amountToSellWei,
    tokenId: selectedBalance?.creditToken.tokenId ?? 0,
    credit: selectedBalance?.creditToken.address ?? '',
    maturityId: 0,
    minKvcmOut,
    recipient: address ?? '',
  });

  const chainId = useChainId();

  const handleSellCarbon = async () => {
    const result = await sellCarbon();
    if (result.hash) {
      // Get the amount of KVCM received
      let amountKvcmReceived = parsedForm.current?.kvcmOutQuoteWei;

      const logs = await getTransactionTransferLogs(chainId, result.hash);

      for (const log of logs) {
        if (log.args.to === address) {
          amountKvcmReceived = log.args.value;
        }
      }

      // Show success message
      setAlert({
        title: 'Sale complete',
        description: `You’ve successfully sold ${parsedForm.current?.amountToSellTonnes} ${selectedBalance?.creditToken.symbol} to Klima Protocol for ${formatStringToNumber(amountKvcmReceived, 18)} KVCM! Stake your new kVCM tokens now to receive more incentives`,
        type: 'success',
        links: [
          {
            label: 'Stake KVCM',
            href: ROUTES.MY_ACTIVITIES,
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
      form.setError('root', { message: 'Failed to supply carbon' });
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
              iconSrc={CarbonCreditIconImg}
              value={`${parsedForm.current?.amountToSellTonnes} ${selectedBalance?.creditToken.symbol}`}
            />
            <Input
              label="You are receiving"
              readOnly
              iconSize="sm"
              value={kvcmOutString}
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
                onClick={handleSellCarbon}
                loading={isExecuting}
              >
                Supply Carbon
              </Button>
            )}
            {/* This button can be safely removed*/}
            {DEV_MODE && (
              <Button
                loading={isSettingAllowance}
                colors="secondary"
                context="flow"
                type="submit"
                onClick={() => handleSetAllowance(0n)}
              >
                Unapprove {allowance}
              </Button>
            )}
            <Button colors="primary" context="flow" onClick={previous}>
              Cancel
            </Button>
            {form.formState.errors.root && (
              <p className="text-red-500 text-size-14">
                {form.formState.errors.root.message}
              </p>
            )}
          </div>
        </form>
      </Card>
    </Dialog>
  );
};

export default SellCarbonConfirm;
