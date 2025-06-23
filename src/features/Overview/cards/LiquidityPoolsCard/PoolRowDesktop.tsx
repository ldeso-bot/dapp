import Button from '@/shared/components/Button/Button';
import { tokens } from '@/shared/constants/tokens.constants';
import { LiquidityPoolInfo } from '@/shared/models/ProtocolData';
import { formatPercentage, formatUSD } from '@/shared/utils/string.utils';
import Metric from './Metric';
import Pair from './Pair';

type Props = {
  poolInfo: LiquidityPoolInfo;
};
export default function PoolRowDesktop({ poolInfo }: Props) {
  return (
    <>
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
    </>
  );
}
