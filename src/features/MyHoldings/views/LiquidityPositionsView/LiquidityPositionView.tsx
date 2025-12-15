'use client';

import { LiquidityPositionCard } from './LiquidityPositionCard';
import { InfoCard } from '@/features/MyHoldings/shared/InfoCard';

export const LiquidityPositionsView = () => {
  return (
    <div className="flex flex-col gap-4">
      <InfoCard
        title="Liquidity Positions"
        tooltipId="liquidity-positions"
        description="Deposit liquidity to earn trading fees. Stake your LP in Klima for a fixed term to earn an additional share of kVCM yield, plus K2 incentives. Unstake when your term ends."
        content={
          <div className="flex flex-col gap-4">
            <LiquidityPositionCard token="kvcm-usdc" />
            <LiquidityPositionCard token="kvcm-k2" />
          </div>
        }
      />
    </div>
  );
}


