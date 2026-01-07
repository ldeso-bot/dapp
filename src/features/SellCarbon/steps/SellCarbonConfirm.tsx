'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Dialog from '@/shared/components/Dialog/Dialog';
import Input from '@/shared/components/Form/Input';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { DEV_MODE } from '@/shared/constants/config.constants';
import { CarbonCreditIconImg } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useAllowance } from '@/shared/hooks/useAllowance';
import { useContract } from '@/shared/hooks/web3/useContract';
import { TOKEN_STANDARDS } from '@/shared/models/shared';
import { formatAddress, parseAmount } from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import { useAccount } from 'wagmi';
import { SellCarbonFields } from '../sellCarbon.constants';
import { sellCarbonDialogAtom, useSellCarbon } from '../sellCarbon.utils';

const SellCarbonConfirm: FormFlowStep<SellCarbonFields> = ({
  previous,
  data,
}) => {
  const { parsedForm, form } = data;
  const setSellCarbonDialogState = useSetAtom(sellCarbonDialogAtom);

  const onSubmit = async () => {
    setSellCarbonDialogState({ open: false, token: null });
  };
  const { data: walletData } = useWalletData();
  const creditBalances = walletData?.creditBalances ?? [];
  const selectedBalance = creditBalances.find(
    (b) => b.creditToken.creditTokenId === parsedForm.current?.token
  );

  const { contract } = useContract('AAMDiamond');

  const { allowance, isAllowed, setAllowance, isSettingAllowance } =
    useAllowance({
      tokenAddress: selectedBalance?.creditToken.address || '',
      tokenStandard: TOKEN_STANDARDS.ERC20,
      spender: contract?.address || '',
      amount: parseAmount(
        parsedForm.current?.amount,
        selectedBalance?.creditToken.decimals
      ),
    });

  const handleSetAllowance = async (amount?: bigint) => {
    const result = await setAllowance(amount);
    if (!result) {
      form.setError('amount', { message: 'Failed to approve token' });
    }
  };

  const { address } = useAccount();
  const { sellCarbon } = useSellCarbon();

  const handleSellCarbon = async () => {
    if (!parsedForm.current) {
      form.setError('amount', { message: 'Form data is not valid' });
      return;
    }
    if (!address) {
      form.setError('amount', { message: 'Wallet address is not available' });
      return;
    }
    if (!selectedBalance) {
      form.setError('amount', { message: 'Selected balance not found' });
      return;
    }

    const amountBigInt = parseAmount(
      parsedForm.current?.amount,
      selectedBalance.creditToken.decimals
    );

    const minKvcmOut =
      parsedForm.current?.amountReceived *
      (1 - parsedForm.current?.slippage / 100);
    const minKvcmOutBigInt = parseAmount(minKvcmOut, 18);

    const result = await sellCarbon({
      address: parsedForm.current?.token,
      carbonClass: parsedForm.current?.carbonClass,
      amount: amountBigInt,
      tokenId: selectedBalance.creditToken.tokenId,
      credit: selectedBalance.creditToken.address,
      maturityId: 0,
      minKvcmOut: minKvcmOutBigInt,
      recipient: address,
    });
    if (!result) {
      form.setError('amount', { message: 'Failed to sell carbon' });
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
              value={`${parsedForm.current?.amount} ${selectedBalance?.creditToken.name}`}
            />
            <Input
              label="You are receiving"
              readOnly
              iconSize="sm"
              value={`${parsedForm.current?.amountReceived}`}
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
              >
                Sell Carbon
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
            {form.formState.errors.amount && (
              <p className="text-red-500 text-size-14">
                {form.formState.errors.amount.message}
              </p>
            )}
          </div>
        </form>
      </Card>
    </Dialog>
  );
};

export default SellCarbonConfirm;
