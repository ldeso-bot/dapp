'use client';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import FormError from '@/shared/components/Form/FormError';
import Input from '@/shared/components/Form/Input';
import { FormFlowStep } from '@/shared/components/Steps/steps.utils';
import { tokens } from '@/shared/constants/tokens.constants';
import { formatAddress, formatTimestamp } from '@/shared/utils/string.utils';
import { useState } from 'react';
import { PurchaseBondFields } from '../purchaseBond.constants';
import { useTransferWithPermit } from '../PurchaseBond.utils';

const PurchaseBondConfirm: FormFlowStep<PurchaseBondFields> = ({
  previous,
  data,
}) => {
  const { send, contract } = useTransferWithPermit();
  const [error, setError] = useState<string | null>(null);
  const { parsedForm, form } = data;

  const onSubmit = async () => {
    const { error } = await send();
    setError(error);
  };

  return (
    <Card title="Confirm your transaction">
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 pt-3">
          To complete this transaction, please allow our smart contract to
          transfer tokens on your behalf. Test: Clicking Submit will make a USDC
          transfer with permit
          <Input
            label="Contract Address"
            value={formatAddress(contract?.address)}
            disabled={true}
          />
          <Input
            label="You are sending"
            disabled={true}
            iconSrc={tokens.kvcm.iconSrc}
            value={`${parsedForm.current?.amount} ${tokens.kvcm.symbol}`}
          />
          <Input
            label="Maturity date"
            disabled={true}
            value={formatTimestamp(parsedForm.current?.maturityDate)}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Button colors="secondary" context="flow" type="submit">
            Submit
          </Button>
          <Button colors="primary" context="flow" onClick={previous}>
            Cancel
          </Button>
          <FormError error={error} />
        </div>
      </form>
    </Card>
  );
};

export default PurchaseBondConfirm;
