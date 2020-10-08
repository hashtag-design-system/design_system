import React from "react";
import { IconPropType } from "../../typings";
import { addClassnames } from "../../utils/styles";
import { InputProps } from "./index";
import Input, { ReactInputHTMLAttributes } from "./Input";

export type Props = Omit<InputProps, "placeholder" | "allowClear" | "icon"> & {
  placeholder?: string;
  visibilityToggle?: boolean;
  toggleIcon?: IconPropType;
  // React.InputHTMLAttributes<HTMLInputElement>["autoComplete"]
  autoComplete?: "on" | "off" | "current-password" | "new-password";
};

export const Password: React.FC<Props & ReactInputHTMLAttributes> = ({
  placeholder = "Password",
  floatingPlaceholder = true,
  visibilityToggle = true,
  toggleIcon,
  autoComplete = "on",
  ...props
}) => {
  const { className, ...rest } = props;
  let classNames = addClassnames("input-password", props);
  return (
    <Input
      type="password"
      placeholder={placeholder}
      floatingPlaceholder={floatingPlaceholder}
      autoComplete={autoComplete}
      icon={visibilityToggle ? toggleIcon : undefined}
      className={classNames}
      {...rest}
    />
  );
};

Password.displayName = "Password";

export default Password;
