'use client';
import cardStyles from '@/shared/css/card.module.css';

import { formatAddress } from '@/shared/dal/web3/web3.utils';
import { useAccount } from 'wagmi';

export default function WalletInfo() {
  const { address } = useAccount();
  if (!address) return null;

  return (
    <>
      <div className={cardStyles.separator} />
      <div>
        <div>My Wallet Address:</div>
        <div className="text-void-40">{`${formatAddress(address)}`}</div>
      </div>
    </>
  );
}
