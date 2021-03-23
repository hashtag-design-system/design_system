import React from "react";
import { useClassnames } from "../../utils";
import { ComponentProps } from "../__helpers__";

export type Props = {
  as?: "div" | "form";
  children: React.ReactNode;
};

export type FProps = Props & ComponentProps<"form">;

const Group: React.FC<FProps> = ({ as = "form", children, ...props }) => {
  const [classNames, rest] = useClassnames("form-group", props);
  const Component = as;

  return (
    <Component className={classNames} data-testid="form-group" {...rest}>
      {children}
    </Component>
  );
};

Group.displayName = "FormGroup";

export default Group;
