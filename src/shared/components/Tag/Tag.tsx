import { cn } from '@/shared/utils/component.utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Tag({ children, className }: Props) {
  className = cn(
    'whitespace-nowrap flex items-center justify-center gap-2 border-foreground rounded-full px-2 py-0 text-[0.8rem] text-white bg-void-60 uppercase',
    className
  );
  return <div className={className}>{children}</div>;
}
