import React from "react";
import { IconPropType } from "../../typings";
import { useClassnames } from "../../utils/hooks";
import { ReactProps } from "../__helpers__";
import Input, { InputProps } from "./index";

export type Props = Omit<InputProps, "allowClear" | "icon" | "innerref"> & {
  visibilityToggle?: boolean;
  toggleIcon?: IconPropType;
  // React.InputHTMLAttributes<HTMLInputElement>["autoComplete"]
  autoComplete?: "on" | "off" | "current-password" | "new-password";
};

const Password = React.forwardRef<HTMLInputElement, Props & ReactProps["base_input"]>(
  (
    {
      placeholder = "Password",
      floatingplaceholder: floatingPlaceholder = true,
      visibilityToggle = true,
      toggleIcon,
      autoComplete = "on",
      ...props
    },
    ref
  ) => {
    let [classNames, rest] = useClassnames("input-password", props);

    return (
      <Input
        type="password"
        placeholder={placeholder}
        floatingplaceholder={floatingPlaceholder}
        autoComplete={autoComplete}
        icon={visibilityToggle ? toggleIcon : undefined}
        className={classNames}
        innerref={ref}
        {...rest}
      />
    );
  }
);

Password.displayName = "InputPassword";

export default Password;
