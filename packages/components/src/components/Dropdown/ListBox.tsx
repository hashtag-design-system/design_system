import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import React, { useContext } from "react";
import DropdownContext from "../../utils/ctx/DropdownContext";
import { useClassnames } from "../../utils/hooks";

export type Props = {
  maxHeight?: React.ReactText;
};

const ListBox: React.FC<Props & HTMLMotionProps<"ul">> = ({ maxHeight, children, ...props }) => {
  const [classNames, rest] = useClassnames<HTMLMotionProps<"ul">>("dropdown__list-box shadow-large", props);

  const { isVisible, helptext, label, ref } = useContext(DropdownContext);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="tooltip__bubble"
          />
          <motion.ul
            className={classNames}
            style={{ ...props.style, maxHeight, marginTop: helptext && !label ? "4.625em" : label ? "4.8125em" : "3.25em" }}
            layout
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            {...rest}
          >
            {children}
          </motion.ul>
        </>
      )}
    </AnimatePresence>
  );
};

ListBox.displayName = "DropdownOptionsListBox";

export default ListBox;
