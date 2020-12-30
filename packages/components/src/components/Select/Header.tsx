import React from "react";
import { useClassnames } from "../../utils/hooks";
import { ComponentProps } from "../__helpers__";
import Select from "./index";

export type Props = {
  value: React.ReactNode;
};

export type FProps = Props & ComponentProps<"div">;

export const Header: React.FunctionComponent<FProps> = ({ value, children, ...props }) => {
  const [classNames, rest] = useClassnames<Partial<FProps>>("select__header", props);

  return (
    <>
      <div className={classNames} data-testid="select-header" data-children={children ? true : false} {...rest}>
        <h6>{value}</h6>
      </div>
      <Select.Hr />
      {children}
    </>
  );
};

Header.displayName = "SelectHeader";
