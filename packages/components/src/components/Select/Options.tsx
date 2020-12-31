import React from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import { ComponentProps } from "../__helpers__";

export type FProps = ComponentProps<"div">;

export const Options: React.FC<FProps> = ({ children, ...props }) => {
  const [classNames, rest] = useClassnames("select__options", props);

  const { multiSelectable } = useSelectContext();

  return (
    <div className={classNames} role="listbox" aria-multiselectable={multiSelectable} data-testid="select-options" {...rest}>
      {children}
    </div>
  );
};

Options.displayName = "SelectOptions";
