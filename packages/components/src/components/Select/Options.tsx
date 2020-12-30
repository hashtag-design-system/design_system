import React from "react";
import { useClassnames } from "../../utils/hooks";
import { ComponentProps } from "../__helpers__";

export type FProps = ComponentProps<"div">;

export const Options: React.FC<FProps> = ({ children, ...props }) => {
  const [classNames, rest] = useClassnames("select__options", props);

  return (
    <div className={classNames} data-testid="select-options" {...rest}>
      {children}
    </div>
  );
};

Options.displayName = "SelectOptions";
