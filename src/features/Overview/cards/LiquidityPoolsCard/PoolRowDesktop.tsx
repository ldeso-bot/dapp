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
export default function PoolRowDesktop({ poolInfo }: Props) {
  const tokenInfo = tokens[poolInfo.token];
  return (
    <>
      <TableCell>
        <Pair token={poolInfo.token} description={tokenInfo.description} />
      </TableCell>
      <TableCell>
        <Metric label="TVL" value={formatPriceUSD(poolInfo.tvlUSD)} />
      </TableCell>
      <TableCell>
        <Metric label="APY" value={formatPercentage(poolInfo.apyYearly)} />
      </TableCell>
      <TableCell>
        <div className="flex flex-row gap-3 justify-end">
          <PoolButtons poolInfo={poolInfo} />
        </div>
      </TableCell>
    </>
  );
}
