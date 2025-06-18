import clsx from 'clsx';
import { StaticImageData } from 'next/image';
import { Select } from 'radix-ui';
import Icon from '../Icon/Icon';

export type SelectInputItem = {
  value: string | number;
  label: string;
  icon?: StaticImageData;
};

type Props = Select.SelectProps & {
  label?: string;
  items: SelectInputItem[];
};

export default function SelectInput({ label, items, ...props }: Props) {
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <label className="text-size-14 font-semibold">{label}</label>
      <Select.Root {...props} defaultValue={String(items[0]?.value)}>
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
