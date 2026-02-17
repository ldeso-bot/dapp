import Image, { StaticImageData } from 'next/image';
import type { CSSProperties } from 'react';

type Props = {
  icon: StaticImageData;
  size?: number;
  alt?: string;
  className?: string;
  style?: CSSProperties;
};

export default function Icon({
  icon,
  alt = '',
  size = 3.2,
  className,
  style,
}: Props) {
  return (
    <Image
      src={icon}
      alt={alt}
      height={size * 10}
      className={className}
      style={style}
    />
  );
}
