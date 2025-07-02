import { StaticImageData } from 'next/image';
import allocateIcon from './images/allocate.svg';
import burnCarbonIcon from './images/burn-carbon.svg';
import carbonUniversityIcon from './images/carbon-university.svg';
import myHoldingsIcon from './images/my-holdings.svg';
import protocolOverviewIcon from './images/protocol-overview.svg';
import sellCarbonIcon from './images/sell-carbon.svg';

export type NavItem = {
  icon: StaticImageData;
  label: string;
  href: string;
  isAdvanced?: boolean;
};

export const navItems: NavItem[] = [
  {
    icon: protocolOverviewIcon,
    label: 'Protocol Overview',
    href: '/protocol-overview',
  },
  {
    icon: myHoldingsIcon,
    label: 'My Holdings',
    href: '/my-holdings',
  },
  {
    icon: burnCarbonIcon,
    label: 'Retire',
    href: '/retire',
  },
  {
    icon: sellCarbonIcon,
    label: 'Sell Carbon',
    href: '/sell-carbon',
  },
  {
    icon: allocateIcon,
    label: 'Allocate',
    href: '/allocate',
    isAdvanced: true,
  },
  {
    icon: carbonUniversityIcon,
    label: 'Carbon University',
    href: '/carbon-university',
  },
];
