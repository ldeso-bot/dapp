'use client';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import { PurchaseBondFC } from '../purchaseBond.types';
import { useTransferWithPermit } from '../PurchaseBond.utils';

const PurchaseBondConfirm: PurchaseBondFC = ({ previous }) => {
  const { send } = useTransferWithPermit();
  return (
    <Card title="Purchase a Bond" className="w-flowcard">
      Confirm
      <div className="flex flex-col gap-3 w-full">
        <Button colors="secondary" context="flow" onClick={send}>
          Submit
        </Button>
        <Button colors="primary" context="flow" onClick={previous}>
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default PurchaseBondConfirm;
