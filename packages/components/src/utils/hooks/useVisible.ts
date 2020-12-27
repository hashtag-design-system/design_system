import { useCallback, useEffect, useRef, useState } from "react";

// https://www.cluemediator.com/detect-click-outside-a-react-component-using-react-hooks
// https://codesandbox.io/s/989y0758np?file=/src/index.js
export const useVisible = <T extends HTMLInputElement | HTMLUListElement | HTMLDivElement | HTMLDetailsElement>(initialIsVisible: boolean) => {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback((event: any) => {
    if (ref.current && ref.current !== null) {
      if (!ref.current.contains(event.target)) {
        setIsVisible(false);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, !isVisible);
    return () => {
      document.removeEventListener("click", handleClickOutside, !isVisible);
    };
  }, [handleClickOutside, isVisible]);

  return { ref, isVisible, setIsVisible };
};

export default useVisible;
