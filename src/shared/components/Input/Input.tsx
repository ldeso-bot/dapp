import { ImageMetadata } from '@/shared/constants/tokens.constants';
import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

function getBackgroundImage(srcSet = '') {
  const imageSet = srcSet
    .split(', ')
    .map((str) => {
      const [url, dpi] = str.split(' ');
      return `url("${url}") ${dpi}`;
    })
    .join(', ');
  return `image-set(${imageSet})`;
}

type Props = {
  label?: string;
  icon?: ImageMetadata;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label = 'Token', icon, ...props }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-size-14 font-semibold">{label}</label>
      <input
        {...props}
        className={clsx('p-3 rounded-lg border-1 gap-2 ', !!icon && 'pl-10')}
        style={{
          backgroundImage: `url(${icon?.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: 'center',
          backgroundPositionX: '1.2rem',
        }}
      />
    </div>
  );
}
