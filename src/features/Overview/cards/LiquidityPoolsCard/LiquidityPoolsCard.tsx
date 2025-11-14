import Card, { CardProps } from '@/shared/components/Card/Card';
import ChartFact from '@/shared/components/ChartFact/ChartFact';
import { Table, TableBody, TableRow } from '@/shared/components/Table/table';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { formatPriceUSD } from '@/shared/utils/string.utils';
import PoolRowDesktop from './PoolRowDesktop';
import PoolRowMobile from './PoolRowMobile';

export default function LiquidityPoolsCard(props: CardProps) {
  const { data } = useProtocolData();
  const marketValue =
    data?.liquidityPools.reduce((acc, pool) => acc + pool.tvlUSD, 0) ?? 0;

  return (
    <Card
      {...props}
      title="Liquidity Pools"
      tooltip="A liquidity pool is a pair of tokens in a smart contract, facilitating decentralized trading and providing liquidity for users to swap tokens on decentralized exchanges. Learn more"
      skeletonClassName="h-[17.8rem]"
    >
      {data && (
        <>
          <ChartFact label="Market value" value={formatPriceUSD(marketValue)} />
          <div>
            You can use Aerodrome to deposit liquidity into a pool and use those
            LPs for this transaction, allowing you to earn even higher rewards.
            Learn more.
          </div>

          <Table>
            <TableBody>
              {data.liquidityPools.map((poolInfo) => (
                <TableRow
                  className="hidden lg:table-row"
                  key={`${poolInfo.token}`}
                >
                  <PoolRowDesktop poolInfo={poolInfo} />
                </TableRow>
              ))}
              {data.liquidityPools.map((poolInfo) => (
                <TableRow className="lg:hidden" key={`${poolInfo.token}`}>
                  <PoolRowMobile poolInfo={poolInfo} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Card>
  );
}
