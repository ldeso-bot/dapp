import Card, { CardProps } from '@/shared/components/Card/Card';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import clsx from 'clsx';
import Image from 'next/image';

import { Separator } from '@/shared/components/Separator/Separator';
import IdleBalanceItem from './IdleBalanceItem';
import idleBalances from './images/idleBalances.svg';

export default function IdleBalancesCard(props: CardProps) {
  const { data } = useWalletData();
  const balanceKeys = ['kvcm', 'kvcm/k2', 'kvcm/usdc', 'k2'] as const;

  return (
    <Card {...props} className={clsx('border-green', props.className)}>
      {data && (
        <div className="flex flex-col">
          <div className="pb-5">
            <div className="text-size-14">
              Heads up! You have idle balances.
            </div>
            <div className="text-size-12 text-void-60">
              These unused funds are collecting dust in your wallet. put them to
              use.
            </div>
            <Image
              src={idleBalances}
              alt="Idle Balances"
              width={232}
              height={232}
            />
          </div>
          {balanceKeys.map((key) => (
            <div key={key}>
              <Separator />
              <IdleBalanceItem
                token={key}
                balance={data.balances[key]}
              ></IdleBalanceItem>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
