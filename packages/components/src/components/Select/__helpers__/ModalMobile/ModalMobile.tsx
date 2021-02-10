import React from "react";
import { SelectModalProps } from "../..";
import { useSelectContext } from "../../../../utils";
import { Modal, ModalOverlayFProps } from "../../../__helpers__";

export type FProps = SelectModalProps & Partial<Pick<ModalOverlayFProps, "isShown">>;

export const ModalMobile: React.FC<FProps> = ({ isShown = false, align, children }) => {
  const { isMobile } = useSelectContext();

  return isMobile ? (
    <Modal.Overlay
      isShown={isShown}
      background={{ color: "dark" }}
      className="select__modal--mobile"
      data-testid="select-modal--mobile"
    >
      {children}
    </Modal.Overlay>
  ) : (
    <div
      className={`flex-row-${
        align === "left" ? "flex-start" : align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start"
      }-stretch`}
      data-testid="select-modal--desktop"
    >
      {children}
    </div>
  );
};
