import React from "react";
import { useClassnames, useDisabled } from "../../utils/hooks";

// const variants = {
//   checked: { pathLength: 1 },
//   initial: { pathLength: 0 },
// };

const ButtonTypes = ["primary", "secondary", "danger"] as const;
export type ButtonType = typeof ButtonTypes[number];
const ButtonStates = ["default", "disabled", "focus-visible", "hover"] as const;
export type ButtonState = typeof ButtonStates[number];

export type Props = {
  type?: ButtonType;
  state?: ButtonState;
  block?: boolean;
  pill?: boolean;
};

export type FProps = Props & Omit<React.ComponentPropsWithRef<"button">, "type">;

const Button: React.FC<FProps> = ({ type = "primary", state = "default", block = false, pill = false, children, ...props }) => {
  let [classNames, rest] = useClassnames(`btn btn-${type} btn-default-font shadow__form-2`, props);
  const isDisabled = useDisabled(props, state);

  // Animation state
  // const pathLength = useMotionValue(0);

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
    // <div className="flex">
    <button className={classNames} disabled={isDisabled ? true : false} {...rest}>
      {children}
    </button>
    /* {state === "loading" && (
        <motion.svg className="btn__loading-icon" width={78} height={41} fill="transparent">
          <motion.path
            d="M71.15 1H6a5 5 0 00-5 5v28a5 5 0 005 5h65.15a5 5 0 005-5V6a5 5 0 00-5-5z"
            strokeWidth={4}
            className="btn__loading-icon__path"
            variants={tickVariants}
            animate="checked"
            transition={{ duration: 5 }}
            style={{ pathLength }}
          />
        </motion.svg>
      )} */
    // </div>
  );
};

Button.displayName = "Button";

export default Button;
