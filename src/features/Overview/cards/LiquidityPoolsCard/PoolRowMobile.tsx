import { TableCell } from '@/shared/components/Table/table';
import { tokens } from '@/shared/constants/tokens.constants';
import { LiquidityPoolInfo } from '@/shared/models/ProtocolData';
import { formatPercentage, formatPriceUSD } from '@/shared/utils/string.utils';
import Metric from './Metric';
import Pair from './Pair';
import PoolButtons from './PoolButtons';

type Props = {
  poolInfo: LiquidityPoolInfo;
};

export default function PoolRowMobile({ poolInfo }: Props) {
  const tokenInfo = tokens[poolInfo.token];

  return (
    <TableCell>
      <div className="rounded-2xl bg-void-2/40 p-3 ring-1 ring-void-6/30">
        <div className="flex flex-col gap-3">
          {/* Top: token pair */}
          <Pair token={poolInfo.token} description={tokenInfo.description} />
          {/* Middle: TVL/APY metrics */}
          <div className="flex items-baseline justify-between">
            <Metric label="TVL" value={formatPriceUSD(poolInfo.tvlUSD)} />
            <Metric label="APY" value={formatPercentage(poolInfo.apyYearly)} />
          </div>
          {/* Bottom: deposit/stake buttons */}
          <div className="flex gap-2">
            <div className="flex-1">
              <PoolButtons poolInfo={poolInfo} />
            </div>
          </div>
        </div>
      </div>
    </TableCell>
  );
}
