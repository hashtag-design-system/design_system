import React from "react";
import { ComponentStates } from "../../config/.index";
import { IconProp } from "../../typings";
import { tuple } from "../../utils/type";
import styles from "./Button.module.scss";

const ButtonTypes = tuple("default", "pill", "danger");
export type ButtonType = typeof ButtonTypes[number];
export type ButtonState = typeof ComponentStates[number];

type Props = {
  type?: ButtonType;
  state?: ButtonState;
  outlined?: boolean;
  icon?: IconProp;
};

const Button: React.FC<Props & React.HTMLAttributes<HTMLButtonElement>> = ({
  type = "default",
  state = "default",
  outlined = false,
  icon = {
    size: 24,
  },
  children,
  ...rest
}) => {
  return (
    <button className={styles.button} {...rest}>
      <h1>{children}</h1>
      <p>Hye</p>
    </button>
  );
};

Button.displayName = "Button";

export default Button;
