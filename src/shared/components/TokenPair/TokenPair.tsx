import { Token, TokenInfo, tokens } from '@/shared/constants/tokens.constants';
import { isToken } from '@/shared/utils/typeguards';
import Icon from '../Icon/Icon';

type Props = {
  token1: TokenInfo | Token;
  token2: TokenInfo | Token;
  size?: number;
};

export default function TokenPair({ token1, token2, size = 32 }: Props) {
  const token1Info = isToken(token1) ? tokens[token1] : token1;
  const token2Info = isToken(token2) ? tokens[token2] : token2;

  return (
    <div className="flex flex-row" style={{ height: `${size}px` }}>
      <Icon
        icon={token1Info.icon}
        alt={token1Info.symbol}
        size={size}
        className="-mr-2"
      />
      <Icon icon={token2Info.icon} alt={token2Info.symbol} size={size} />
    </div>
  );
}
