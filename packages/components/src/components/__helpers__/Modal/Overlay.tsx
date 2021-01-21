import { HTMLMotionProps, motion } from "framer-motion";
import React, { useMemo } from "react";
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

export const ModalOverlayBackgroundColors = ["light", "dark"] as const;
export type ModalOverlayBackgroundColor = typeof ModalOverlayBackgroundColors[number];

export type Props = {
  isShown: boolean;
  blur?: boolean | string;
  grayscale?: boolean | string;
  opacity?: string | number;
  background?: { color?: ModalOverlayBackgroundColor; alpha?: number };
  // By referrencing to it here, it is now required
  children: React.ReactNode;
};

export type FProps = Props & ComponentProps<"div", true> & HTMLMotionProps<"div"> & PortalProps;

export const Overlay = React.forwardRef<HTMLDivElement, FProps>(
  ({ root, isShown = false, blur, grayscale, opacity = 1, background = { color: "dark" }, style, children, ...props }, ref) => {
    const [classNames, rest] = useClassnames<Partial<FProps>>("modal", props);

    const backdropFilter = [
      blur ? `blur(${typeof blur === "boolean" ? "2px" : blur})` : "",
      grayscale ? `grayscale(${typeof grayscale === "boolean" ? "40%" : grayscale})` : "",
      `opacity(${opacity})`,
    ].join(" ");

    const backgroundColor: string = useMemo(() => {
      const alpha = background.alpha;
      if (background.color === "light") {
        return `rgba(255, 255, 255, ${alpha ? alpha : 0.75})`;
      } else {
        return `rgba(0, 0, 0, ${alpha ? alpha : 0.5})`;
      }
    }, [background]);

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
