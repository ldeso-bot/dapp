import { cn } from '@/shared/utils/component.utils';
import { TextareaHTMLAttributes } from 'react';
import InputWrapper, { InputWrapperProps } from './layout/InputWrapper';

type Props = {} & Omit<InputWrapperProps, 'children'> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({ ...props }: Props) => {
  return (
    <InputWrapper {...props}>
      <textarea
        {...props}
        className={cn(
          'px-3 py-2 rounded-lg gap-2 w-full min-h-[8rem] border-gray-300 resize-y',
          !props.disabled && !props.readOnly && 'border-1 hover:opacity-80',
          (props.disabled || props.readOnly) && 'border-1 bg-void-10',
          props.className
        )}
      />
    </InputWrapper>
  );
};
