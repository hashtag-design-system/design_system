import { HTMLMotionProps, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames, useWindowDimensions } from "../../utils/hooks";
import { ModalMobile } from "./__helpers__";

export type Props = {
  align?: "left" | "center" | "right";
};

export type FProps = Props & HTMLMotionProps<"div">;

const Modal: React.FunctionComponent<FProps> = ({ align = "left", children, ...props }) => {
  const { isOpen, multiSelectable, isMobile, modalRef } = useSelectContext();

  const [isShown, setIsShown] = useState(isOpen);
  const [classNames, rest] = useClassnames("select__modal", props);
  const windowDimensions = useWindowDimensions();
  const initialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialRef && initialRef.current && !isMobile) {
      const { current } = initialRef;
      const rects = current.getBoundingClientRect();

      const { style } = current;
      const { offsetWidth } = document.body;

      if (rects.x < 0) {
        style.left = String(Math.abs(rects.x)) + "px";
      } else if (rects.right > offsetWidth) {
        const diff = offsetWidth - rects.right;
        style.right = String(-diff) + "px";
      }
    }
  }, [isMobile, windowDimensions.width, windowDimensions.height]);

  return (
    <ModalMobile align={align}>
      <motion.div
        ref={isMobile ? modalRef : initialRef}
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
        data-testid="select-modal"
        {...rest}
      >
        {children}
      </motion.div>
    </ModalMobile>
  );
};

Modal.displayName = "SelectModal";

export default Modal;
