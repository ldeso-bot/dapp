'use client';

import Button from '@/shared/components/Button/Button';
import Input from '@/shared/components/Form/Input';
import { tokens } from '@/shared/constants/tokens.constants';
import type { UseFormReturn } from 'react-hook-form';
import type { RetireCarbonFields } from '../../retire.constants';

type Props = {
  form: UseFormReturn<RetireCarbonFields>
}

export default function AmountInput({ form }: Props) {
  return (
    <div className="flex">
      <Input
        label=""
        type="number"
        iconSrc={tokens.kvcm.iconSrc}
        {...form.register('amount')}
        error={form.formState.errors.amount}
      />
      <div className="flex items-end">
        <Button
          colors="secondary"
          className='uppercase py-2 text-md'>
          Max
        </Button>
      </div>
    </div>
  )
}