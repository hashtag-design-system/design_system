import React from "react";
import { ComponentProps } from "../__helpers__";

export type FProps = ComponentProps<"hr", false>;

const Hr: React.FC<FProps> = ({ className, ...props }) => {
  return <hr className={`select__hr ${className ? className : ""}`} {...props} />;
};

Hr.displayName = "SelectHr";

export default Hr;
