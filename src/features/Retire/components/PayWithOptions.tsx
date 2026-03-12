'use client';

import { cn } from '@/shared/utils/component.utils';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useWatch,
} from 'react-hook-form';
import { usePaymentOption } from '../hooks/usePaymentOption';
import { paymentOptions } from '../retire.constants';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export const PayWithOptions = <T extends FieldValues>(props: Props<T>) => {
  const { name, control } = props;
  const value = useWatch({ control, name });

  const selectedPaymentOption = usePaymentOption(value);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className="flex flex-col gap-1">
            <label className="mb-1 font-medium">Pay With</label>
            <div className="flex gap-2">
              {paymentOptions.map((option) => (
                <label
                  key={option.token.id}
                  className={cn(
                    'flex items-center flex-1 justify-center border gap-2 px-3 py-2 cursor-pointer rounded transition-colors duration-150',
                    {
                      'bg-surface-1 border-border-strong':
                        field.value !== option.token.id,
                      'bg-positive-bg border-border-strong':
                        field.value === option.token.id,
                      'bg-surface-3 border-border-strong opacity-50 cursor-not-allowed':
                        option.disabled,
                    }
                  )}
                  title={option.tooltip}
                >
                  <input
                    type="radio"
                    name="payWith"
                    value={option.token.id}
                    checked={field.value === option.token.id}
                    onChange={() => field.onChange(option.token.id)}
                    className="sr-only cursor-none"
                    disabled={option.disabled}
                  />
                  {option.token.icon(2)}
                  <span>{option.token.symbol}</span>
                </label>
              ))}
            </div>
            {selectedPaymentOption && selectedPaymentOption.token && (
              <div className="flex gap-2">
                <span className="font-medium">Available Balance:</span>
                <span>
                  {selectedPaymentOption.balance?.toFixed(2)}{' '}
                  {selectedPaymentOption.token.symbol}
                </span>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
