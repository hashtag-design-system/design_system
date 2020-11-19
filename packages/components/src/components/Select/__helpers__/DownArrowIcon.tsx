import { motion } from "framer-motion";
import React, { useContext } from "react";
import DropdownContext from "../../../utils/ctx/DropdownContext";

export const DownArrowIcon: React.FC = () => {
  const selectCtx = useContext(DropdownContext);

  const { isVisible, handleClick } = selectCtx;

  return (
    <motion.svg
      width={24}
      height={24}
      fill="none"
      className="input__icon select__icon"
      // * A "spring" animation might be too much and useless for this element
      animate={isVisible ? { rotate: 180 } : { rotate: 0 }}
      onClick={e => handleClick && handleClick(e)}
    >
      <path d="M17.8 9l-5.4 6L7 9" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
};
