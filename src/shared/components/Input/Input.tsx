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
  icon?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label = 'Token', icon, ...props }: Props) {
  console.info(icon);
  const backgroundImage = getBackgroundImage(icon);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-size-14 font-semibold">{label}</label>
      <input
        {...props}
        className="p-3 rounded-lg border-1 gap-2"
        style={{ backgroundImage }}
      />
    </div>
  );
}
