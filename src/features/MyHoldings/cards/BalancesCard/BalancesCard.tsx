'use client';

import { useHoldingsData } from '@/features/MyHoldings/hooks/useHoldingsData';
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
import { Token } from '@/shared/constants/tokens.constants';
import { useTokenBalances } from '@/shared/hooks/useTokenBalances';
import { cn } from '@/shared/utils/component.utils';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import {
  getTokenIcon,
  getTokenImage,
  getTokenSymbol,
} from '@/shared/utils/token.utils';
import Image from 'next/image';

export const BalancesCard = (props: CardProps) => {
  const tokenBalances = useTokenBalances();
  const { data: holdingsData } = useHoldingsData();

  return (
    <Card
      {...props}
      skeletonClassName="h-[41.8rem]"
      className={cn('rounded-lg border-gray-200 !shadow-none', props.className)}
    >
      {holdingsData && (
        <>
          <div className="flex gap-2 items-center pb-1">
            <div className="text-size-18 font-medium">Balances</div>
            <Tooltip
              className="max-w-[35rem] text-size-12 p-3"
              content="Balances across all protocol activities. Wallet shows unallocated assets."
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
              {tokenBalances?.map((balance) => (
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
                              getTokenImage(
                                balance.token.toLowerCase() as Token
                              ).src
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
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col justify-end gap-1">
                      <div className="text-size-14 font-normal">
                        {formatAmountWithCommas(
                          Number(balance.deployedBalance)
                        )}{' '}
                        <small className="text-size-12 text-void-60">
                          ({getTokenSymbol(balance.token as Token)})
                        </small>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Card>
  );
};
