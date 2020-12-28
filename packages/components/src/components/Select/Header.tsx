import React from "react";
import { useSelectContext } from "../../utils/contexts";
import { useClassnames } from "../../utils/hooks";
import { ComponentProps } from "../__helpers__";
import Select from "./index";

export type FProps = ComponentProps<"div">;

export const Header: React.FunctionComponent<FProps> = ({ children, ...props }) => {
  const [classNames, rest] = useClassnames<FProps>("select__header", props);

  const { onlyChild } = useSelectContext();
  
  return (
    <>
      <div className={classNames} data-onlychild={onlyChild} data-testid="select-header" {...rest}>
        <h6>{children}</h6>
      </div>
      <Select.Hr />
    </>
  );
};

Header.displayName = "SelectHeader";
