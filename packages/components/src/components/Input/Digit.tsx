import React from "react";
import { useClassnames } from "../../utils/hooks";
import { ReactProps } from "../__helpers__";
import Input, { PasswordInputProps } from "./index";

// PasswordInputProps already has omitted props, omitted also in "this" props
export type Props = Omit<PasswordInputProps, "label" | "helpText" | "secondHelpText">;

const Digit = React.forwardRef<HTMLInputElement, Props & Omit<ReactProps["base_input"], "maxLength">>(
  ({ ...props }, ref) => {
    const [classNames, rest] = useClassnames("input-digit shadow__form-4", props);

    return (
      <Input
        type="text"
        floatingplaceholder={false}
        className={classNames}
        maxLength={1}
        characterLimit={false}
        width="auto"
        innerref={ref}
        {...rest}
      />
    );
  }
);

Digit.displayName = "InputDigit";

export default Digit;
