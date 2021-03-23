import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ColorSystemObj, ConfigVariables } from "../../config";
import { useClassnames, useConfigContext, useDisabled, useInputId } from "../../utils";
import { Base, ComponentProps } from "../__helpers__";
import { SelectionInputFProps, SelectionInputState } from "../__helpers__/SelectionInput/Base";

// * Please set the `defaultChecked` property, if you would like the user to toggle it again by `onClick`

type CustomVariants = { isDisabled: boolean } & Pick<ColorSystemObj, "grey"> & Pick<ConfigVariables, "primary">;

const variants = {
  checked: ({ isDisabled, grey, primary }: CustomVariants) => ({
    borderColor: isDisabled ? grey["500"] : primary,
    borderWidth: "7px",
  }),
  initial: ({ grey }: CustomVariants) => ({ borderColor: grey["500"], borderWidth: "2px" }),
  pressed: ({ primary }: CustomVariants) => ({
    borderColor: primary,
    borderWidth: "5px",
    scale: 0.75,
  }),
};

export type RadioButtonState = SelectionInputState;

export type FProps = ComponentProps<"input", false, RadioButtonState> &
  Pick<SelectionInputFProps, "label"> & {
    onValue?: (newVal: boolean) => void;
  };

const RadioButton = React.forwardRef<HTMLInputElement, FProps>(
  ({ defaultChecked = false, state = "default", checked, label, style, onClick, onValue, ...props }, ref) => {
    const id = useInputId(props.id);
    // It applies also for the `disabled|checked` state, without applying to the `disabled|unchecked` state
    // that the `state.includes("checked")` would
    const [isChecked, setIsChecked] = useState(defaultChecked || state === "checked" || state === "disabled|checked");
    const isDisabled = useDisabled(props, state) || state.includes("disabled");
    const [classNames, rest] = useClassnames(
      `radio-button selection-input__box ${!isDisabled ? "shadow-sm" : "disabled"} ${state === "focus-visible" ? state : ""}`,
      props
    );

    const {
      colors: { grey },
      variables: { primary },
    } = useConfigContext();

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (!isDisabled) setIsChecked(!isChecked);

      if (onClick) onClick(e);
    };

    useEffect(() => {
      if (checked !== undefined) setIsChecked(checked);
    }, [checked]);

    useEffect(() => {
      if (onValue) onValue(isChecked);
    }, [isChecked]);

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
            custom={{ isDisabled: state === "disabled|checked", grey, primary } as CustomVariants}
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
