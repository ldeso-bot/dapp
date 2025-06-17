import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  icon: string;
  size?: number;
  alt?: string;
  className?: string;
};

export default function Icon({ icon, alt, size = 32, className }: Props) {
  alt = alt || icon;
  return (
    <Image
      src={icon}
      alt={alt}
      width={size}
      height={size}
      className={clsx('w-auto h-auto', className)}
    />
  );
}
