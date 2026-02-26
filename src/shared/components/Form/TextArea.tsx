import { cn } from '@/shared/utils/component.utils';
import { TextareaHTMLAttributes } from 'react';
import InputWrapper, { InputWrapperProps } from './layout/InputWrapper';

type Props = {} & Omit<InputWrapperProps, 'children'> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({
  label,
  error,
  tooltip,
  addOnLabel,
  mandatory,
  ...textAreaProps
}: Props) => {
  return (
    <InputWrapper
      label={label}
      error={error}
      tooltip={tooltip}
      addOnLabel={addOnLabel}
      mandatory={mandatory}
    >
      <textarea
        {...textAreaProps}
        className={cn(
          'px-3 py-2 rounded-lg gap-2 w-full min-h-[8rem] border-gray-300 resize-y',
          !textAreaProps.disabled &&
            !textAreaProps.readOnly &&
            'border-1 hover:opacity-80',
          (textAreaProps.disabled || textAreaProps.readOnly) &&
            'border-1 bg-void-10',
          textAreaProps.className
        )}
      />
    </InputWrapper>
  );
};
