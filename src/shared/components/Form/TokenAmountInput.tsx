'use client';

import Button from '@/shared/components/Button/Button';
import Input from '@/shared/components/Form/Input';
import type { StaticImageData } from 'next/image';
import { InputHTMLAttributes, useState } from 'react';
import { FieldError } from 'react-hook-form';
import InputWrapper from './layout/InputWrapper';

type Props = {
  tokenIconSrc: StaticImageData;
  errorMessage?: FieldError;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
};

export default function TokenAmountInput(props: Props) {
  const [availableBalance] = useState(0.0);
  const { inputProps, errorMessage, tokenIconSrc } = props;
  return (
    <InputWrapper
      label="Amount"
      error={errorMessage}
      addOnLabel={`Available: ${availableBalance.toFixed(2)}`}
    >
      {/* TODO - fix issue with gap... */}
      <div className="flex w-full">
        <Input
          iconSize="sm"
          iconSrc={tokenIconSrc}
          {...inputProps}
          className="h-[4rem] border-r-0 rounded-e-none"
        />
        <div className="flex items-center gap-2 mt-2 -ml-1">
          <Button
            colors="secondary"
            className="uppercase py-3 text-md h-[4rem]"
          >
            Max
          </Button>
        </div>
      </div>
    </InputWrapper>
  );
}
