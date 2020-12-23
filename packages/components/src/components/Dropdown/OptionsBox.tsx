import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import React, { CSSProperties, useContext } from "react";
import DropdownContext from "../../utils/contexts/DropdownContext";
import { useClassnames } from "../../utils/hooks";

export type Props = {
  tooltipBubble?: boolean;
};

export type FProps = Props & Pick<CSSProperties, "maxHeight"> & Pick<React.ComponentPropsWithoutRef<"ul">, "className">;

const OptionsBox: React.FC<FProps & HTMLMotionProps<"ul">> = ({ maxHeight, tooltipBubble = true, children, ...props }) => {
  const [classNames, rest] = useClassnames<HTMLMotionProps<"ul">>("dropdown__list-box shadow-sm", props);

  const { isVisible, helptext, label, ref } = useContext(DropdownContext);

  // TODO: Replace the <span /> tag with the <Tooltip /> component, when it is made
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
              width: classNames.includes("block") ? "calc(100% - 13px)" : "",
              maxHeight,
              marginTop: helptext && !label ? "4.5625em" : label ? "4.75em" : "3.1875em",
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

OptionsBox.displayName = "DropdownOptionsOptionsBox";

export default OptionsBox;
