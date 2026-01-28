'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/Select/Select';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useContractInfo } from '@/shared/hooks/web3/useContract';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useK2StakeK2Position } from '../K2View/hooks/useK2StakeK2Position';
import { useK2StakeRYPosition } from '../K2View/hooks/useK2StakeRYPosition';
import { useUnclaimedK2YRewards } from '../LiquidityPositionsView/hooks/useUnclaimedK2YRewards';
import { useUnclaimedRYRewards } from '../LiquidityPositionsView/hooks/useUnclaimedRYRewards';

// Hook to get LP token addresses using useContractInfo

/** TODO: This view is an helper to test claiming locks created on a local fork */
export const TestView = () => {
  const account = useAccount();
  const [selectedToken, setSelectedToken] = useState<string>('');
  const [maturityId, setMaturityId] = useState<string>('');

  // Get LP token addresses using useContractInfo
  const { address: kvcmUsdcAddress } = useContractInfo('KVCM_USDC');
  const { address: kvcmK2Address } = useContractInfo('KVCM_K2');

  // Get protocol data for maturities
  const { data: protocolData } = useProtocolData();
  const maturities = protocolData?.maturities ?? [];

  const {
    data: yieldPosition,
    isLoading,
    isError,
    error,
  } = useK2StakeK2Position();

  const {
    data: ryPosition,
    isLoading: isRyLoading,
    isError: isRyError,
    error: ryError,
  } = useK2StakeRYPosition();

  const parsedMaturityId = maturityId ? BigInt(maturityId) : 0n;

  // Format maturity date for display
  const formatMaturityDate = (timestamp: number): string => {
    const dateObj = new Date(timestamp * 1000);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  const selectedLpTokenAddress =
    selectedToken === 'KVCM_USDC'
      ? kvcmUsdcAddress
      : selectedToken === 'KVCM_K2'
        ? kvcmK2Address
        : undefined;

  const {
    data: unclaimedK2YRewards,
    isLoading: isK2YLoading,
    isError: isK2YError,
    error: k2YError,
  } = useUnclaimedK2YRewards(
    selectedLpTokenAddress || '0x0000000000000000000000000000000000000000',
    parsedMaturityId
  );

  const {
    data: unclaimedRYRewards,
    isLoading: isRYLoading,
    isError: isRYError,
    error: ryRewardsError,
  } = useUnclaimedRYRewards(
    selectedLpTokenAddress || '0x0000000000000000000000000000000000000000',
    parsedMaturityId
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">K2 Stakers Yield Position Test</h2>

      {account.isConnected ? (
        <div className="space-y-2">
          <p>
            <strong>Connected Address:</strong> {account.address}
          </p>

          {(isLoading || isRyLoading) && <p>Loading positions...</p>}

          {isError && error && (
            <p className="text-red-500">
              Error loading K2 position: {error.message}
            </p>
          )}

          {isRyError && ryError && (
            <p className="text-red-500">
              Error loading RY position: {ryError.message}
            </p>
          )}

          {yieldPosition && (
            <div className="border rounded p-4 space-y-2">
              <h3 className="text-lg font-semibold">
                K2 Stakers Yield Position
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <strong>Shares:</strong>{' '}
                  {formatAmountWithCommas(Number(yieldPosition.shares) / 1e18)}{' '}
                  - {yieldPosition.shares}
                </div>
                <div>
                  <strong>Pending Yield:</strong>{' '}
                  {formatAmountWithCommas(
                    Number(yieldPosition.pendingYield) / 1e18
                  )}{' '}
                  K2 - {yieldPosition.pendingYield}
                </div>
                <div>
                  <strong>Claimable Yield:</strong>{' '}
                  {formatAmountWithCommas(
                    Number(yieldPosition.claimableYield) / 1e18
                  )}{' '}
                  K2 - {yieldPosition.claimableYield}
                </div>
              </div>
            </div>
          )}

          {ryPosition && (
            <div className="border rounded p-4 space-y-2">
              <h3 className="text-lg font-semibold">K2 Stakers RY Position</h3>
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <strong>Shares:</strong>{' '}
                  {formatAmountWithCommas(Number(ryPosition.shares) / 1e18)} -{' '}
                  {ryPosition.shares}
                </div>
                <div>
                  <strong>Pending Yield:</strong>{' '}
                  {formatAmountWithCommas(
                    Number(ryPosition.pendingYield) / 1e18
                  )}{' '}
                  KVCM - {ryPosition.pendingYield}
                </div>
                <div>
                  <strong>Claimable Yield:</strong>{' '}
                  {formatAmountWithCommas(
                    Number(ryPosition.claimableYield) / 1e18
                  )}{' '}
                  KVCM - {ryPosition.claimableYield}
                </div>
              </div>
            </div>
          )}

          {/* Unclaimed Rewards Form */}
          <div className="border rounded p-4 space-y-4 mt-8">
            <h3 className="text-lg font-semibold">Test Unclaimed Rewards</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  LP Token
                </label>
                <Select value={selectedToken} onValueChange={setSelectedToken}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select LP token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KVCM_USDC">KVCM_USDC</SelectItem>
                    <SelectItem value="KVCM_K2">KVCM_K2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Maturity
                </label>
                <Select value={maturityId} onValueChange={setMaturityId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select maturity" />
                  </SelectTrigger>
                  <SelectContent>
                    {maturities.map((maturity) => (
                      <SelectItem
                        key={maturity.maturityId}
                        value={maturity.maturityId.toString()}
                      >
                        {formatMaturityDate(maturity.maturationTimestamp)} (ID:{' '}
                        {maturity.maturityId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* K2Y Rewards */}
            <div className="border-t pt-4">
              <h4 className="text-md font-semibold mb-2">
                Unclaimed K2Y Rewards
              </h4>
              {isK2YLoading && <p>Loading K2Y rewards...</p>}
              {isK2YError && k2YError && (
                <p className="text-red-500">
                  Error loading K2Y rewards: {k2YError.message}
                </p>
              )}
              {unclaimedK2YRewards !== undefined &&
                !isK2YLoading &&
                !isK2YError && (
                  <p>
                    <strong>Unclaimed K2Y Rewards:</strong>{' '}
                    {formatAmountWithCommas(Number(unclaimedK2YRewards) / 1e18)}{' '}
                    K2 - {unclaimedK2YRewards}
                  </p>
                )}
            </div>

            {/* RY Rewards */}
            <div className="border-t pt-4">
              <h4 className="text-md font-semibold mb-2">
                Unclaimed RY Rewards
              </h4>
              {isRYLoading && <p>Loading RY rewards...</p>}
              {isRYError && ryRewardsError && (
                <p className="text-red-500">
                  Error loading RY rewards: {ryRewardsError.message}
                </p>
              )}
              {unclaimedRYRewards !== undefined &&
                !isRYLoading &&
                !isRYError && (
                  <p>
                    <strong>Unclaimed RY Rewards:</strong>{' '}
                    {formatAmountWithCommas(Number(unclaimedRYRewards) / 1e18)}{' '}
                    RY - {unclaimedRYRewards}
                  </p>
                )}
            </div>
          </div>
        </div>
      ) : (
        <p>Please connect your wallet to view yield position data.</p>
      )}
    </div>
  );
};
