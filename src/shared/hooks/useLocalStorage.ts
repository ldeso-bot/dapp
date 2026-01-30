'use client';

import { useCallback, useState } from 'react';

type StoredValue = string | boolean;

const getInitialValue = (
  key: string,
  initialValue: StoredValue
): StoredValue => {
  if (typeof window === 'undefined') return initialValue;
  try {
    const item = window.localStorage?.getItem(key);
    if (item == null) return initialValue;
    try {
      const parsed = JSON.parse(item);
      if (typeof parsed === 'string' || typeof parsed === 'boolean') {
        return parsed;
      }
      return initialValue;
    } catch {
      return item as StoredValue;
    }
  } catch {
    return initialValue;
  }
};

export const useLocalStorage = (
  key: string,
  initialValue: StoredValue
): [StoredValue, (value: StoredValue) => void] => {
  const [storedValue, setStoredValue] = useState<StoredValue>(() =>
    getInitialValue(key, initialValue)
  );

  const setValue = useCallback(
    (value: StoredValue) => {
      setStoredValue(value);
      try {
        window.localStorage?.setItem(key, JSON.stringify(value));
      } catch {
        // ... Do nothing
      }
    },
    [key]
  );
  return [storedValue, setValue];
};
