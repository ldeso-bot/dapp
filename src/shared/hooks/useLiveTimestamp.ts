import { formatCurrentTime } from '@/shared/utils/string.utils';
import { useEffect, useState } from 'react';

export const useFormattedTimestamp = (intervalMs = 30000) => {
  const [currentTime, setCurrentTime] = useState(() => formatCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatCurrentTime());
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return currentTime;
};
