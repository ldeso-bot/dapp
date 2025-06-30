import TokenPair from '@/shared/components/TokenPair/TokenPair';
import { Token, tokens } from '@/shared/constants/tokens.constants';

type Props = {
  token1: Token;
  token2: Token;
  description: string;
};

export default function Pair({ token1, token2, description }: Props) {
  const tokenInfo1 = tokens[token1];
  const tokenInfo2 = tokens[token2];
  return (
    <div className="flex flex-row gap-2">
      <TokenPair token1={tokenInfo1.iconSrc} token2={tokenInfo2.iconSrc} />
      <div className="flex flex-col">
        <div className="text-size-14 font-bold">
          {tokenInfo1.symbol}/{tokenInfo2.symbol}
        </div>
        <div className="text-void-50 text-size-12">{description}</div>
      </div>
    </div>
  );
}
