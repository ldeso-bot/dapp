'use client';

import Input from '@/shared/components/Form/Input';
import { useContractInfo } from '@/shared/hooks/web3/useContract';
import { CouponBurnParams } from '@/shared/models/shared';
import AAMDiamond from '@/shared/utils/abis/AAMDiamond.json';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useReadContract } from 'wagmi';
import { SellCarbonFields } from '../sellCarbon.constants';

const SellCarbonQuoter: React.FC<{
  form: UseFormReturn<SellCarbonFields>;
  carbonClass: string;
  address: string;
  tokenId: number;
  amount: bigint; // Amount in blockchian units
  maturityId: number;
  couponBurnParams: CouponBurnParams;
}> = ({
  carbonClass,
  address,
  tokenId,
  amount,
  maturityId,
  couponBurnParams,
  form,
}) => {
  const contractInfo = useContractInfo('AAMDiamond');

  const args = [
    carbonClass,
    address,
    tokenId,
    amount,
    maturityId,
    [couponBurnParams.tonnes, couponBurnParams.from],
  ];

  const res = useReadContract({
    address: contractInfo?.address,
    abi: AAMDiamond,
    functionName: 'getSwapQuote',
    args,
    query: {
      staleTime: 0,
    },
  });

  const amountReceived = form.watch('amountReceived');

  /* TODO: Remove this when quoter works */
  useEffect(() => {
    form.setValue('amountReceived', Math.random() * 100);
  }, [res.data, form]);

  return (
    <Input
      className="h-[4rem] pointer-events-none"
      label="Receive"
      placeholder="Select a token first"
      readOnly
      value={amountReceived}
    />
  );
};

export default SellCarbonQuoter;
