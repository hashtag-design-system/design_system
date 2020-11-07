import React from "react";
import { ComponentStates } from "../../config/index";
import { addClassnames } from "../../utils/styles";

const ButtonTypes = ["primary", "secondary", "danger"] as const;
export type ButtonType = typeof ButtonTypes[number];
export type ButtonState = typeof ComponentStates[number];

export type Props = {
  type?: ButtonType;
  state?: ButtonState;
  block?: boolean;
  pill?: boolean;
};

// TODO: Test <Input.Number /> component, with new <Button /> classNames
export const Button: React.FC<Props & React.HTMLAttributes<HTMLButtonElement>> = ({
  type = "primary",
  state = "default",
  block = false,
  pill = false,
  children,
  ...props
}) => {
  const { className, ...rest } = props;
  let classNames = addClassnames(`btn btn-${type} btn-default-font shadow__form-2`, props);

  if (block) {
    classNames += " block";
  }
  if (pill) {
    classNames += " pill";
  }
  if (state !== "default") {
    classNames += ` ${state}`;
  }
  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};

Button.displayName = "Button";

export default Button;
