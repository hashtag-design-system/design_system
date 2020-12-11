import React from "react";
import { useClassnames } from "../../utils/hooks";
import Input, { PasswordInputFProps } from "./index";

// PasswordInputProps already has omitted props, omitted also in "this" props
export type FProps = Omit<PasswordInputFProps, "label" | "helptext" | "secondhelptext" | "maxLength">;

const Digit = React.forwardRef<HTMLInputElement, FProps>(({ ...props }, ref) => {
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
});

Digit.displayName = "InputDigit";

export default Digit;
