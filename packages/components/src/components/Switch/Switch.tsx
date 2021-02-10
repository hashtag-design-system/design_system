import { motion } from "framer-motion";
import React, { useState } from "react";
import { ColorSystemObj, ConfigVariables } from "../../config";
import { IconPropType } from "../../typings";
import { error, useClassnames, useDisabled, useInputId, useConfigContext } from "../../utils";
import { Base, ComponentProps, SelectionInputFProps } from "../__helpers__";

// See -> Switch animation in https://codesandbox.io/s/framer-motion-2-layout-animations-kij8p?from-embed

type CustomVariants = Pick<ColorSystemObj, "grey"> & Pick<ConfigVariables, "primary">;

const boxVariants = {
  on: ({ primary }: CustomVariants) => ({
    backgroundColor: primary,
  }),
  initial: ({ grey }: CustomVariants) => ({
    backgroundColor: grey["500"],
  }),
};

const circleVariants = {
  on: {
    left: "auto",
    right: "5px",
  },
  initial: {
    left: "6px",
    right: "auto",
  },
};

const spring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const longSpring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const SwitchStates = ["default", "focus-visible", "on", "disabled|off", "disabled|on"] as const;
export type SwitchState = typeof SwitchStates[number];

export type SwitchElementsType = {
  position?: "right" | "toggle";
};

export type Props = {
  icon?: { component: IconPropType } & SwitchElementsType;
  insideText?: { value: string } & SwitchElementsType;
};

export type FProps = Props & ComponentProps<"input", false, SwitchState> & Pick<SelectionInputFProps, "label">;

const Switch = React.forwardRef<HTMLInputElement, FProps>(
  ({ defaultChecked = false, label, icon, insideText, state = "default", onClick, ...props }, ref) => {
    const id = useInputId(props.id);
    const isDisabled = useDisabled(props, state) || state.includes("disabled");
    const [isOn, setIsOn] = useState(defaultChecked || state.includes("on"));
    const [classNames, rest] = useClassnames(
      `switch selection-input__box ${isDisabled ? "disabled" : ""} ${state === "focus-visible" ? "focus-visible" : ""}`,
      props
    );

    const { colors: { grey }, variables: { primary } } = useConfigContext();

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (state !== "on" && !isDisabled) {
        setIsOn(!isOn);
      }

      if (onClick) {
        onClick(e);
      }
    };

    if (icon && insideText) {
      error("You can only pass an Icon or a text inside the <Switch /> component");
      return null;
    }

    return (
      <Base id={id} label={label}>
        <div className="switch__container" data-testid="switch-container">
          <motion.input
            id={id}
            type="checkbox"
            value={isOn}
            className={classNames}
            role="checkbox"
            tabIndex={isDisabled ? -1 : 0}
            initial="initial"
            animate={isOn ? "on" : "initial"}
            variants={boxVariants}
            custom={{ grey, primary } as CustomVariants}
            transition={{ duration: 0.2 }}
            ref={ref}
            onClick={e => handleClick(e)}
            aria-checked={isOn}
            aria-disabled={isDisabled}
            data-state={state}
            data-insidetext={insideText ? true : false}
            data-testid="switch-btn"
            disabled={isDisabled === true ? true : false}
            {...rest}
          />
          <div className="switch__handler__container" data-testid="switch-handler-container">
            <div className="switch__handler__container--second">
              <motion.div
                className="switch__handler shadow__form-4"
                layout
                variants={circleVariants}
                initial="initial"
                animate={isOn ? "on" : "initial"}
                transition={insideText && insideText.value.length >= 5 ? longSpring : spring}
              />
              {insideText ? (
                <span
                  className="switch__span"
                  data-testid="switch-inside-text"
                  data-position={insideText.position ? insideText.position : "right"}
                >
                  {insideText.value}
                </span>
              ) : icon ? (
                <span
                  className="switch__span"
                  data-testid="switch-inside-icon"
                  data-position={icon.position ? icon.position : "right"}
                >
                  {icon.component}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Base>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
