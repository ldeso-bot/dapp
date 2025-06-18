'use client';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import { useState } from 'react';
import { PurchaseBondFC } from '../purchaseBond.constants';
import { useTransferWithPermit } from '../PurchaseBond.utils';

const PurchaseBondConfirm: PurchaseBondFC = ({ previous }) => {
  const { send } = useTransferWithPermit();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    const { error } = await send();
    setError(error);
  };

  return (
    <Card title="Purchase a Bond" className="w-flowcard">
      Test: Clicking Submit will make a USDC transfer with permit
      <div className="flex flex-col gap-3 w-full">
        <Button colors="secondary" context="flow" onClick={onSubmit}>
          Submit
        </Button>
        <Button colors="primary" context="flow" onClick={previous}>
          Cancel
        </Button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </Card>
  );
};

export default PurchaseBondConfirm;
