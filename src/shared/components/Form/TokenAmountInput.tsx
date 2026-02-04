'use client';

import Button from '@/shared/components/Button/Button';
import Input from '@/shared/components/Form/Input';
import type { StaticImageData } from 'next/image';
import { InputHTMLAttributes } from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';
import { isNonNullish } from 'remeda';
import InputWrapper from './layout/InputWrapper';

type Props<T extends FieldValues> = {
  tokenIconSrc?: StaticImageData;
  errorMessage?: FieldError;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  availableBalance?: number;
  name: Path<T>;
  control: Control<T>;
  label?: string;
};

export default function TokenAmountInput<T extends FieldValues>(
  props: Props<T>
) {
  const {
    inputProps,
    errorMessage,
    tokenIconSrc,
    availableBalance,
    name,
    control,
    label = 'Amount',
  } = props;

  return (
    <InputWrapper
      label={label ?? 'Amount'}
      error={errorMessage}
      addOnLabel={
        isNonNullish(availableBalance)
          ? `Available: ${availableBalance.toFixed(2) ?? '0.00'}`
          : undefined
      }
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <div className="flex w-full items-center">
              <Input
                iconSize="sm"
                iconSrc={tokenIconSrc}
                {...inputProps}
                value={field.value ?? ''}
                className="h-[4rem] border-r-0 rounded-e-none mr-1.5"
              />
              <div className="flex items-center gap-2 -ml-1">
                <Button
                  type="button"
                  colors="secondary"
                  className="uppercase py-3 text-md h-[4rem]"
                  onClick={() => {
                    const maxValue = Number(availableBalance ?? 0);
                    field.onChange(maxValue);
                  }}
                >
                  Max
                </Button>
              </div>
            </div>
          );
        }}
      />
    </InputWrapper>
  );
}
