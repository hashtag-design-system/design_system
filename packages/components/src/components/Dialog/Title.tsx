import React from "react";
import { useClassnames } from "../../utils";
import { ComponentProps } from "../__helpers__";

export type FProps = ComponentProps<"h6">;

const Title: React.FC<FProps> = ({ children, ...props }) => {
  const [classNames, rest] = useClassnames("dialog__title semibold", props);

  return (
    <h6 className={classNames} data-testid="dialog-title" {...rest}>
      {children}
    </h6>
  );
};

Title.displayName = "DialogTitle";

export default Title;
