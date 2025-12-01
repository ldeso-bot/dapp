import { formatCurrentTime } from '@/shared/utils/string.utils';
import { useEffect, useState } from 'react';

export const useLiveTimestamp = (intervalMs = 30000) => {
  const [currentTime, setCurrentTime] = useState(formatCurrentTime());

  useEffect(() => {
    setCurrentTime(formatCurrentTime());

    const interval = setInterval(() => {
      setCurrentTime(formatCurrentTime());
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return currentTime;
};
