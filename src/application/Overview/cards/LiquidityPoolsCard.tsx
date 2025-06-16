import Card, { CardProps } from '@/shared/components/Card/Card';

export default function LiquidityPoolsCard(props: CardProps) {
  return (
    <Card
      {...props}
      title="Liquidity Pools"
      tooltip="A liquidity pool is a collection of cryptocurrency tokens or assets locked in a smart contract, facilitating decentralized trading and providing liquidity for users to swap tokens on decentralized exchanges. Learn more"
    >
      <div>
        You can use Aerodrome to deposit liquidity into a pool and use those LPs
        for this transaction, allowing you to earn even higher rewards. Learn
        more.
      </div>

      <table className="table-auto">
        <tr>
          <td>Klima/USDC</td>
          <td>TVL</td>
          <td>APY</td>
        </tr>
        <tr>
          <td>Klima/KlimaX</td>
          <td>TVL</td>
          <td>APY</td>
        </tr>
      </table>
    </Card>
  );
}
