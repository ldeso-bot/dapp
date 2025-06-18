import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';

type Props = {
  icon: StaticImageData;
  size?: number;
  alt?: string;
  className?: string;
};

export default function Icon({ icon, alt, size = 32, className }: Props) {
  alt = alt || '';
  return (
    <Image
      src={icon}
      alt={alt}
      width={size}
      height={size}
      className={clsx('h-auto w-auto', className)}
    />
  );
}
