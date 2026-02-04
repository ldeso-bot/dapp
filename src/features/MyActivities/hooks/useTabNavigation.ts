import { useRouter } from 'next/navigation';
import { ActivitiesTabValue, SUPPORTED_TABS } from '../constants/tab.constants';

export const useTabNavigation = () => {
  const router = useRouter();

  const navigateToTab = (tab?: string) => {
    if (SUPPORTED_TABS.includes(tab as ActivitiesTabValue)) {
      router.push(`?activeView=${tab}`);
    }
  };

  return { navigateToTab };
};
