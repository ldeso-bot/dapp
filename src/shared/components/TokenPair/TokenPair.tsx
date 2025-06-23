import { TokenInfo } from '@/shared/constants/tokens.constants';
import Icon from '../Icon/Icon';

type Props = {
  token1: TokenInfo;
  token2: TokenInfo;
  size?: number;
};

export default function TokenPair({ token1, token2, size = 32 }: Props) {
  return (
    <div className="flex flex-row" style={{ height: `${size}px` }}>
      <Icon
        icon={token1.icon}
        alt={token1.symbol}
        size={size}
        className="-mr-3"
      />
      <Icon icon={token2.icon} alt={token2.symbol} size={size} />
    </div>
  );
}
