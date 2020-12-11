import React from "react";
import { IconPropType } from "../../typings";
import { useClassnames } from "../../utils/hooks";
import Input, { InputFProps } from "./index";

export type Props = {
  visibilityToggle?: boolean;
  toggleIcon?: IconPropType;
  form?: "sign-up" | "login";
};

export type FProps = Props & Omit<InputFProps, "allowClear" | "icon" | "ref">;

const Password = React.forwardRef<HTMLInputElement, FProps>(
  (
    {
      placeholder = "Password",
      floatingplaceholder: floatingPlaceholder = true,
      visibilityToggle = true,
      toggleIcon,
      autoComplete = "on",
      form,
      ...props
    },
    ref
  ) => {
    let [classNames, rest] = useClassnames("input-password", props);

    if (form === "sign-up") {
      autoComplete = "new-password";
    } else if (form === "login") {
      autoComplete = "current-password";
    }

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
