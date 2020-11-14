import { motion, SVGMotionProps } from "framer-motion";
import React from "react";

export const Icon: React.FC<{ clicked: boolean; onClick?: SVGMotionProps<SVGElement>["onClick"] }> = ({ clicked, ...props }) => {
  return (
    <motion.svg
      width={24}
      height={24}
      fill="none"
      className="input__icon select__icon"
      animate={clicked ? { rotate: 180 } : { rotate: 0 }}
      // * A "spring" animation might be too much and useless for this element
      {...props}
    >
      <path d="M21 7l-9 10L3 7" stroke="var(--grey-7)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
};

export default Icon;
