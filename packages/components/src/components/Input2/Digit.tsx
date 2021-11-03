import React from "react";
import { useClassnames } from "../../utils";
import { ComponentProps } from "../__helpers__";
import Input, { InputBaseState, InputPasswordFProps } from "./index";

// PasswordInputProps already has omitted props, omitted also in "this" props
export type FProps = Omit<
  InputPasswordFProps,
  | "placeholder"
  | "floatingplaceholder"
  | "passwordboxes"
  | "optional"
  | "characterLimit"
  | "prefix"
  | "suffix"
  | "label"
  | "helptext"
  | "secondhelptext"
  | "state"
  | "form"
  | "visibilityToggle"
  | "toggleIcon"
  | "form"
> &
  Partial<Pick<ComponentProps<"input", false, InputBaseState | "error" | "success">, "state">>;

const Digit: React.FunctionComponent<FProps> = ({ state = "default", forwardref, width = "4rem", maxLength, ...props }) => {
  const [classNames, rest] = useClassnames("input-digit shadow__form-4", props);

  return (
    <Input
      type="text"
      state={state}
      floatingplaceholder={false}
      placeholder=""
      className={classNames}
      characterLimit={false}
      forwardref={forwardref}
      maxLength={maxLength}
      width={width}
      data-testid="input-digit"
      {...rest}
    />
  );
};

Digit.displayName = "InputDigit";

export default Digit;
