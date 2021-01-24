import { useCallback, useEffect, useRef, useState } from "react";

// https://www.cluemediator.com/detect-click-outside-a-react-component-using-react-hooks
// https://codesandbox.io/s/989y0758np?file=/src/index.js
// https://github.com/primer/components/blob/main/src/SelectMenu/SelectMenu.js
export const useClickOutside = <T extends HTMLInputElement | HTMLUListElement | HTMLDivElement | HTMLDetailsElement | HTMLElement>(
  initialIsOpen: boolean,
  forwardRef?: ((instance: T | null) => void) | React.RefObject<T> | null | undefined,
  onDismiss?: (e: any) => void
) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [outsideClick, setOutsideClick] = useState(false);
  const backupRef = useRef<T>(null);
  const ref = forwardRef ? forwardRef : backupRef;

  const handleClickOutside = useCallback(
    (event: any) => {
      if (typeof ref !== "function" && ref.current && ref.current !== null) {
        if (!ref.current.contains(event.target)) {
          setIsOpen(false);
          setOutsideClick(true);

          if (onDismiss) {
            onDismiss(event);
          }
        }
      }
    },
    [ref, onDismiss]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, !isOpen);
    return () => {
      document.removeEventListener("click", handleClickOutside, !isOpen);
    };
  }, [initialIsOpen, isOpen, handleClickOutside]);

  useEffect(() => {
    if (isOpen === false && outsideClick === true) {
      setOutsideClick(false);
    }
  }, [isOpen, outsideClick]);

  return { ref: ref as React.RefObject<T>, isOpen, setIsOpen, outsideClick };
};

export default useClickOutside;
