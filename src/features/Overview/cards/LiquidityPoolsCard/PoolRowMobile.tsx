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
      <div className="flex flex-col">
        <Pair token={poolInfo.token} description={tokenInfo.description} />
        <div className="flex flex-row justify-between">
          <Metric label="TVL" value={formatPriceUSD(poolInfo.tvlUSD)} />
          <Metric label="APY" value={formatPercentage(poolInfo.apyYearly)} />
        </div>
        <div className="flex flex-col gap-1">
          <PoolButtons poolInfo={poolInfo} />
        </div>
      </div>
    </TableCell>
  );
}
