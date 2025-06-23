import clsx from 'clsx';
import { StaticImageData } from 'next/image';
import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import InputWrapper from './InputWrapper';

type Props = {
  label?: string;
  icon?: StaticImageData;
  error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label = 'Token',
  icon,
  error,
  ...props
}: Props) {
  return (
    <InputWrapper label={label} error={error}>
      <input
        {...props}
        className={clsx(
          'px-3 py-2 rounded-lg gap-2 w-full',
          !!icon && 'pl-10',
          !props.disabled && 'border-1 hover:opacity-80',
          props.disabled && 'bg-void-10'
        )}
        style={{
          backgroundImage: `url(${icon?.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: 'center',
          backgroundPositionX: '1.2rem',
        }}
      />
    </InputWrapper>
  );
}
