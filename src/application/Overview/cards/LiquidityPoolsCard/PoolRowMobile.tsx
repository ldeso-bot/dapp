import Button from '@/shared/components/Button/Button';
import { tokens } from '@/shared/constants/tokens.constants';
import { LiquidityPoolInfo } from '@/shared/dal/subgraph/getLiquidityPools';
import { formatPercentage, formatUSD } from '@/shared/utils/string.utils';
import Metric from './Metric';
import Pair from './Pair';

type Props = {
  poolInfo: LiquidityPoolInfo;
  className: string;
};
export default async function PoolRowMobile({ poolInfo, className }: Props) {
  return (
    <tr className={className}>
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
    </tr>
  );
}
