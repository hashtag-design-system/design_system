import { useEffect, useState } from "react";
import { useHasMounted } from "../index";

// Recommended in -> https://codesandbox.io/s/z20gn?file=/pages/index.js:336-397

export type UseLocalStorageOptions = {
  key: string;
  initialValue?: string;
};

type StoredValueState = string | null;

export const useLocalStorage = ({
  initialValue,
  key,
}: UseLocalStorageOptions): [StoredValueState, React.Dispatch<React.SetStateAction<StoredValueState>>] => {
  const [storedValue, setStoredValue] = useState<StoredValueState>(initialValue || null);
  const [hasMounted] = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      const stickyValue = localStorage.getItem(key);

      if (stickyValue) setStoredValue(stickyValue);
    }
  }, [hasMounted, key]);

  useEffect(() => {
    if (hasMounted && storedValue !== null) localStorage.setItem(key, storedValue);
  }, [hasMounted, key, storedValue]);

  return [storedValue, setStoredValue];
};
