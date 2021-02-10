import React from "react";
import { useClassnames } from "../../utils";
import { ComponentProps } from "../__helpers__";

export type Props = {
  children: React.ReactNode;
};

export type FProps = Props & ComponentProps<"div">;

const Group: React.FC<FProps> = ({ children, ...props }) => {
  const [classNames, rest] = useClassnames("form-group", props);

  return (
    <div className={classNames} data-testid="form-group" {...rest}>
      {children}
    </div>
  );
};

Group.displayName = "FormGroup";

export default Group;
