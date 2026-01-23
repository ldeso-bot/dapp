import { cn } from '@/shared/utils/component.utils';
import React from 'react';
import { FieldError } from 'react-hook-form';
import { MandatoryAsterisk } from '../../MandatoryAsterisk';
import { Tooltip } from '../../Tooltip/Tooltip';
import InputError from './InputError';

export type InputWrapperProps = {
  label?: string;
  error?: FieldError;
  tooltip?: string;
  addOnLabel?: string;
  mandatory?: boolean;
  children: React.ReactNode;
};

export default function InputWrapper(props: InputWrapperProps) {
  const { label, error, tooltip, addOnLabel, mandatory, children } = props;
  return (
    <div className={cn('flex flex-col gap-2 items-start w-full')}>
      {(label || addOnLabel) && (
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <label className="text-size-14 font-medium">
              {label}
              {mandatory && (
                <>
                  {' '}
                  <MandatoryAsterisk />
                </>
              )}
            </label>
            {tooltip && <Tooltip content={tooltip} />}
          </div>
          {addOnLabel && (
            <div className="text-size-14 font-medium">{addOnLabel}</div>
          )}
        </div>
      )}
      {children}
      <InputError error={error} />
    </div>
  );
}
