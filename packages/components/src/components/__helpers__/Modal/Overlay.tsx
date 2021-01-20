import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";
import { useClassnames } from "../../../utils/hooks";
import { ComponentProps } from "../index";
import { Portal, Props as PortalProps } from "./Portal";

export const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export type Props = {
  isShown: boolean;
  blur?: boolean | string;
  grayscale?: boolean | string;
  opacity?: string | number;
  bgColor?: "light" | "dark";
  // By refering to it here, it is now required
  children: React.ReactNode;
};

export type FProps = Props & ComponentProps<"div", true> & HTMLMotionProps<"div"> & PortalProps;

export const Overlay = React.forwardRef<HTMLDivElement, FProps>(
  ({ root, isShown = false, blur, grayscale, opacity = 1, bgColor = "dark", style, children, ...props }, ref) => {
    const [classNames, rest] = useClassnames<Partial<FProps>>("modal", props);

    const backdropFilter = [
      blur ? `blur(${typeof blur === "boolean" ? "2px" : blur})` : "",
      grayscale ? `grayscale(${typeof grayscale === "boolean" ? "40%" : grayscale})` : "",
      `opacity(${opacity})`,
    ].join(" ");

    const backgroundColor = bgColor === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.5)";

    return isShown ? (
      <Portal root={root}>
        <motion.div
          className={classNames}
          style={{
            ...style,
            backdropFilter: style?.backdropFilter ?? backdropFilter,
            backgroundColor: style?.backgroundColor ?? backgroundColor,
          }}
          ref={ref}
          data-testid="modal"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.25, when: "beforeChildren" }}
          {...rest}
        >
          {children}
        </motion.div>
      </Portal>
    ) : null;
  }
);

Overlay.displayName = "ModalOverlay";
