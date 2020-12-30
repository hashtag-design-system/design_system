import { Color } from "framer";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IconPropType } from "../../typings";
import { error } from "../../utils";
import { useClassnames, useDisabled, useInputId } from "../../utils/hooks";
import { Base } from "../__helpers__";
import { SelectionInputFProps } from "../__helpers__/SelectionInput/Base";

const grey5 = Color("#d6d6d6").toValue();
const primary = Color("#0303ff").toValue();

// See -> Switch animation in https://codesandbox.io/s/framer-motion-2-layout-animations-kij8p?from-embed
const boxVariants = {
  on: {
    backgroundColor: primary,
  },
  initial: {
    backgroundColor: grey5,
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
  icon?: { component: IconPropType } & SwitchElementsType;
  insideText?: { value: string } & SwitchElementsType;
};

export type FProps = Props & SelectionInputFProps<SwitchState>;

const Switch = React.forwardRef<HTMLLabelElement, FProps>(
  ({ defaultChecked = false, label, groupName, icon, insideText, onClick, incheck, ...props }, ref) => {
    const { state = "off" } = props;
    const id = useInputId(props.id);
    const isDisabled = useDisabled(props) || state.includes("disabled");
    const [isOn, setIsOn] = useState(defaultChecked || state.includes("on"));
    const [classNames, rest] = useClassnames(
      `switch selection-input__box flex-row-flex-start-center ${isDisabled ? "disabled" : ""} ${
        state === "focus-visible" ? "focus-visible" : ""
      }`,
      props
    );

    const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
      if (state !== "on" && !isDisabled) {
        setIsOn(!isOn);

        if (onClick) {
          onClick(e);
        }
      }
    };

    useEffect(() => {
      if (incheck) {
        incheck(isOn);
      }
    }, [incheck, isOn]);

    if (icon && insideText) {
      error("You can only pass an Icon or a text inside the <Switch /> component");
      return null;
    }

    return (
      <Base type="checkbox" id={id} label={label} checked={isOn} ref={ref}>
        <motion.label
          htmlFor={id}
          className={classNames}
          role="checkbox"
          tabIndex={isDisabled ? -1 : 0}
          initial="initial"
          animate={isOn ? "on" : "initial"}
          variants={boxVariants}
          transition={{ duration: 0.2 }}
          ref={ref}
          onClick={e => handleClick(e)}
          onKeyDownCapture={e => e.code === "Space" && handleClick(e as any)}
          data-state={state}
          data-ison={isOn}
          aria-checked={isOn}
          data-testid="switch-btn"
          {...rest}
        >
          <motion.div
            className="switch__handler shadow__form-4"
            layout
            transition={insideText && insideText.value.length >= 5 ? longSpring : spring}
          />
          {insideText ? (
            <span
              className="switch__span body-14"
              data-testid="switch-inside-text"
              data-position={insideText.position ? insideText.position : undefined}
            >
              {insideText.value}
            </span>
          ) : icon ? (
            <span
              className="switch__span body-14"
              data-testid="switch-inside-icon"
              data-position={icon.position ? icon.position : undefined}
            >
              {icon.component}
            </span>
          ) : null}
        </motion.label>
      </Base>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
