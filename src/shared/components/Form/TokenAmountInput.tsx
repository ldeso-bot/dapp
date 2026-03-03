'use client';

import Button from '@/shared/components/Button/Button';
import Input from '@/shared/components/Form/Input';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
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
  iconSrc?: StaticImageData;
  error?: FieldError;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'name' | 'value' | 'defaultValue' | 'onBlur' | 'onChange'
  >;
  availableBalance?: number;
  name: Path<T>;
  control: Control<T>;
  label?: string;
  iconSize?: 'sm' | 'md';
};

export default function TokenAmountInput<T extends FieldValues>(
  props: Props<T>
) {
  const {
    inputProps,
    error: errorMessage,
    iconSrc: tokenIconSrc,
    availableBalance,
    name,
    control,
    label = 'Amount',
    iconSize: tokenIconSize = 'sm',
  } = props;

  const formattedAvailableBalance = formatAmountWithCommas(
    availableBalance,
    'auto'
  );

  return (
    <InputWrapper
      label={label ?? 'Amount'}
      error={errorMessage}
      addOnLabelBottom={
        isNonNullish(availableBalance)
          ? `Available: ${formattedAvailableBalance}`
          : undefined
      }
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex w-full items-center gap-1">
            <Input
              iconSize={tokenIconSize}
              iconSrc={tokenIconSrc}
              type="number"
              min={0}
              max={availableBalance}
              name={field.name}
              value={field.value ?? ''}
              className="h-[4rem] rounded-e-none"
              onBlur={field.onBlur}
              onFocus={(e) => {
                const v = e.currentTarget.value;
                if (v !== '' && Number(v) === 0) e.currentTarget.select();
              }}
              onChange={(e) => {
                field.onChange(Number(e.target.value));
              }}
              {...inputProps}
            />

            <Button
              type="button"
              colors="secondary"
              className="uppercase text-md h-[4rem]"
              onClick={() => field.onChange(Number(availableBalance ?? 0))}
            >
              Max
            </Button>
          </div>
        )}
      />
    </InputWrapper>
  );
}
