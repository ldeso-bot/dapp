import { useEffect, useState } from 'react';

export const useCurrentTimestamp = (intervalMs = 60000) => {
  const [currentTimestamp, setCurrentTimestamp] = useState(() =>
    Math.floor(Date.now() / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return currentTimestamp;
};
