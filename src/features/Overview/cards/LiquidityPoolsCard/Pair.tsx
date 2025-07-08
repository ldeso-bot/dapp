import { LpToken, tokens } from '@/shared/constants/tokens.constants';

type Props = {
  token: LpToken;
  description: string;
};

export default function Pair({ token, description }: Props) {
  const tokenInfo = tokens[token];
  return (
    <div className="flex flex-row gap-2">
      {tokenInfo.icon(3.2)}
      <div className="flex flex-col">
        <div className="text-size-14 font-bold">{tokenInfo.symbol}</div>
        <div className="text-void-50 text-size-12">{description}</div>
      </div>
    </div>
  );
}
