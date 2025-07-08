import Image, { StaticImageData } from 'next/image';

type Props = {
  icon: StaticImageData;
  size?: number;
  alt?: string;
  className?: string;
};

export default function Icon({ icon, alt, size = 3.2, className }: Props) {
  alt = alt || '';
  return (
    <Image src={icon} alt={alt} height={size * 10} className={className} />
  );
}
