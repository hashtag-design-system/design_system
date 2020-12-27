import { motion, HTMLMotionProps } from "framer-motion";
import React, { useState } from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";

export type FProps = HTMLMotionProps<"div">;

const Modal: React.FunctionComponent<FProps> = ({ children, ...props }) => {
  const { isOpen, multiSelectable } = useSelectContext();

  const [isShown, setIsShown] = useState(isOpen);
  const [classNames, rest] = useClassnames("select__modal", props);

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: isOpen ? "auto" : 0 }}
      transition={{ type: "tween", duration: 0.15 }}
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
  );
};

Modal.displayName = "SelectModal";

export default Modal;
