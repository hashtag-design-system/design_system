import React from "react";
import { useClassnames } from "../../utils/hooks";

export type FProps = React.ComponentPropsWithoutRef<"div">;

const ScrollBar: React.FC<FProps> = ({ ...props }) => {
  const [classNames, rest] = useClassnames("bottom-sheet__srcoll-bar__container", props);

  return (
    <div className={classNames} {...rest}>
      <div className="bottom-sheet__srcoll-bar"></div>
    </div>
  );
};

ScrollBar.displayName = "BottomSheetScrollBar";

export default ScrollBar;
