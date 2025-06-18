import clsx from 'clsx';
import { StaticImageData } from 'next/image';
import { Select } from 'radix-ui';
import React from 'react';
import Icon from '../Icon/Icon';

export type SelectInputItem = {
  value: string;
  label: string;
  icon?: StaticImageData;
};

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  items: SelectInputItem[];
  defaultValue?: string;
};

export default function SelectInput({
  label,
  items,
  defaultValue,
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
    <div className="flex flex-col gap-2 items-start w-full">
      <label className="text-size-14 font-semibold">{label}</label>
      <Select.Root
        value={stringValue}
        disabled={props.disabled}
        onValueChange={onValueChange}
        defaultValue={defaultValue}
      >
        <Select.Trigger className="w-full">
          <div
            className={clsx(
              'bg-void-10 rounded-lg',
              !props.disabled && 'border-1'
            )}
          >
            <Select.Value placeholder="Select one" />
          </div>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.ScrollUpButton />
            <Select.Viewport className="bg-background rounded-lg p-2 pl-3 w-full">
              {items.map((item) => (
                <Select.Item key={item.value} value={String(item.value)}>
                  <Select.ItemText>
                    <div className="bg-void-10 rounded-lg p-2 pl-3">
                      <div className="flex flex-row gap-2 font-size-14">
                        {item.icon && <Icon icon={item.icon} size={20} />}
                        {item.label}
                      </div>
                    </div>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton />
            <Select.Arrow />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
