import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Recommended in -> https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/portals/
// See also -> https://dev.to/believer/testing-react-createportal-with-testing-library-1mj6

export type Props = {
  root?: HTMLElement;
};

export const createPortalElement = () => {
  return document.createElement("div");
};

let modalRoot = document.getElementById("modal-root") as HTMLElement;
if (!modalRoot) {
  modalRoot = createPortalElement();
  modalRoot.setAttribute("id", "modal-root");
  modalRoot.setAttribute("data-testid", "modal-root");
  document.body.appendChild(modalRoot);
}

export const Portal: React.FC<Props> = ({ root = modalRoot, children }) => {
  const div = useRef(createPortalElement());

  useEffect(() => {
    const current = div.current;
    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, [root]);

  return createPortal(children, div.current);
};

Portal.displayName = "ModalPortal";
