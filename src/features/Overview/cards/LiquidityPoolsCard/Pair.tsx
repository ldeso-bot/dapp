import TokenPair from '@/shared/components/TokenPair/TokenPair';
import { TokenInfo } from '@/shared/constants/tokens.constants';

type Props = {
  token1: TokenInfo;
  token2: TokenInfo;
  description: string;
};

export default function Pair({ token1, token2, description }: Props) {
  return (
    <div className="flex flex-row gap-2">
      <TokenPair token1={token1} token2={token2} />
      <div className="flex flex-col">
        <div className="text-size-14 font-bold">
          {token1.symbol}/{token2.symbol}
        </div>
        <div className="text-void-50 text-size-12">{description}</div>
      </div>
    </div>
  );
}
