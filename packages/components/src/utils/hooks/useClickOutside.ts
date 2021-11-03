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
  const [prevMouseEvent, setPrevMouseEvent] = useState("");
  const backupRef = useRef<T>(null);
  const ref = forwardRef ? forwardRef : backupRef;

  const handleClickOutside = useCallback(
    (e: any) => {
      if (typeof ref !== "function" && ref.current && prevMouseEvent === "mousedown") {
        if (!ref.current.contains(e.target)) {
          setIsOpen(false);
          setOutsideClick(true);

          if (onDismiss) onDismiss(e);
        }
      }
    },
    // eslint-disable-next-line
    [ref, onDismiss]
  );

  const handleMouse = useCallback(
    (e: MouseEvent) => {
      const type = e.type;
      if (prevMouseEvent !== type) setPrevMouseEvent(type);
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    document.addEventListener("mousedown", e => handleMouse(e));
    document.addEventListener("mousemove", e => handleMouse(e));
    // document.addEventListener("mouseup", e => handleMouse(e));

    return () => {
      document.removeEventListener("mousedown", e => handleMouse(e));
      document.removeEventListener("mousemove", e => handleMouse(e));
      // document.removeEventListener("mouseup", e => handleMouse(e));
    };
  }, [handleMouse]);

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside, !isOpen);
    return () => document.removeEventListener("mouseup", handleClickOutside, !isOpen);
  }, [initialIsOpen, isOpen, handleClickOutside]);

  useEffect(() => {
    if (isOpen === false && outsideClick === true) setOutsideClick(false);
  }, [isOpen, outsideClick]);

  return { ref: ref as React.RefObject<T>, isOpen, setIsOpen, outsideClick };
};

export default useClickOutside;
