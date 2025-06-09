import clsx from 'clsx';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  colors?: 'primary' | 'secondary';
  context?: 'main' | 'flow';
};

export default function Button({
  children,
  className,
  onClick,
  href,
  colors = 'primary',
  context = 'main',
}: Props) {
  className = clsx(
    'flex items-center justify-center gap-2 border-1 border-foreground cursor-pointer',
    colors === 'primary' && 'background-white text-void-80',
    colors === 'secondary' && 'bg-void-80 text-white',
    context === 'main' && 'rounded-lg px-3 py-1',
    context === 'flow' && 'w-full px-6 py-3',
    className
  );
  return (
    <>
      {!href ? (
        <button className={className} onClick={onClick}>
          {children}
        </button>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </>
  );
}
