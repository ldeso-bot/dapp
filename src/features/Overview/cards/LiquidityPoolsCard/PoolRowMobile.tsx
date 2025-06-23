import Button from '@/shared/components/Button/Button';
import { tokens } from '@/shared/constants/tokens.constants';
import { LiquidityPoolInfo } from '@/shared/models/ProtocolData';
import { formatPercentage, formatUSD } from '@/shared/utils/string.utils';
import Metric from './Metric';
import Pair from './Pair';

type Props = {
  poolInfo: LiquidityPoolInfo;
};
export default function PoolRowMobile({ poolInfo }: Props) {
  return (
    <td>
      <div className="flex flex-col">
        <Pair
          token1={tokens[poolInfo.token1]}
          token2={tokens[poolInfo.token2]}
          description={poolInfo.description}
        />
        <div className="flex flex-row justify-between">
          <Metric label="TVL" value={formatUSD(poolInfo.tvl)} />
          <Metric label="APY" value={formatPercentage(poolInfo.apy)} />
        </div>
        <div className="flex flex-col gap-1">
          <Button>Deposit Liquidity</Button>
          <Button>Lock Liquidity Tokens</Button>
        </div>
      </div>
    </td>
  );
}
