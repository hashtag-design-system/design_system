import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import React, { useContext } from "react";
import DropdownContext from "../../utils/ctx/DropdownContext";
import { useClassnames } from "../../utils/hooks";

// TODO: Remember to implement
type OptionType = string | { name: string; options: string[] };

export type Props = {
  maxHeight?: React.ReactText;
};

const ListBox: React.FC<Props & HTMLMotionProps<"ul">> = ({ maxHeight, style, children, ...props }) => {
  const [classNames, rest] = useClassnames<HTMLMotionProps<"ul">>("dropdown__list-box shadow-4", props);

  const newWidth = 158 || (style && style.width);

  const { isOpen, helptext, label } = useContext(DropdownContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          className={classNames}
          style={{ ...style, maxHeight, width: newWidth, marginTop: helptext && !label ? "74px" : label ? "77px" : "52px" }}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          {...rest}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

ListBox.displayName = "DropdownOptionsListBox";

export default ListBox;
