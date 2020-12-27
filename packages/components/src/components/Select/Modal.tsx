import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSelectContext } from "../../utils/contexts";

const Modal: React.FunctionComponent = ({ children }) => {
  const { isOpen, multiSelectable } = useSelectContext();
  const [isShown, setIsShown] = useState(isOpen);

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: isOpen ? "auto" : 0 }}
      transition={{ type: "tween", duration: 0.15 }}
      className="select__modal"
      role="listbox"
      data-isshown={isShown}
      aria-multiselectable={multiSelectable}
      onAnimationComplete={() => {
        setIsShown(isOpen);
      }}
    >
      {children}
    </motion.div>
  );
};

Modal.displayName = "SelectModal";

export default Modal;
