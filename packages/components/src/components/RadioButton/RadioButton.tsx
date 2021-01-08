import { Color } from "framer";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useClassnames, useDisabled, useInputId } from "../../utils/hooks";
import { Base, ComponentProps } from "../__helpers__";
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

export type FProps = ComponentProps<"input", false, RadioButtonState> & Pick<SelectionInputFProps, "label">;

const RadioButton = React.forwardRef<HTMLInputElement, FProps>(
  ({ defaultChecked = false, state = "default", checked, label, style, onClick, ...props }, ref) => {
    const id = useInputId(props.id);
    // It applies also for the `disabled|checked` state, without applying to the `disabled|unchecked` state
    // that the `state.includes("checked")` would
    const [isChecked, setIsChecked] = useState(defaultChecked || state === "checked" || state === "disabled|checked");
    const isDisabled = useDisabled(props, state) || state.includes("disabled");
    const [classNames, rest] = useClassnames(
      `radio-button selection-input__box ${!isDisabled ? "shadow-sm" : "disabled"} ${state === "focus-visible" ? state : ""}`,
      props
    );

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (!isDisabled) {
        setIsChecked(!isChecked);
      }

      if (onClick) {
        onClick(e);
      }
    };

    useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const whileTap = !isDisabled && state !== "checked" ? "pressed" : undefined;

    return (
      <Base id={id} label={label} className="radio-button">
        <AnimatePresence>
          <motion.input
            id={id}
            type="radio"
            value={isChecked}
            role="radio"
            className={classNames}
            tabIndex={isDisabled ? -1 : 0}
            initial="initial"
            // It is a bug if we only check for wether the input `isChecked`
            // Because it will have the check state if user clicks, while `state === "pressed"`
            // The same applies to the `whileTap` property
            animate={isChecked ? "checked" : !isDisabled && state === "pressed" ? "pressed" : "initial"}
            whileTap={whileTap}
            variants={variants}
            transition={{ duration: 0.15 }}
            custom={state === "disabled|checked"}
            ref={ref}
            style={{ ...style, ...variants.initial }}
            onClick={e => {
              e.preventDefault();
              handleClick(e);
            }}
            aria-checked={isChecked}
            aria-disabled={isDisabled}
            data-state={state}
            data-testid="radio-btn"
            disabled={isDisabled === true ? true : false}
            {...rest}
          />
        </AnimatePresence>
      </Base>
    );
  }
);

RadioButton.displayName = "RadioButton";

export default RadioButton;
