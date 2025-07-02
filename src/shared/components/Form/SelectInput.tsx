import { cn } from '@/shared/utils/component.utils';
import { Select as SelectPrimitive } from 'radix-ui';
import React, { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import InputWrapper from './InputWrapper';

type SelectInputItem = {
  value: string | number | bigint;
  label: string;
  icon?: ReactNode;
};

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  items: SelectInputItem[];
  error?: FieldError;
  defaultValue?: string | number;
};

export default function Select({
  label,
  items,
  defaultValue,
  error,
  ...props
}: Props) {
  const onValueChange = (value: string) => {
    if (props.onChange && props.name) {
      props.onChange({
        target: { name: props.name, value },
        // TODO: a little cheat here. See: https://stackoverflow.com/questions/75815473/how-can-i-implement-react-hook-form-with-radix-ui-select
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Convert value to string for compatibility
  const stringValue = props.value ? String(props.value) : undefined;
  return (
    <InputWrapper label={label} error={error}>
      <SelectPrimitive.Root
        value={stringValue}
        disabled={props.disabled}
        onValueChange={onValueChange}
        defaultValue={String(defaultValue)}
      >
        <SelectPrimitive.Trigger className="w-full">
          <div
            className={cn(
              'bg-void-10 rounded-lg',
              !props.disabled && 'border-1 cursor-pointer hover:opacity-80'
            )}
          >
            <SelectPrimitive.Value placeholder="Select one" />
          </div>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content>
            <SelectPrimitive.ScrollUpButton />
            <SelectPrimitive.Viewport className="bg-background rounded-lg p-2 pl-3 w-full">
              {items.map((item) => (
                <SelectPrimitive.Item
                  key={item.value}
                  value={String(item.value)}
                >
                  <SelectPrimitive.ItemText>
                    <div className="bg-void-10 rounded-lg p-2 pl-3 cursor-pointer">
                      <div className="flex flex-row gap-2 font-size-14">
                        {item.icon}
                        {item.label}
                      </div>
                    </div>
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton />
            <SelectPrimitive.Arrow />
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </InputWrapper>
  );
}
