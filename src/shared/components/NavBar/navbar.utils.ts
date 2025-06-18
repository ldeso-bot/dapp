import { StaticImageData } from 'next/image';
import allocateIcon from './images/allocate.svg';
import burnCarbonIcon from './images/burn-carbon.svg';
import carbonUniversityIcon from './images/carbon-university.svg';
import myHoldingsIcon from './images/my-holdings.svg';
import protocolOverviewIcon from './images/protocol-overview.svg';
import sellCarbonIcon from './images/sell-carbon.svg';

type NavItem = {
  icon: StaticImageData;
  label: string;
  href: string;
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
    label: 'Burn Carbon',
    href: '/burn-carbon',
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
  },
  {
    icon: carbonUniversityIcon,
    label: 'Carbon University',
    href: '/carbon-university',
  },
];
