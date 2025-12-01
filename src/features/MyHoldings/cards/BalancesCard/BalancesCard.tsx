'use client';

import Card, { CardProps } from '@/shared/components/Card/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/Table/table';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { isLpToken, Token } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { cn } from '@/shared/utils/component.utils';
import {
  formatAmountWithCommas,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import {
  getTokenIcon,
  getTokenImage,
  getTokenSymbol,
} from '@/shared/utils/token.utils';
import Image from 'next/image';

export const BalancesCard = (props: CardProps) => {
  const { data } = useWalletData();
  const balances = Object.entries(data?.balances ?? {}).map(
    ([token, balance]) => ({
      asset: token,
      balance: balance.toString(),
      token: token,
      usdValue: 0.0, // TODO: Implement usd value
      deployedBalance: 0.0, // TODO: Implement deployed balance
      deployedUsdValue: 0.0, // TODO: Implement deployed usd value
      lpToken: isLpToken(token),
    })
  );

  return (
    <Card
      {...props}
      skeletonClassName="h-[63.8rem]"
      className={cn('rounded-lg border-gray-200 !shadow-none', props.className)}
    >
      <div className="flex gap-2 items-center pb-1">
        <div className="text-size-18 font-medium">Balances</div>
        <Tooltip
          className="max-w-[35rem] text-size-12 p-3"
          content="Your wallet and deployed balances across all positions. Wallet shows tokens available to deploy; Deployed shows tokens currently locked or staked."
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/8 text-left border-b border-gray-200 py-2">
              Asset
            </TableHead>
            <TableHead className="text-right border-b border-gray-200 py-2">
              Wallet
            </TableHead>
            <TableHead className="text-right border-b border-gray-200 py-2">
              Deployed
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody borders="between">
          {balances?.map((balance) => (
            <TableRow className="!border-gray-200" key={balance.asset}>
              <TableCell>
                <div className="flex flex-row gap-3 items-center">
                  {balance.lpToken ? (
                    getTokenIcon(balance.token.toLowerCase() as Token, 3.2)
                  ) : (
                    <div className="w-8 h-8 bg-black rounded-full overflow-hidden">
                      <Image
                        alt={balance.token}
                        src={
                          getTokenImage(balance.token.toLowerCase() as Token)
                            .src
                        }
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  )}
                  {getTokenSymbol(balance.token as Token)}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col justify-end gap-1">
                  <div className="text-size-14 font-normal">
                    {formatAmountWithCommas(Number(balance.balance))}{' '}
                    <small className="text-size-12 text-void-60">
                      ({getTokenSymbol(balance.token as Token)})
                    </small>
                  </div>
                  <div className="text-size-12 text-void-60">
                    {formatPriceUSDWithCommas(balance.usdValue)}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col justify-end gap-1">
                  <div className="text-size-14 font-normal">
                    {formatAmountWithCommas(Number(balance.deployedBalance))}{' '}
                    <small className="text-size-12 text-void-60">
                      ({getTokenSymbol(balance.token as Token)})
                    </small>
                  </div>
                  <div className="text-size-12 text-void-60">
                    {formatPriceUSDWithCommas(balance.deployedUsdValue)}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
