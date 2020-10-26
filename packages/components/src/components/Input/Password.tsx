import React from "react";
import { IconPropType } from "../../typings";
import { addClassnames } from "../../utils/styles";
import { InputProps } from "./index";
import Input, { ReactInputHTMLAttributes } from "./Input";

export type Props = Omit<InputProps, "allowClear" | "icon" | "innerRef"> & {
  visibilityToggle?: boolean;
  toggleIcon?: IconPropType;
  // React.InputHTMLAttributes<HTMLInputElement>["autoComplete"]
  autoComplete?: "on" | "off" | "current-password" | "new-password";
};

export const Password = React.forwardRef<HTMLInputElement, Props & ReactInputHTMLAttributes>(
  (
    {
      placeholder = "Password",
      floatingPlaceholder = true,
      visibilityToggle = true,
      toggleIcon,
      autoComplete = "on",
      ...props
    },
    ref
  ) => {
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
        innerRef={ref}
        {...rest}
      />
    );
  }
);

Password.displayName = "Password";

export default Password;
