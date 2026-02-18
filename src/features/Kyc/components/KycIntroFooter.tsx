'use client';

import Button from '@/shared/components/Button/Button';
import { ROUTES } from '@/shared/constants/route.constants';
import Link from 'next/link';

type Props = {
  onContinue: () => void;
  acknowledged: boolean;
};

export const KycIntroFooter = ({ onContinue, acknowledged }: Props) => (
  <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-100">
    <Link
      href={ROUTES.TERMS}
      className="text-size-14 underline min-h-[44px] flex items-center hover:opacity-80 transition-opacity text-gray-600"
    >
      Full privacy notice
    </Link>
    <Button
      colors="secondary"
      context="flow"
      className="rounded-md py-2 px-6 h-11 w-40 shrink-0"
      onClick={onContinue}
      disabled={!acknowledged}
    >
      Continue
    </Button>
  </div>
);
