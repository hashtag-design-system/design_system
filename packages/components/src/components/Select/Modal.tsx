import { HTMLMotionProps, motion } from "framer-motion";
import React, { useRef } from "react";
import { isInViewport } from "../../utils";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import { ModalMobile } from "./__helpers__";

const variants = {
  initial: ({ isMobile }: { isMobile: boolean }) =>
    isMobile
      ? {
          scale: 0.75,
          opacity: 0,
        }
      : {
          height: "15%",
        },
  open: ({ isMobile, isOpen }: { isMobile: boolean; isOpen: boolean }) =>
    isMobile
      ? {
          scale: 1,
          opacity: 1,
        }
      : {
          height: isOpen ? "auto" : "",
        },
};

export type Props = {
  align?: "left" | "center" | "right";
};

export type FProps = Props & HTMLMotionProps<"div">;

export const Modal: React.FunctionComponent<FProps> = ({ align = "left", initial, animate, children, ...props }) => {
  const { isOpen, isMobile, modalRef } = useSelectContext();

  const [classNames, rest] = useClassnames("select__modal", props);
  const initialRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  if (initialRef && initialRef.current && !isMobile) {
    if (!isInViewport(initialRef.current)) {
      const { current } = initialRef;
      const rects = current.getBoundingClientRect();

      const { style } = current;

      if (rects.x < 0) {
        style.left = String(Math.abs(rects.x)) + "px";
      }
      const { clientWidth, clientHeight } = document.documentElement;
      if (rects.right > clientWidth) {
        const diff = clientWidth - rects.right;
        style.left = String(diff) + "px";
      }
      if (!isInViewport(current.parentElement?.parentElement!)) {
        if (rects.bottom > clientHeight) {
          style.bottom = String(-(clientHeight - (current.parentElement?.getBoundingClientRect().bottom || 0))) + "px";
        }
      }
    }
  }
  // }, [initialRef, isOpen, isMobile, windowDimensions.width, windowDimensions.height]);

  return (
    <ModalMobile align={align}>
      <motion.div
        ref={isMobile ? modalRef : initialRef}
        variants={variants}
        initial="initial"
        animate={isOpen ? "open" : "initial"}
        custom={{ isMobile, isOpen }}
        transition={{ type: "tween", duration: 0.25 }}
        className={classNames}
        data-testid="select-modal"
        {...rest}
      >
        {children}
      </motion.div>
    </ModalMobile>
  );
};

Modal.displayName = "SelectModal";
