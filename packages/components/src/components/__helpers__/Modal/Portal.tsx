import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CONFIG } from "../../../config";
import { isJest } from "../../../utils";
import { createPortalElement } from "./__helpers__";

// Recommended in -> https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/portals/
// See also -> https://dev.to/believer/testing-react-createportal-with-testing-library-1mj6
// See also -> https://www.youtube.com/watch?v=xaiE_K32gBE&t=4s
// See also -> https://github.com/vercel/next.js/blob/canary/examples/with-portals/components/ClientOnlyPortal.js

export type Props = {
  selector?: string;
};

const jestEnv = isJest();
if (jestEnv) {
  const modalRoot = document.getElementById(CONFIG.DEFAULT_PORTAL_ID_SELECTOR);
  if (!modalRoot) {
    createPortalElement();
  }
}

export const Portal: React.FC<Props> = ({ selector = "#" + CONFIG.DEFAULT_PORTAL_ID_SELECTOR, children }) => {
  // @ts-expect-error
  const query = process.browser || jestEnv;
  const modalRoot = useRef<any>(query ? document.querySelector(selector) : null);
  const el = useRef<HTMLDivElement | null>(query ? document.createElement("div") : null);

  if (!modalRoot.current && query) {
    createPortalElement();
  }

  useEffect(() => {
    let elCurrent = el.current;
    let modalCurrent = modalRoot.current;

    modalCurrent!.appendChild(elCurrent);
    return () => void modalCurrent!.removeChild(elCurrent);
  }, [selector]);

  return el.current || modalRoot.current ? createPortal(children, el.current || modalRoot.current) : null;
};

Portal.displayName = "ModalPortal";
