'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Input from '@/shared/components/Input/Input';
import SelectInput from '@/shared/components/SelectInput/SelectInput';
import Yield from '@/shared/components/Yield/Yield';
import { tokens } from '@/shared/constants/tokens.constants';
import { PurchaseBondFC } from '../purchaseBond.types';

const PurchaseBondForm: PurchaseBondFC = ({ next }) => {
  return (
    <Card title="Purchase a Bond" className="w-flowcard">
      <div className="flex flex-col gap-4 pt-3">
        <SelectInput
          items={Object.values(tokens).map((token) => ({
            value: token.symbol,
            label: token.symbol,
            icon: token.icon,
          }))}
        />
        <Input label="Amount" type="number" icon={tokens.klima.icon} />
        <Yield baseApy={0.06} riskyYield={0.14}></Yield>
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
