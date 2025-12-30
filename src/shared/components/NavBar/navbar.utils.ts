import { ROUTES } from '@/shared/constants/route.constants';
import { StaticImageData } from 'next/image';
import allocateIcon from './images/allocate.svg';
import burnCarbonIcon from './images/burn-carbon.svg';
import myHoldingsIcon from './images/my-holdings.svg';
import protocolOverviewIcon from './images/protocol-overview.svg';
import sellCarbonIcon from './images/sell-carbon.svg';

export type NavItem = {
  icon: StaticImageData;
  label: string;
  href: string;
  isDisabled?: boolean;
};

export const navItems: NavItem[] = [
  {
    icon: protocolOverviewIcon,
    label: 'Protocol Overview',
    href: ROUTES.OVERVIEW,
  },
  {
    icon: myHoldingsIcon,
    label: 'My Holdings',
    href: ROUTES.MY_HOLDINGS,
  },
  {
    icon: burnCarbonIcon,
    label: 'Retire',
    href: ROUTES.RETIRE,
  },
  {
    icon: sellCarbonIcon,
    label: 'Sell',
    href: ROUTES.SELL_CARBON,
  },
  {
    icon: allocateIcon,
    label: 'Allocate',
    href: ROUTES.ALLOCATE,
  },
];
