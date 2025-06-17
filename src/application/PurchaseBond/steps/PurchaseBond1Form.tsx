'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import TokenInput from '@/shared/components/TokenInput/TokenInput';
import { PurchaseBondFC } from '../purchaseBond.types';

const PurchaseBondForm: PurchaseBondFC = ({ next }) => {
  return (
    <Card title="Purchase a Bond" className="w-flowcard">
      Form
      <div className="flex flex-col gap-4">
        <TokenInput />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Button colors="secondary" context="flow" onClick={next}>
          Bond Klima
        </Button>
        <Button colors="primary" context="flow" href="/">
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default PurchaseBondForm;
