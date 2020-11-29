import { motion } from "framer-motion";
import React, { useContext } from "react";
import DropdownContext from "../../../utils/ctx/DropdownContext";

export const DownArrowIcon: React.FunctionComponent = () => {
  const selectCtx = useContext(DropdownContext);

  const { isVisible, handleClick } = selectCtx;

  // https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91
  return (
    <motion.svg
      fill="none"
      viewBox="0 0 24 24"
      className="input__icon select__icon"
      // * A "spring" animation might be too much and useless for this element
      animate={isVisible ? { rotate: 180 } : { rotate: 0 }}
      onClick={e => handleClick && handleClick(e)}
    >
      <path d="M21 7l-9 10L3 7" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
};
