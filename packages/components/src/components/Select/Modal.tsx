import { HTMLMotionProps, motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { isInViewport, useClassnames, useSelectContext, useWindowDimensions } from "../../utils";
import { SelectFProps } from "./index";
import { ModalMobile } from "./__helpers__";

const variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  initial: ({ isMobile }: { isMobile: boolean }) =>
    isMobile
      ? {
          scale: 0.75,
          opacity: 0,
        }
      : {
          opacity: 0,
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
          opacity: 1,
        },
};

export const SelectModalAligns = ["left", "center", "right"] as const;

export type Props = {
  align?: typeof SelectModalAligns[number];
  fullWidth?: boolean;
};

export type FProps = Props & HTMLMotionProps<"div"> & Pick<SelectFProps, "open">;

export const Modal: React.FC<FProps> = ({ align = "left", fullWidth = false, open, initial, animate, style, children, ...props }) => {
  const [top, setTop] = useState<number | undefined>(undefined);
  const [animationEnd, setAnimationEnd] = useState(false);
  const { isOpen, isMobile, modalRef, width } = useSelectContext();
  const windowDimensions = useWindowDimensions();

  const [classNames, rest] = useClassnames("select__modal", props);
  const initialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialRef && initialRef.current && !isMobile) {
      if (!isInViewport(initialRef.current)) {
        const { current } = initialRef;
        const rects = current.getBoundingClientRect();

        const { style } = current;

        if (rects.x < 0) style.left = String(Math.abs(rects.x)) + "px";
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
  }, [initialRef, isOpen, isMobile, windowDimensions.width, windowDimensions.height]);

  const fOpen = useMemo(() => (open === undefined ? isOpen : open), [isOpen, open]);

  useEffect(() => {
    // @ts-expect-error
    if (isMobile && animationEnd && modalRef && modalRef.current) {
      // @ts-expect-error
      const { top } = modalRef.current.getBoundingClientRect();
      setTop(top);
    }
    // eslint-disable-next-line
  }, [animationEnd]);

  return (
    <ModalMobile isShown={fOpen} align={align}>
      <motion.div
        // ref={isMobile ? modalRef : initialRef}
        ref={modalRef}
        variants={variants}
        initial="initial"
        animate={open === undefined ? (isOpen ? "open" : "initial") : open ? "open" : "hidden"}
        custom={{ isMobile, isOpen }}
        style={{ top: top ? top : undefined, width: fullWidth ? width : style?.width, ...style }}
        transition={{ type: "tween", duration: 0.25 }}
        className={classNames}
        data-testid="select-modal"
        onAnimationComplete={() => setAnimationEnd(true)}
        {...rest}
      >
        {children}
      </motion.div>
    </ModalMobile>
  );
};

Modal.displayName = "SelectModal";
