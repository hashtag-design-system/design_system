import React from "react";
import { addClassnames } from "../../utils/styles";
import { PasswordInputProps } from "./index";
import Input, { ReactInputHTMLAttributes } from "./Input";

// PasswordInputProps already has omitted props, omitted also in "this" props
export type Props = Omit<PasswordInputProps, "label" | "helpText" | "secondHelpText">;

export const Digit: React.FC<Props & ReactInputHTMLAttributes> = ({ ...props }) => {
  const { className, ...rest } = props;
  let classNames = addClassnames("input-digit shadow__form-4", props);
  return <Input type="text" floatingPlaceholder={false} className={classNames} maxLength={1} width="auto" {...rest} />;
};

export default Digit;
