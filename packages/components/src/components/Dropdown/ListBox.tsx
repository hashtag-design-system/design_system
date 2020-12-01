import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import React, { useContext } from "react";
import DropdownContext from "../../utils/ctx/DropdownContext";
import { useClassnames } from "../../utils/hooks";

export type Props = {
  maxHeight?: React.ReactText;
  tooltipBubble?: boolean;
};

const ListBox: React.FC<Props & HTMLMotionProps<"ul">> = ({ maxHeight, tooltipBubble = true, children, ...props }) => {
  const [classNames, rest] = useClassnames<HTMLMotionProps<"ul">>("dropdown__list-box shadow-2", props);

  const { isVisible, helptext, label, ref } = useContext(DropdownContext);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {tooltipBubble && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="tooltip__bubble"
            />
          )}
          <motion.ul
            className={classNames}
            style={{
              ...props.style,
              maxHeight,
              marginTop: helptext && !label ? "4.75em" : label ? "4.9375em" : "3.375em",
            }}
            layout
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            {...rest}
            role="tablist"
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
