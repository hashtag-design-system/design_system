import { motion } from "framer-motion";
import React from "react";

export const Icon: React.FC<{ clicked: boolean; onClick?: any }> = ({ clicked, ...props }) => {
  return (
    <motion.svg
      width={24}
      height={24}
      fill="none"
      className="input__icon select__icon"
      animate={clicked ? { rotate: 180 } : { rotate: 0 }}
      {...props}
    >
      <path d="M21 7l-9 10L3 7" stroke="var(--grey-7)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
};

export default Icon;
