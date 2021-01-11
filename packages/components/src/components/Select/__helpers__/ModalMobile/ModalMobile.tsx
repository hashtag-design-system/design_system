import React from "react";
import { SelectModalProps } from "../..";
import { useSelectContext } from "../../../../utils/contexts";
import { Modal, ModalOverlayFProps } from "../../../__helpers__";

export type FProps = SelectModalProps & Pick<ModalOverlayFProps, "isShown">;

export const ModalMobile: React.FC<FProps> = ({ isShown, align, children }) => {
  const { isMobile } = useSelectContext();

  return isMobile ? (
    <Modal.Overlay isShown={isShown} bgColor="dark" className="select__modal--mobile">
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
