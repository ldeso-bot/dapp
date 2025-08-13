import { cn } from '@/shared/utils/component.utils';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement> & {
  className?: string;
};

export default function ButtonGroup({ children, className, ...props }: Props) {
  return (
    <div {...props} className={cn('flex flex-col gap-3 w-full', className)}>
      {children}
    </div>
  );
}
