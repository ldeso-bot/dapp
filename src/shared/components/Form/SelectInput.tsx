import React, { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select/Select';
import InputWrapper from './layout/InputWrapper';

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
  mandatory?: boolean;
};

export default function SelectInput({
  label,
  items,
  defaultValue,
  error,
  mandatory,
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
  const stringDefaultValue = defaultValue ? String(defaultValue) : undefined;

  return (
    <InputWrapper label={label} error={error} mandatory={mandatory}>
      <Select
        value={stringValue}
        disabled={props.disabled ?? props.readOnly}
        onValueChange={onValueChange}
        defaultValue={stringDefaultValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={String(item.value)}
              icon={item.icon}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </InputWrapper>
  );
}
