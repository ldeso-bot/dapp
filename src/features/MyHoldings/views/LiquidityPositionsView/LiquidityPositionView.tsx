'use client';

import { useHasPreviouslyConnected } from '@/shared/hooks/useHasPreviouslyConnected';
import { useAccount } from 'wagmi';
import { InfoCard } from '../../shared/InfoCard';
import { LiquidityPositionCard } from './LiquidityPositionCard';
import { LiquidityPositionOnboarding } from './LiquidityPositionOnboarding';

export const LiquidityPositionsView = () => {
  const account = useAccount();
  const { hasPreviouslyConnected } = useHasPreviouslyConnected();
  
  return (
    <>
      {!account.isConnected && !hasPreviouslyConnected ? (
        <LiquidityPositionOnboarding />
      ) : (
        <div className="flex flex-col gap-4">
          <InfoCard
            title="Liquidity Positions"
            tooltipId="liquidity-positions"
            description="Deposit liquidity to earn trading fees. Stake your LP in Klima for a fixed term to earn an additional share of kVCM incentives, plus K2 incentives. Unstake when your term ends."
            content={
              <div className="flex flex-col gap-4">
                <LiquidityPositionCard token="kvcm-usdc" />
                <LiquidityPositionCard token="kvcm-k2" />
              </div>
            }
          />
        </div>
      )}
    </>
  );
};
