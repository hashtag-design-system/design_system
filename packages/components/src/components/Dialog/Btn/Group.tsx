import React from "react";
import { useClassnames } from "../../../utils";
import { ComponentProps } from "../../__helpers__";

export type FProps = ComponentProps<"div"> & Required<React.PropsWithChildren<unknown>>;

const Group: React.FC<FProps> = ({ children, ...props }) => {
  const [classNames, rest] = useClassnames("dialog__btn__group", props);

  return (
    <div className={classNames} data-testid="dialog-btn-group" {...rest}>
      {children}
    </div>
  );
};

Group.displayName = "DialogBtnGroup";

export default Group;
