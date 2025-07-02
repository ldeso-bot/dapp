import { StaticImageData } from 'next/image';
import Icon from '../Icon/Icon';

type Props = {
  token1: StaticImageData;
  token2: StaticImageData;
  size?: number;
};

export default function TokenPair({ token1, token2, size = 3.2 }: Props) {
  return (
    <div className="flex flex-row" style={{ height: `${size}rem` }}>
      <Icon icon={token1} size={size} className="-mr-2" />
      <Icon icon={token2} size={size} />
    </div>
  );
}
