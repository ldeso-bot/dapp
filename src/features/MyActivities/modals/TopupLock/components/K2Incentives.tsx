'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/Accordion/Accordion';
import { LockableToken } from '@/shared/constants/tokens.constants';
import { type FC } from 'react';

type K2IncentivesProps = {
  k2Incentives: number;
  token: LockableToken;
};

export const K2Incentives: FC<K2IncentivesProps> = (props) => {
  const { k2Incentives, token } = props;

  return (
    <Accordion
      collapsible
      type="single"
      className="rounded-lg bg-surface-2 border border-border-subtle"
    >
      <AccordionItem value="locks">
        <AccordionTrigger
          iconSide="right"
          className="px-4 hover:no-underline flex items-center justify-start rounded-none gap-1"
        >
          <div className="flex items-center gap-2">
            <div className="text-size-14 text-text-1 font-[400]">
              K2 incentives (variable)
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="border-t border-border-subtle px-4 py-3">
          <div className="flex flex-col gap-3">
            <div className="text-size-14 text-text-1">
              ~ {k2Incentives} K2 / kVCM / epoch
            </div>
            <p className="text-size-12 text-text-3">
              Indicative rate of K2 incentives earned by your time-locked{' '}
              {token}. These amounts are are variable, non-guaranteed, and may
              be zero.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
