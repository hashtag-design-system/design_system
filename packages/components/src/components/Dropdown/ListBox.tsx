import { AnimateSharedLayout, HTMLMotionProps, motion } from "framer-motion";
import React, { useContext } from "react";
import DropdownContext from "../../utils/ctx/DropdownContext";
import { useClassnames } from "../../utils/hooks";

// TODO: Remember to implement
type OptionType = string | { name: string; options: string[] };

export type Props = {
  maxHeight?: React.ReactText;
};

export const ListbOX: React.FC<Props & HTMLMotionProps<"ul">> = ({ maxHeight, style, children, ...props }) => {
  const [classNames, rest] = useClassnames<HTMLMotionProps<"ul">>("select__list-box", props);

  const { isOpen } = useContext(DropdownContext);

  return isOpen ? (
    <AnimateSharedLayout>
      <motion.ul className={classNames} style={{ ...style, maxHeight }} {...rest}>
        {children}
      </motion.ul>
    </AnimateSharedLayout>
  ) : null;
};

ListbOX.displayName = "DropdownOptionsListBox";

export default ListbOX;
