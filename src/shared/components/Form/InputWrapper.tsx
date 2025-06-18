import React from 'react';
import { FieldError } from 'react-hook-form';
import InputError from './InputError';

type Props = {
  label?: string;
  error?: FieldError;
  children: React.ReactNode;
};

export default function InputWrapper({ label, error, children }: Props) {
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <label className="text-size-14 font-semibold">{label}</label>
      {children}
      <InputError error={error} />
    </div>
  );
}
