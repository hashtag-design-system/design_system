import { AnimateSharedLayout, HTMLMotionProps, motion } from "framer-motion";
import React from "react";

type OptionType = string | { name: string; options: string[] };

export type Props = {
  maxHeight?: React.ReactText;
};

export const OptionsListBox: React.FC<Props & HTMLMotionProps<"ul">> = ({ maxHeight, style, children, ...props }) => {
  return (
    <AnimateSharedLayout>
      <motion.ul className="select__list-box" style={{ ...style, maxHeight }} {...props}>
        {children}
      </motion.ul>
      {/* <motion.ul className="select__options__box shadow-6 flex-column-stretch" {...props}>
        {options.map((option: OptionType, i) => {
          return (
            <li
              key={i}
              className="select__option body-16 flex-column-flex-start"
              onClick={() => handleClick(typeof option === "string" ? option : "george")}
            >
              {option}
            </li>
          );
        })}
      </motion.ul> */}
    </AnimateSharedLayout>
  );
};

export default OptionsListBox;
