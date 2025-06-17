'use client';

import { formatAddress } from '@/shared/utils/string.utils';
import { base, baseSepolia } from 'viem/chains';
import { useAccount, useSwitchChain } from 'wagmi';
import ClientOnly from '../ClientOnly/ClientOnly';
import { Separator } from '../Separator/Separator';

export default function WalletInfo() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const chainText =
    chain == baseSepolia
      ? 'Testnet'
      : chain == base
        ? ''
        : 'Unsupported chain. Please switch to Base.';

  const doSwitchChain = () => {
    switchChain({ chainId: base.id });
  };

  return (
    <ClientOnly>
      {address && (
        <>
          <div>
            <div>My Wallet Address:</div>
            <div className="text-void-40">{`${formatAddress(address)}`}</div>
            <div
              className="text-void-40 text-sm text-red cursor-pointer"
              onClick={doSwitchChain}
            >
              {chainText}
            </div>
          </div>

          <Separator />
        </>
      )}
    </ClientOnly>
  );
}
