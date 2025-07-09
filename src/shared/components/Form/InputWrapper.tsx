import React from 'react';
import { FieldError } from 'react-hook-form';
import Tooltip from '../Tooltip/Tooltip';
import InputError from './InputError';

export type InputWrapperProps = {
  label?: string;
  error?: FieldError;
  tooltip?: string;
  children: React.ReactNode;
};

export default function InputWrapper({
  label,
  error,
  tooltip,
  children,
}: InputWrapperProps) {
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <div className="flex items-center gap-2">
        <label className="text-size-14 font-medium">{label}</label>
        {tooltip && <Tooltip content={tooltip} />}
      </div>
      {children}
      <InputError error={error} />
    </div>
  );
}
