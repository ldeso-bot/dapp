import { cn } from '@/shared/utils/component.utils';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement> & {
  className?: string;
};

export default function InputGroup({ children, className, ...props }: Props) {
  return (
    <div {...props} className={cn('flex flex-col gap-4 pt-3', className)}>
      {children}
    </div>
  );
}
