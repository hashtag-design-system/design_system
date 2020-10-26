import React, { ChangeEvent, useState } from "react";
import { addClassnames } from "../../utils/styles";
import { PasswordInputProps } from "./index";
import Input, { ReactInputHTMLAttributes } from "./Input";

// PasswordInputProps already has omitted props, omitted also in "this" props
export type Props = Omit<PasswordInputProps, "label" | "helpText" | "secondHelpText">;

export const Digit = React.forwardRef<HTMLInputElement, Props & Omit<ReactInputHTMLAttributes, "maxLength">>(
  ({ ...props }, ref) => {
    const { className, onChange, ...rest } = props;
    const [value, setValue] = useState<string | number>("");
    const classNames = addClassnames("input-digit shadow__form-4", props);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <Input
        value={value}
        onChange={e => handleChange(e)}
        innerRef={ref}
        type="text"
        floatingPlaceholder={false}
        className={classNames}
        maxLength={1}
        width="auto"
        {...rest}
      />
    );
  }
);

export default Digit;
