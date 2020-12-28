import React from "react";
import { ComponentProps } from "../__helpers__";

export type FProps = ComponentProps<"hr", false>;

const Hr: React.FC<FProps> = ({ className, ...props }) => {
  return <span className={`select__hr ${className ? className : ""}`} data-testid="select-hr" {...props} />;
};

Hr.displayName = "SelectHr";

export default Hr;
