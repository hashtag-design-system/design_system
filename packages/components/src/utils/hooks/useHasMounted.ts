import { useEffect, useState } from "react";

export const useHasMounted = (defaultMounted: boolean = false) => {
  const [hasMounted, setHasMounted] = useState(defaultMounted);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return [hasMounted];
};
