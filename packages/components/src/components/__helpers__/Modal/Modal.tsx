import React from "react";
import { Overlay } from "./Overlay";
import { Portal } from "./Portal";

type SubComponents = {
  Portal: typeof Portal;
  Overlay: typeof Overlay;
};

export const Modal: React.FC & SubComponents = () => {
  return <div></div>;
};

Modal.displayName = "Modal";
Modal.Portal = Portal;
Modal.Overlay = Overlay;
