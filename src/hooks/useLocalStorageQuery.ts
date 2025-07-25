import { useEffect, useState } from 'react';

export function useLocalStorageQuery(key: string, defaultValue: string = '') {
  const [value, setValue] = useState(() => localStorage.getItem(key) || defaultValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
