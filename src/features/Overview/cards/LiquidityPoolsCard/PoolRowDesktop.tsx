import { TableCell } from '@/shared/components/Table/table';
import { LiquidityPoolInfo } from '@/shared/models/ProtocolData';
import { formatPercentage, formatPriceUSD } from '@/shared/utils/string.utils';
import Metric from './Metric';
import Pair from './Pair';
import PoolButtons from './PoolButtons';

type Props = {
  poolInfo: LiquidityPoolInfo;
};
export default function PoolRowDesktop({ poolInfo }: Props) {
  return (
    <>
      <TableCell>
        <Pair token={poolInfo.token} description={poolInfo.description} />
      </TableCell>
      <TableCell>
        <Metric label="TVL" value={formatPriceUSD(poolInfo.tvl)} />
      </TableCell>
      <TableCell>
        <Metric label="APY" value={formatPercentage(poolInfo.apyPercent)} />
      </TableCell>
      <TableCell>
        <div className="flex flex-row gap-3 justify-end">
          <PoolButtons poolInfo={poolInfo} />
        </div>
      </TableCell>
    </>
  );
}
