'use client';

import Icon from '@/shared/components/Icon/Icon';
import { tokens } from '@/shared/constants/tokens.constants';
import { useState } from 'react';

const payWithOptions = [
  {
    icon: tokens.kvcm.iconSrc,
    label: 'KLIMA',
    value: 'klima',
  },
  {
    icon: tokens.usdc.iconSrc,
    label: 'USDC',
    value: 'usdc',
  },
];

export default function PayWithOptions() {
  const [selected, setSelected] = useState('klima');
  return (
    <div className="flex flex-col gap-1">
      <label className="mb-1 font-medium">Pay With</label>
      <div className="flex gap-2">
        {payWithOptions.map((token) => (
          <label
            key={token.value}
            className={`flex items-center flex-1 justify-center gap-2 px-3 py-2 bg-white border cursor-pointer rounded transition-colors duration-150 ${selected === token.value
              ? 'bg-green80 border-void-60 ring-2 ring-void-60'
              : 'border-void-20'
              }`}
          >
            <input
              type="radio"
              name="payWith"
              value={token.value}
              checked={selected === token.value}
              onChange={() => setSelected(token.value)}
              className="sr-only"
            />
            <Icon icon={token.icon} size={20} />
            <span>{token.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}