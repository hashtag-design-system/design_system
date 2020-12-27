import React from "react";
import { useSelectContext } from "../../utils/contexts";
import Select from "./index";

export const Header: React.FunctionComponent = ({ children }) => {
  const { onlyChild } = useSelectContext();

  return (
    <>
      <div className="select__header" data-onlychild={onlyChild}>
        <h6>{children}</h6>
      </div>
      <Select.Hr />
    </>
  );
};

Header.displayName = "SelectHeader";
