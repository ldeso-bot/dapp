'use client';

import Slider from '@/shared/components/Slider/Slider';
import { UseFormReturn } from 'react-hook-form';
import { SellCarbonFields } from '../sellCarbon.constants';

type Props = {
  form: UseFormReturn<SellCarbonFields>;
};

export const SlippageSlider = ({ form }: Props) => {
  const slippage = form.watch('slippage');
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <label className="text-size-14 font-medium">Slippage Tolerance</label>
        <div>{Number(slippage * 100).toFixed(2)}%</div>
      </div>
      <Slider
        name="slippage"
        control={form?.control}
        max={0.01}
        step={0.0001}
      />
    </div>
  );
};
