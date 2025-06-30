import Button from '@/shared/components/Button/Button';
import Tooltip from '@/shared/components/Tooltip/Tooltip';
import { Holding } from '@/shared/models/walletData';
import { HoldingsCardItemProps } from './HoldingsTable.types';

export default function HoldingAmount<T extends Holding>({
  holding,
  getButtonLabel,
  getButtonTooltip,
}: HoldingsCardItemProps<T>) {
  const button = <Button className="w-full">{getButtonLabel(holding)}</Button>;
  if (getButtonTooltip) {
    return <Tooltip content={getButtonTooltip(holding)} trigger={button} />;
  }
  return button;
}
