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
      tooltip="A liquidity pool is a pair of tokens in a smart contract, facilitating decentralized trading and providing liquidity for users to swap tokens on decentralized exchanges."
      skeletonClassName="h-[17.8rem]"
      className="rounded-xl"
    >
      {data && (
        <>
          <ChartFact label="TVL" value={formatPriceUSD(marketValue)} />
          <div>
            Users may opt to provide liquidity to support Klima’s infrastructure
            and facilitate carbon execution. Doing so may make participants
            eligible for programmatic protocol incentives.
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
