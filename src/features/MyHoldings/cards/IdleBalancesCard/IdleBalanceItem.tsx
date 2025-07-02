import Button from '@/shared/components/Button/Button';
import { Token, tokens } from '@/shared/constants/tokens.constants';
import { isLpToken } from '@/shared/utils/typeguards';

type Props = {
  token: Token;
  balance: number;
};

export default function IdleBalanceItem({ token, balance }: Props) {
  const buttonLabel = isLpToken(token) ? 'Stake' : 'Lock';
  const tokenInfo = tokens[token];
  return (
    <div className="flex flex-col gap-2 py-5">
      <div className="text-void-60 text-[1.4rem]">{tokenInfo.symbol}</div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row text-[2rem] gap-2">
          {tokenInfo.icon(2)}
          {balance}
        </div>
        <Button colors="secondary">{buttonLabel}</Button>
      </div>
    </div>
  );
}
