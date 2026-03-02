import { GetCreditTokensQuery } from '@generated/gql/types/carbon.types';
import {
  GetAllocationsQuery,
  GetLatestMidnightInfoQuery,
  GetLocksQuery,
} from '@generated/gql/types/protocol.types';

export type SDKLock = NonNullable<GetLocksQuery['locks']>[number];
export type SDKLockAction = NonNullable<SDKLock['lockActions']>[number];
export type SDKMidnightInfo = NonNullable<
  GetLatestMidnightInfoQuery['midnightInfos']
>[number];

export type SDKCreditToken = NonNullable<
  GetCreditTokensQuery['creditTokens']
>[number];
export type SDKAllocation = NonNullable<
  GetAllocationsQuery['allocations']
>[number];
