import { cn } from '@/shared/utils/component.utils';
import Link from 'next/link';
import { isNullish } from 'remeda';
import Spinner, { SpinnerColor } from '../Spinner/Spinner';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  colors?: 'primary' | 'secondary' | 'positive' | 'neutral';
  context?: 'main' | 'flow';
  target?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.LinkHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  loading,
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
    colors === 'primary' && 'bg-white text-void-80 border-foreground',
    colors === 'secondary' && 'bg-void-80 text-white border-foreground',
    colors === 'positive' && 'bg-green-200 text-green-900 border-green-200',
    colors === 'neutral' && 'bg-gray-100 text-gray-900 border-gray-300',
    context === 'main' && 'rounded-lg px-3 py-1',
    context === 'flow' && 'w-full px-6 py-3',
    className
  );

  // Disable loading buttons
  if (loading && isNullish(props.disabled)) {
    props.disabled = true;
  }

  const spinnerColor: SpinnerColor =
    colors === 'secondary' || colors === 'positive' ? 'white' : 'primary';

  return (
    <>
      {!href ? (
        <button className={className} onClick={onClick} {...props}>
          {loading ? <Spinner color={spinnerColor} /> : children}
        </button>
      ) : (
        <Link href={href} className={className} target={target} {...props}>
          {loading ? <Spinner color={spinnerColor} /> : children}
        </Link>
      )}
    </>
  );
}
