import { useContractInfo } from '@/shared/hooks/web3/useContract';
import { CouponBurnParams } from '@/shared/models/shared';
import AAMDiamond from '@/shared/utils/abis/AAMDiamond';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useReadContract } from 'wagmi';

export const useSellCarbonQuoter = ({
  carbonClass,
  tokenAddress,
  tokenId,
  amountToSellWei,
  maturityId,
  couponBurnParams,
}: {
  carbonClass: string;
  tokenAddress: string;
  tokenId: number;
  amountToSellWei: bigint; // Amount in blockchain units
  maturityId: number;
  couponBurnParams: CouponBurnParams;
}) => {
  const contractInfo = useContractInfo('AAMDiamond');
  const [quoteWei, setQuoteWei] = useState<bigint>(BigInt(0));

  const args = [
    carbonClass as Address, // TODO: Typecasting is bad
    tokenAddress as Address,
    BigInt(tokenId),
    amountToSellWei,
    BigInt(maturityId),
    {
      tonnes: BigInt(couponBurnParams.tonnes),
      from: couponBurnParams.from as Address,
    },
  ] as const;

  const res = useReadContract({
    address: contractInfo?.address,
    abi: AAMDiamond,
    functionName: 'getSwapQuote',
    args,
    query: {
      staleTime: 0,
      enabled: !!carbonClass && !!tokenAddress,
    },
  });

  useEffect(() => {
    if (amountToSellWei === BigInt(0)) {
      setQuoteWei(BigInt(0));
      return;
    }
    if (res.isLoading) {
      return;
    }
    if (!res.data) {
      setQuoteWei(BigInt(0));
      return;
    }
    const quoteWei = res.data[1];

    setQuoteWei(quoteWei);
  }, [res, amountToSellWei]);

  return {
    ...res,
    data: quoteWei,
  };
};
