import { cn } from '@/shared/utils/component.utils';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  colors?: 'primary' | 'secondary' | 'positive' | 'neutral' | 'unstyled';
  context?: 'main' | 'flow';
  target?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.LinkHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  children,
  className,
  onClick,
  href,
  colors = 'primary',
  context = 'main',
  target = '_self',
  ...props
}: Props) {
  className = cn(
    'whitespace-nowrap flex items-center justify-center rounded-lg gap-2 border-1 cursor-pointer hover:opacity-80 min-w-fit disabled:opacity-50 disabled:cursor-not-allowed',
    colors === 'primary' && 'bg-surface-1 text-text-1 border-foreground',
    colors === 'secondary' &&
      'bg-surface-inverse text-text-1 border-foreground',
    colors === 'positive' && 'bg-green-200 text-green-900 border-green-200',
    colors === 'neutral' && 'bg-surface-2 text-text-1 border-border-default',
    colors === 'unstyled' && 'bg-transparent text-inherit border-transparent',
    context === 'main' && 'rounded-lg px-3 py-1',
    context === 'flow' && 'w-full px-6 py-3',
    className
  );

  return (
    <>
      {!href ? (
        <button className={className} onClick={onClick} {...props}>
          {children}
        </button>
      ) : (
        <Link href={href} className={className} target={target} {...props}>
          {children}
        </Link>
      )}
    </>
  );
}
