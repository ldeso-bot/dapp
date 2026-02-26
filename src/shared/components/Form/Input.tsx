import { cn } from '@/shared/utils/component.utils';
import { StaticImageData } from 'next/image';
import { InputHTMLAttributes } from 'react';
import InputWrapper, { InputWrapperProps } from './layout/InputWrapper';

type Props = {
  iconSrc?: StaticImageData;
  iconSize?: 'sm' | 'md';
  addOnButton?: React.ReactNode;
} & Omit<InputWrapperProps, 'children'> &
  InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  iconSrc,
  iconSize = 'md',
  addOnButton,
  label,
  error,
  tooltip,
  addOnLabel,
  mandatory,
  ...inputProps
}: Props) {
  return (
    <InputWrapper
      label={label}
      error={error}
      tooltip={tooltip}
      addOnLabel={addOnLabel}
      mandatory={mandatory}
    >
      <div className="w-full flex flex-row gap-2">
        <input
          {...inputProps}
          className={cn(
            'px-3 py-2 rounded-lg gap-2 w-full h-[4rem] border-gray-300',
            !inputProps.disabled &&
              !inputProps.readOnly &&
              'border-1 hover:opacity-80',
            (inputProps.disabled || inputProps.readOnly) &&
              'border-1 bg-void-10',
            inputProps.readOnly &&
              'select-none cursor-default hover:border-0 border-0',
            {
              'pl-10': !!iconSrc && iconSize === 'sm',
              'pl-12': !!iconSrc && iconSize === 'md',
            },
            inputProps.className
          )}
          style={{
            backgroundImage: iconSrc ? `url(${iconSrc?.src})` : undefined,
            backgroundSize: 'auto 2rem',
            backgroundRepeat: 'no-repeat',
            backgroundPositionY: 'center',
            backgroundPositionX: '1.2rem',
          }}
        />
        {addOnButton}
      </div>
    </InputWrapper>
  );
}
