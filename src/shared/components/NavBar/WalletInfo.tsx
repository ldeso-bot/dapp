'use client';

import { DEV_MODE } from '@/shared/constants/config.constants';
import { cn } from '@/shared/utils/component.utils';
import { formatAddress } from '@/shared/utils/string.utils';
import { base, baseSepolia } from 'viem/chains';
import { useAccount, useSwitchChain } from 'wagmi';
import { Separator } from '../Separator/Separator';

export default function WalletInfo() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const chainText =
    chain === baseSepolia
      ? 'Connected to testnet'
      : chain === base
        ? 'Connected to mainnet'
        : 'Unsupported chain. Please switch to Base.';

  const handleSwitchChain = () => {
    switchChain({ chainId: chain === base ? baseSepolia.id : base.id });
  };

  if (!address) return null;

  return (
    <div>
      <Separator />
      <div className="py-5">
        <div>My Wallet Address:</div>
        <div className="text-void-40">{`${formatAddress(address)}`}</div>
        {DEV_MODE && (
          <div
            className={cn(
              'text-void-40 text-size-12',
              DEV_MODE ? 'cursor-pointer' : ''
            )}
            onClick={handleSwitchChain}
          >
            {chainText}
          </div>
        )}
      </div>
      <Separator />
    </div>
  );
}
