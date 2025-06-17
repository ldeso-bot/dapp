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
export default async function PoolRowDesktop({ poolInfo, className }: Props) {
  return (
    <tr className={className}>
      <td>
        <Pair
          token1={tokens[poolInfo.token1]}
          token2={tokens[poolInfo.token2]}
          description={poolInfo.description}
        />
      </td>
      <td>
        <Metric label="TVL" value={formatUSD(poolInfo.tvl)} />
      </td>
      <td>
        <Metric label="APY" value={formatPercentage(poolInfo.apy)} />
      </td>
      <td>
        <div className="flex flex-row gap-3">
          <Button>Deposit Liquidity</Button>
          <Button>Lock Liquidity Tokens</Button>
        </div>
      </td>
    </tr>
  );
}
