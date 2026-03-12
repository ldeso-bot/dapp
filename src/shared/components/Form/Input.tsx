import { cn } from '@/shared/utils/component.utils';
import Image, { StaticImageData } from 'next/image';
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
  addOnLabelTop: addOnLabel,
  mandatory,
  ...inputProps
}: Props) {
  const iconClass = iconSize === 'sm' ? 'w-5 h-5 left-3' : 'w-6 h-6 left-3';

  return (
    <InputWrapper
      label={label}
      error={error}
      tooltip={tooltip}
      addOnLabelTop={addOnLabel}
      mandatory={mandatory}
    >
      <div className="w-full flex flex-row gap-2">
        <div className="relative w-full">
          {iconSrc && (
            <div className={cn('absolute top-1/2 -translate-y-1/2', iconClass)}>
              <Image src={iconSrc} alt="" className="w-full h-full" />
            </div>
          )}

          <input
            {...inputProps}
            className={cn(
              'px-3 py-2 rounded-lg gap-2 w-full h-[4rem] border-border-default',
              !inputProps.disabled &&
                !inputProps.readOnly &&
                'border-1 hover:opacity-80',
              (inputProps.disabled || inputProps.readOnly) &&
                'border-1 bg-surface-3',
              inputProps.readOnly &&
                'select-none cursor-default hover:border-0 border-0',
              {
                'pl-10': !!iconSrc && iconSize === 'sm',
                'pl-12': !!iconSrc && iconSize === 'md',
              },
              inputProps.className
            )}
          />
        </div>

        {addOnButton}
      </div>
    </InputWrapper>
  );
}
