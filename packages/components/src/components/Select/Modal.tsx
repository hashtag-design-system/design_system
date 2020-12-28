import { HTMLMotionProps, motion } from "framer-motion";
import React, { useState } from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import { ModalMobile } from "./__helpers__";

export type FProps = HTMLMotionProps<"div">;

const Modal: React.FunctionComponent<FProps> = ({ children, ...props }) => {
  const { isOpen, multiSelectable, isMobile, modalRef } = useSelectContext();

  const [isShown, setIsShown] = useState(isOpen);
  const [classNames, rest] = useClassnames("select__modal", props);

  return (
    <ModalMobile>
      <motion.div
        ref={isMobile ? modalRef : undefined}
        initial={{ height: "15%" }}
        animate={{ height: isOpen && !isMobile ? "auto" : !isMobile ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.2, delay: isMobile ? 0.1 : 0 }}
        className={classNames}
        role="listbox"
        data-isshown={isShown}
        aria-multiselectable={multiSelectable}
        onAnimationComplete={() => {
          setIsShown(isOpen);
        }}
        {...rest}
      >
        {children}
      </motion.div>
    </ModalMobile>
  );
};

Modal.displayName = "SelectModal";

export default Modal;
