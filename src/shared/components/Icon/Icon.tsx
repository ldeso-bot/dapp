import Image from 'next/image';

type Props = {
  icon: string;
  size?: number;
  alt?: string;
  className?: string;
};

export default async function TokenPair({
  icon,
  alt,
  size = 32,
  className,
}: Props) {
  alt = alt || icon;
  return (
    <Image
      src={icon}
      alt={alt}
      width={size}
      height={size}
      className={className}
    />
  );
}
