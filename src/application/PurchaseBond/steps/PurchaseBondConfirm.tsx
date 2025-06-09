'use client';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import { PurchaseBondFC } from '../purchaseBond.types';

const PurchaseBondConfirm: PurchaseBondFC = ({ previous }) => {
  return (
    <Card title="Purchase a Bond" className="w-flowcard">
      Confirm
      <div className="flex flex-col gap-3 w-full">
        <Button colors="secondary" context="flow">
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
