import { Color } from "framer";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useClassnames, useDisabled, useInputId } from "../../utils/hooks";
import { Base } from "../__helpers__";
import { SelectionInputFProps, SelectionInputState } from "../__helpers__/SelectionInput/Base";

// * Please set the `defaultChecked` property, if you would like the user to toggle it again by `onClick`

const grey5 = Color("#d6d6d6").toValue();
const primary = Color("#0303ff").toValue();

const variants = {
  checked: (isDisabled: boolean) => ({
    borderColor: isDisabled ? grey5 : primary,
    borderWidth: "7px",
  }),
  initial: { borderColor: grey5, borderWidth: "2px" },
  pressed: {
    borderColor: primary,
    borderWidth: "5px",
    scale: 0.75,
  },
};

export type RadioButtonState = SelectionInputState;

export type Props = SelectionInputFProps;

const RadioButton = React.forwardRef<HTMLLabelElement, Props>(
  ({ defaultChecked = false, checked, state = "default", label, groupName, style, ...props }, ref) => {
    const id = useInputId(props.id);
    // * It applies also for the `disabled|checked` state, without applying to the `disabled|unchecked` state
    // * that the `state.includes("checked")` would
    const [isChecked, setIsChecked] = useState(defaultChecked || state === "checked" || state === "disabled|checked");
    const isDisabled = useDisabled(props, state) || state.includes("disabled");
    const [classNames, rest] = useClassnames(
      `radio-button selection-input__box ${!isDisabled ? "shadow-sm" : "disabled"} ${state === "focus-visible" ? state : ""}`,
      props
    );

    const handleChange = () => {
      if (checked !== undefined) {
        checked = isChecked;
      }
    };

    const handleClick = () => {
      if (state !== "checked" && !isDisabled) {
        setIsChecked(!isChecked);
      }
    };

    const whileTap = !isDisabled && state !== "checked" ? "pressed" : undefined;

    return (
      <Base
        type="radio"
        id={id}
        label={label}
        checked={isChecked}
        ref={ref}
        groupName={groupName}
        onChange={() => handleChange()}
        onClick={() => handleClick()}
      >
        <AnimatePresence>
          <motion.label
            htmlFor={id}
            className={classNames}
            role="radio"
            tabIndex={isDisabled ? -1 : 0}
            initial="initial"
            // * It is a bug if we only check for wether the input `isChecked`
            // * Because it will have the check state if user clicks, while `state === "pressed"`
            // * The same applies to the `whileTap` property
            animate={isChecked && state !== "pressed" ? "checked" : state === "pressed" ? "pressed" : "initial"}
            whileTap={whileTap}
            variants={variants}
            transition={{ duration: 0.15 }}
            custom={state === "disabled|checked"}
            ref={ref}
            style={{ ...style, ...variants.initial }}
            onChange={() => handleChange()}
            onClick={e => {
              e.preventDefault();
              handleClick();
            }}
            onKeyDownCapture={e => e.code === "Space" && handleClick()}
            data-state={state}
            aria-checked={isChecked}
            data-testid="radio-btn"
            {...rest}
          />
        </AnimatePresence>
      </Base>
    );
  }
);

RadioButton.displayName = "RadioButton";

export default RadioButton;
