import { ROUTES } from '@/shared/constants/route.constants';
import { StaticImageData } from 'next/image';

import allocateDarkIcon from './images/allocate-dark.svg';
import allocateLightIcon from './images/allocate-light.svg';

import burnCarbonDarkIcon from './images/burn-carbon-dark.svg';
import burnCarbonLightIcon from './images/burn-carbon-light.svg';

import myHoldingsDarkIcon from './images/my-holdings-dark.svg';
import myHoldingsLightIcon from './images/my-holdings-light.svg';

import protocolOverviewDarkIcon from './images/protocol-overview-dark.svg';
import protocolOverviewLightIcon from './images/protocol-overview-light.svg';

import sellCarbonDarkIcon from './images/sell-carbon-dark.svg';
import sellCarbonLightIcon from './images/sell-carbon-light.svg';

export type NavItem = {
  icon: {
    light: StaticImageData;
    dark: StaticImageData;
  };
  label: string;
  href: string;
  isDisabled?: boolean;
};

export const navItems: NavItem[] = [
  {
    icon: {
      light: protocolOverviewDarkIcon,
      dark: protocolOverviewLightIcon,
    },
    label: 'Protocol Overview [t386]',
    href: ROUTES.OVERVIEW,
  },
  {
    icon: {
      light: myHoldingsDarkIcon,
      dark: myHoldingsLightIcon,
    },
    label: 'My Activities [t387]',
    href: ROUTES.MY_ACTIVITIES,
  },
  {
    icon: {
      light: burnCarbonDarkIcon,
      dark: burnCarbonLightIcon,
    },
    label: 'Retire Carbon [t388]',
    href: ROUTES.RETIRE,
  },
  {
    icon: {
      light: sellCarbonDarkIcon,
      dark: sellCarbonLightIcon,
    },
    label: 'Supply Carbon [t389]',
    href: ROUTES.SELL_CARBON,
  },
  {
    icon: {
      light: allocateDarkIcon,
      dark: allocateLightIcon,
    },
    label: 'Allocate [t390]',
    href: ROUTES.ALLOCATE,
  },
];
