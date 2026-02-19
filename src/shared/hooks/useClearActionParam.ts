'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useClearActionParam = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  return useCallback(
    (options?: { scroll?: boolean }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!params.has('action')) return;
      params.delete('action');
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url, options);
    },
    [pathname, router, searchParams]
  );
};
