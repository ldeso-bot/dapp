import Button from '@/shared/components/Button/Button';
import { ROUTES } from '@/shared/constants/route.constants';
import { isLpToken, Token, tokens } from '@/shared/constants/tokens.constants';

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
        <div className="flex flex-row text-[2rem] gap-2 items-center">
          {tokenInfo.icon(2)}
          {balance}
        </div>
        <Button
          colors="secondary"
          href={`${ROUTES.MY_HOLDINGS}?action=lock_${token}`}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
