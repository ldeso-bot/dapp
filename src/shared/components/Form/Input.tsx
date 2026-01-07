import { cn } from '@/shared/utils/component.utils';
import { StaticImageData } from 'next/image';
import { InputHTMLAttributes } from 'react';
import InputWrapper, { InputWrapperProps } from './layout/InputWrapper';

type Props = {
  iconSrc?: StaticImageData;
  iconSize?: 'sm' | 'md';
} & Omit<InputWrapperProps, 'children'> &
  InputHTMLAttributes<HTMLInputElement>;

export default function Input({ iconSrc, iconSize = 'md', ...props }: Props) {
  return (
    <InputWrapper {...props}>
      <input
        {...props}
        className={cn(
          'px-3 py-2 rounded-lg gap-2 w-full h-[4rem] border-gray-300',
          !props.disabled && !props.readOnly && 'border-1 hover:opacity-80',
          (props.disabled || props.readOnly) && 'border-1 bg-void-10',
          {
            'pl-10': !!iconSrc && iconSize === 'sm',
            'pl-12': !!iconSrc && iconSize === 'md',
          },
          props.className
        )}
        style={{
          backgroundImage: iconSrc ? `url(${iconSrc.src})` : 'none',
          backgroundSize: 'auto 2rem',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: 'center',
          backgroundPositionX: '1.2rem',
        }}
      />
    </InputWrapper>
  );
}
