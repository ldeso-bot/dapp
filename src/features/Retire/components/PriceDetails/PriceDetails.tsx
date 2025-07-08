'use client';

import Icon from '@/shared/components/Icon/Icon';
import { paymentOptions } from '../../retire.constants';

type Props = {
  paymentMethod: string;
};

export default function PriceDetails(props: Props) {
  const selectedPaymentOption =
    paymentOptions.find(({ value }) => value === props.paymentMethod) ??
    paymentOptions[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div>Price per Tonne</div>
        <div className="flex gap-2">
          <Icon icon={selectedPaymentOption?.icon} size={2} />
          <span>-</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>Total</div>
        <div className="flex gap-2">
          <Icon icon={selectedPaymentOption?.icon} size={2} />
          <span>-</span>
        </div>
      </div>
    </div>
  );
}
