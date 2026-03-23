'use client';

import { useHoldingsData } from '@/features/MyActivities/hooks/useHoldingsData';
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
import { useMemo, useState } from 'react';

type MobileView = 'wallet' | 'deployed';

export const BalancesCard = (props: CardProps) => {
  const tokenBalances = useTokenBalances();
  const { data: holdingsData } = useHoldingsData();

  const [mobileView, setMobileView] = useState<MobileView>('wallet');

  const rows = useMemo(() => tokenBalances ?? [], [tokenBalances]);

  return (
    <Card
      {...props}
      skeletonClassName="h-[41.8rem]"
      className={cn(
        'rounded-lg border-border-default !shadow-none',
        props.className
      )}
    >
      {holdingsData && (
        <>
          <div className="flex gap-2 items-center pb-1">
            <div className="text-size-18 font-medium">Balances [t306]</div>
            <Tooltip
              content={
                <div className="flex flex-col gap-4">
                  <div className="text-text-static-light">
                    Balances across all protocol activities. [t307]
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-surface-3" />
                      <div>
                        <div className="font-semibold">Wallet [t308]</div>
                        <div className="text-text-static-light text-size-11">
                          Unallocated assets in your wallet, not eligible for
                          incentives. [t309]
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-green-400" />
                      <div>
                        <div className="font-semibold">Deployed [t310]</div>
                        <div className="text-text-static-light text-size-11">
                          Assets allocated in Klima Protocol, eligible for
                          incentives. [t311]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>

          {/* Mobile layout */}
          <div className="md:hidden">
            <div className="flex w-full gap-2 py-2">
              <button
                type="button"
                onClick={() => setMobileView('wallet')}
                className={cn(
                  'flex-1 rounded-md border px-3 py-2 text-size-12',
                  mobileView === 'wallet'
                    ? 'border-border-default bg-surface-2 font-medium'
                    : 'border-border-subtle bg-surface-1 text-text-3'
                )}
              >
                Wallet [t312]
              </button>
              <button
                type="button"
                onClick={() => setMobileView('deployed')}
                className={cn(
                  'flex-1 rounded-md border px-3 py-2 text-size-12',
                  mobileView === 'deployed'
                    ? 'border-border-default bg-surface-2 font-medium'
                    : 'border-border-subtle bg-surface-1 text-text-3'
                )}
              >
                Deployed [t313]
              </button>
            </div>

            <div className="mt-2 flex flex-col divide-y divide-gray-200 border-y border-border-subtle">
              {rows.map((balance) => {
                const symbol = getTokenSymbol(balance.token as Token);
                const value =
                  mobileView === 'wallet'
                    ? Number(balance.balance)
                    : Number(balance.deployedBalance);

                const formatted = formatAmountWithCommas(
                  value,
                  balance.longDecimals
                );

                return (
                  <div
                    key={balance.asset}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      {balance.lpToken ? (
                        getTokenIcon(balance.token.toLowerCase() as Token, 3.2)
                      ) : (
                        <div className="w-8 h-8 bg-black rounded-full overflow-hidden shrink-0">
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
                      <div className="min-w-0">
                        <div className="text-size-14 font-medium truncate">
                          {symbol}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <Tooltip
                        className="max-w-[35rem] text-size-12 p-3"
                        content={`${formatted} (${symbol})`}
                        trigger={
                          <div className="cursor-help">
                            <div className="text-size-14 font-normal tabular-nums">
                              {formatted}
                            </div>
                          </div>
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block w-full">
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-2/8 text-left border-b border-border-subtle py-2">
                    Asset [t314]
                  </TableHead>
                  <TableHead className="text-right border-b border-border-subtle py-2">
                    Wallet [t315]
                  </TableHead>
                  <TableHead className="text-right border-b border-border-subtle py-2">
                    Deployed [t316]
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody borders="between">
                {rows.map((balance) => (
                  <TableRow
                    className="!border-border-subtle"
                    key={balance.asset}
                  >
                    <TableCell>
                      <div className="flex flex-row gap-3 items-center">
                        {balance.lpToken ? (
                          getTokenIcon(
                            balance.token.toLowerCase() as Token,
                            3.2
                          )
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
                      <div className="text-size-14 font-normal">
                        {formatAmountWithCommas(
                          Number(balance.balance),
                          'auto'
                        )}{' '}
                        <small className="text-size-12 text-text-3">
                          ({getTokenSymbol(balance.token as Token)})
                        </small>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-size-14 font-normal">
                        {formatAmountWithCommas(
                          Number(balance.deployedBalance),
                          'auto'
                        )}{' '}
                        <small className="text-size-12 text-text-3">
                          ({getTokenSymbol(balance.token as Token)})
                        </small>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </Card>
  );
};
