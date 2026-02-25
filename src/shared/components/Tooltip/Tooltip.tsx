import helpIcon from '@/shared/images/help.svg';
import { cn } from '@/shared/utils/component.utils';
import {
  Popover as PopoverPrimitive,
  Tooltip as TooltipPrimitive,
} from 'radix-ui';
import * as React from 'react';
import Icon from '../Icon/Icon';
import styles from './tooltip.module.css';

type Props = {
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  iconSize?: number;
  className?: string;
};

function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mql = window.matchMedia('(pointer: coarse)');
    const update = () => setIsCoarse(mql.matches);
    update();

    if ('addEventListener' in mql) {
      mql.addEventListener('change', update);
      return () => mql.removeEventListener('change', update);
    }

    // Legacy Safari support
    const legacyMql = mql as MediaQueryList & {
      addListener: (
        listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
      ) => void;
      removeListener: (
        listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
      ) => void;
    };
    legacyMql.addListener(update);
    return () => legacyMql.removeListener(update);
  }, []);
  return isCoarse;
}

export const Tooltip = ({
  trigger,
  content,
  iconSize = 1.6,
  className,
}: Props) => {
  const isCoarse = useIsCoarsePointer();

  if (!content) return trigger ?? null;

  const triggerNode = trigger ?? (
    <Icon icon={helpIcon} alt="Help" size={iconSize} />
  );

  const TriggerButton = (
    <button type="button" className={styles.TriggerButton} aria-label="Help">
      {triggerNode}
    </button>
  );

  if (isCoarse) {
    return (
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          {TriggerButton}
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            sideOffset={5}
            className={cn(styles.TooltipContent, className)}
          >
            {content}
            <PopoverPrimitive.Arrow className={styles.TooltipArrow} />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  }
  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {TriggerButton}
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
