import { motion } from "framer-motion";
import React from "react";
import { useSelectContext } from "../../../utils/contexts";

export const DownArrowIcon: React.FunctionComponent = () => {
  const { isOpen } = useSelectContext();

  // https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91
  return (
    <motion.svg
      fill="none"
      viewBox="0 0 16 16"
      width={16}
      height={16}
      className="select__icon icon"
      // * A "spring" animation might be too much and useless for this element
      animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      data-testid="icon"
    >
      <path d="M13 4.889L7.5 11 2 4.889" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
};
