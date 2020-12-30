import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";
import { useClassnames } from "../../../utils/hooks";
import { ComponentProps } from "../index";
import { Portal, Props as PortalProps } from "./Portal";

export type Props = {
  isShown: boolean;
  blur?: number;
  grayscale?: number;
  opacity?: number;
  bgColor?: "white" | "dark";
  // By refering to it here, it is now required
  children: React.ReactNode;
};

export type FProps = Props & ComponentProps<"div", false> & HTMLMotionProps<"div"> & PortalProps;

export const Overlay = React.forwardRef<HTMLDivElement, FProps>(
  ({ root, isShown = false, blur = 0, grayscale = 0, opacity = 1, bgColor = "dark", style, children, ...props }, ref) => {
    const [classNames, rest] = useClassnames<Partial<FProps>>("modal", props);

    const backdropFilter = [
      blur ? `blur(${blur}px)` : "",
      grayscale ? `grayscale(${grayscale}px)` : "",
      opacity ? `opacity(${opacity}px)` : "",
    ].join(" ");

    const backgroundColor = bgColor === "white" ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.5)";

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
          {...rest}
        >
          {children}
        </motion.div>
      </Portal>
    ) : null;
  }
);

Overlay.displayName = "ModalOverlay";
