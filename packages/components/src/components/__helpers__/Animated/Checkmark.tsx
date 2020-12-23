import { motion, MotionAdvancedProps, MotionProps, SVGMotionProps, TapHandlers } from "framer-motion";
import React from "react";
import { useAnimateCheckmark } from "../../../utils/hooks";

// See -> https://codesandbox.io/s/framer-motion-svg-checkbox-kqm7y?file=/src/Example.tsx:137-300

export const checkmarkVariants = {
  pressed: (isChecked: boolean) => ({
    pathLength: isChecked ? 0.75 : 0.3,
  }),
  checked: { pathLength: 1 },
  initial: { pathLength: 0 },
};

export type Props = {
  width?: number;
};

export type FProps = Props &
  Pick<TapHandlers, "whileTap"> &
  Pick<MotionProps, "initial"> &
  Pick<MotionAdvancedProps, "custom"> &
  Pick<SVGMotionProps<SVGSVGElement>, "stroke">;

export const Checkmark: React.FC<FProps> = ({ width, whileTap, initial = false, custom, stroke = "var(--grey-1)", children }) => {
  // Animation state
  const [pathLength, opacity] = useAnimateCheckmark();

  return (
    <motion.svg
      whileTap={whileTap}
      initial={initial}
      width={width}
      height={width}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!children ? (
        <motion.path
          d="M1.75 7.156l3.55 3.658 7.43-7.897"
          fill="transparent"
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={custom ? "checked" : undefined}
          variants={checkmarkVariants}
          style={{ pathLength, opacity }}
          custom={custom}
          transition={{ duration: 0.2 }}
        />
      ) : (
        children
      )}
    </motion.svg>
  );
};
