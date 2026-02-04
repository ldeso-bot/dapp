import { ArrowForwardIcon } from '@/shared/components/Svg/ArrowForwardIcon';
import { ROUTES } from '@/shared/constants/route.constants';
import Link from 'next/link';

export const LearnMoreLink = () => (
  <Link
    className="flex items-center justify-center gap-1 text-gray-600 hover:text-[#00994a] transition-colors duration-300"
    href={`${ROUTES.MY_ACTIVITIES}?activeTab=overview`}
  >
    New to Klima? Learn how it all works
    <ArrowForwardIcon className="w-4 h- fill-current hover:fill-[#00994a]" />
  </Link>
);
