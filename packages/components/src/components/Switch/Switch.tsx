import { motion } from "framer-motion";
import React, { useState } from "react";
import { IconPropType } from "../../typings";
import { useClassnames, useInputId } from "../../utils/hooks";
import { Base, ReactProps } from "../__helpers__";
import { SelectionInputFProps } from "../__helpers__/SelectionInput/Base";

// See -> Switch animation in https://codesandbox.io/s/framer-motion-2-layout-animations-kij8p?from-embed
const boxVariants = {
  on: {
    backgroundColor: "var(--primary)",
  },
  initial: {
    backgroundColor: "var(--grey-5)",
  },
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const longSpring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const SwitchStates = ["off", "focus-visible", "on", "disabled|off", "disabled|on"] as const;
export type SwitchState = typeof SwitchStates[number];

export type SwitchElementsType = {
  position?: "right" | "toggle";
};

export type Props = {
  icon?: IconPropType & SwitchElementsType;
  insideText?: { value: string } & SwitchElementsType;
};

export type FProps = Props & SelectionInputFProps<SwitchState>;

const Switch = React.forwardRef<HTMLLabelElement, FProps>(
  ({ defaultChecked = false, checked, state = "off", label, groupName, icon, insideText, ...props }, ref) => {
    const id = useInputId(props.id);
    const [isOn, setIsOn] = useState(defaultChecked || state.includes("on"));
    const [classNames, rest] = useClassnames(
      `switch selection-input__box flex-row-flex-start-center ${state.includes("disabled") ? "disabled" : ""} ${
        state === "focus-visible" ? "focus-visible" : ""
      }`,
      props
    );

    if (icon && insideText) {
      throw new Error("You can only pass an Icon or a text inside the <Switch /> component");
    }

    const handleChange = () => {
      if (checked !== undefined) {
        checked = isOn;
      }
    };

    const handleClick = () => {
      if (state !== "on" && !state.includes("disabled")) {
        setIsOn(!isOn);
      }
    };

    return (
      <Base type="checkbox" id={id} label={label} checked={isOn} ref={ref} onChange={() => handleChange()}>
        <motion.label
          id={id}
          className={classNames}
          role="radio"
          tabIndex={state.includes("disabled") ? -1 : 0}
          initial={boxVariants.initial}
          animate={isOn ? "on" : "initial"}
          variants={boxVariants}
          transition={{ duration: 0.2 }}
          ref={ref}
          onClick={() => handleClick()}
          onChange={() => handleChange()}
          data-state={state}
          data-ison={isOn}
          aria-checked={isOn}
          {...rest}
        >
          <motion.div
            className="switch__handler shadow__form-4"
            layout
            transition={insideText && insideText.value.length >= 5 ? longSpring : spring}
          />
          {insideText && (
            <motion.span className="switch__span body-14" data-position={insideText.position ? insideText.position : undefined}>
              {insideText.value}
            </motion.span>
          )}
        </motion.label>
      </Base>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
