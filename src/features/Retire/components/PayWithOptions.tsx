'use client';

import Icon from '@/shared/components/Icon/Icon';
import { cn } from '@/shared/utils/component.utils';
import { useState } from 'react';
import { paymentOptions } from '../retire.constants';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export const PayWithOptions = (props: Props) => {
  const [selected, setSelected] = useState(props.value);

  const handleSelect = (value: string) => {
    setSelected(value);
    props.onChange?.(value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="mb-1 font-medium">Pay With</label>
      <div className="flex gap-2">
        {paymentOptions.map((token) => (
          <label
            key={token.value}
            className={cn(
              'flex items-center flex-1 justify-center border gap-2 px-3 py-2 cursor-pointer rounded transition-colors duration-150',
              {
                'bg-white border-void-50': selected !== token.value,
                'bg-green-10 border-green-40': selected === token.value,
              }
            )}
          >
            <input
              type="radio"
              name="payWith"
              value={token.value}
              checked={selected === token.value}
              onChange={() => handleSelect(token.value)}
              className="sr-only"
            />
            <Icon icon={token.icon} size={2} />
            <span>{token.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
