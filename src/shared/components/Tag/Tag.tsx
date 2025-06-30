import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Tag({ children, className }: Props) {
  className = clsx(
    'whitespace-nowrap flex items-center justify-center gap-2 border-foreground rounded-full px-2 py-0 text-size-8 text-white bg-void-60 uppercase',
    className
  );
  return <div className={className}>{children}</div>;
}
