import Card, { CardProps } from '@/shared/components/Card/Card';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import PoolRowDesktop from './PoolRowDesktop';
import PoolRowMobile from './PoolRowMobile';

export default function LiquidityPoolsCard(props: CardProps) {
  const { data } = useProtocolData();

  return (
    <Card
      {...props}
      title="Liquidity Pools"
      tooltip="A liquidity pool is a collection of cryptocurrency tokens or assets locked in a smart contract, facilitating decentralized trading and providing liquidity for users to swap tokens on decentralized exchanges. Learn more"
      skeletonClassName="h-[178px]"
    >
      {data && (
        <>
          <div>
            You can use Aerodrome to deposit liquidity into a pool and use those
            LPs for this transaction, allowing you to earn even higher rewards.
            Learn more.
          </div>

          <table className="table table-auto">
            <tbody>
              {data.liquidityPools.map((poolInfo) => (
                <tr className="hidden lg:table-row" key={`${poolInfo.id}`}>
                  <PoolRowDesktop poolInfo={poolInfo} />
                </tr>
              ))}
              {data.liquidityPools.map((poolInfo) => (
                <tr className="lg:hidden" key={`${poolInfo.id}`}>
                  <PoolRowMobile poolInfo={poolInfo} />
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Card>
  );
}
