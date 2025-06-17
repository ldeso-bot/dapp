import { Select } from 'radix-ui';
import Icon from '../Icon/Icon';

export type SelectInputItem = {
  value: string | number;
  label: string;
  icon?: string;
};

type Props = {
  label?: string;
  items: SelectInputItem[];
  onValueChange?: (value: string) => void;
  value?: string;
};

export default function SelectInput({
  label = 'Token',
  items,
  onValueChange,
  value,
}: Props) {
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <label className="text-size-14 font-semibold">{label}</label>
      <Select.Root
        onValueChange={onValueChange}
        value={value}
        defaultValue={String(items[0]?.value)}
      >
        <Select.Trigger className="w-full">
          <Select.Value placeholder="Select an option" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.ScrollUpButton />
            <Select.Viewport className="bg-background rounded-lg p-2 w-full">
              {items.map((item) => (
                <Select.Item key={item.value} value={String(item.value)}>
                  <Select.ItemText>
                    <div className="bg-void-10 rounded-lg p-2">
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
