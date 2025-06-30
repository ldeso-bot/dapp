import clsx from 'clsx';
import { StaticImageData } from 'next/image';
import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import InputWrapper from './InputWrapper';

type Props = {
  label?: string;
  iconSrc?: StaticImageData;
  error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label = 'Token',
  iconSrc,
  error,
  ...props
}: Props) {
  return (
    <InputWrapper label={label} error={error}>
      <input
        {...props}
        className={clsx(
          'px-3 py-2 rounded-lg gap-2 w-full',
          !!iconSrc && 'pl-10',
          !props.disabled && 'border-1 hover:opacity-80',
          props.disabled && 'bg-void-10'
        )}
        style={{
          backgroundImage: `url(${iconSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: 'center',
          backgroundPositionX: '1.2rem',
        }}
      />
    </InputWrapper>
  );
}
