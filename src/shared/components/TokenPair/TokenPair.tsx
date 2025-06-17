import { TokenInfo } from '@/shared/constants/tokens.constants';
import Image from 'next/image';

type Props = {
  token1: TokenInfo;
  token2: TokenInfo;
  size?: number;
};

export default async function TokenPair({ token1, token2, size = 32 }: Props) {
  return (
    <div className="flex flex-row">
      <Image
        src={token1.icon}
        alt={token1.symbol}
        width={size}
        height={size}
        className="-mr-3"
      />
      <Image src={token2.icon} alt={token2.symbol} width={size} height={size} />
    </div>
  );
}
