import React from "react";
import { ComponentStates } from "../../config/index";
import { addClassnames } from "../../utils/styles";

const ButtonTypes = ["default", "primary", "danger"] as const;
export type ButtonType = typeof ButtonTypes[number];
export type ButtonState = typeof ComponentStates[number];

export type Props = {
  type?: ButtonType;
  state?: ButtonState;
  block?: boolean;
  pill?: boolean;
};

export const Button: React.FC<Props & React.HTMLAttributes<HTMLButtonElement>> = ({
  type = "default",
  state = "default",
  block = false,
  pill = false,
  children,
  ...props
}) => {
  const { className, ...rest } = props;
  let classNames = addClassnames("btn btn-default-font", props);
  if (type !== "default") {
    classNames += ` btn-${type}`;
  }
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
