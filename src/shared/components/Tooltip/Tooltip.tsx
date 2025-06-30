import helpIcon from '@/shared/images/help.svg';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import Icon from '../Icon/Icon';
import styles from './tooltip.module.css';

type Props = {
  trigger?: React.ReactNode;
  content?: React.ReactNode;
};
export default function Tooltip({ trigger, content }: Props) {
  if (!content) {
    return trigger;
  }
  if (!trigger) {
    trigger = <Icon icon={helpIcon} alt={'Help'} size={16} />;
  }

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <div>{trigger}</div>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={styles.TooltipContent}
            sideOffset={5}
          >
            {content}
            <TooltipPrimitive.Arrow className={styles.TooltipArrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
