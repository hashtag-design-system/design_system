import React from "react";
import { SelectModalProps } from "../..";
import { useSelectContext } from "../../../../utils/contexts";
import { Modal } from "../../../__helpers__";

export type FProps = SelectModalProps;

export const ModalMobile: React.FC<FProps> = ({ align, children }) => {
  const { isOpen, isMobile } = useSelectContext();

  return isMobile ? (
    <Modal.Overlay isShown={isOpen} bgColor="dark" className="select__modal--mobile">
      {children}
    </Modal.Overlay>
  ) : (
    <div
      className={`flex-row-${
        align === "left" ? "flex-start" : align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start"
      }-stretch`}
      data-testid="select-modal--mobile"
    >
      {children}
    </div>
  );
};
