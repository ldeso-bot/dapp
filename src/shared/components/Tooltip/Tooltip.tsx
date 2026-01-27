import helpIcon from '@/shared/images/help.svg';
import { cn } from '@/shared/utils/component.utils';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import Icon from '../Icon/Icon';
import styles from './tooltip.module.css';

type Props = {
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  iconSize?: number;
  className?: string;
};

export const Tooltip = ({ trigger, content, iconSize = 1.6, className }: Props) => {
  if (!content) {
    return trigger;
  }

  if (!trigger) {
    trigger = <Icon icon={helpIcon} alt={'Help'} size={iconSize} />;
  }

  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <div>{trigger}</div>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={5}
            className={cn(styles.TooltipContent, className)}
          >
            {content}
            <TooltipPrimitive.Arrow className={styles.TooltipArrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
