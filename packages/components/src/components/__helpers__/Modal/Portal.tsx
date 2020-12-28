import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Recommended in -> https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/portals/

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

export const Portal: React.FC = ({ children }) => {
  const div = useRef(document.createElement("div"));

  useEffect(() => {
    const current = div.current;
    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, []);

  return createPortal(children, div.current);
};

Portal.displayName = "ModalPortal"