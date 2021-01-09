import { Color } from "framer";
import { AnimateSharedLayout, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useAnimateCheckmark, useClassnames, useDisabled, useInputId } from "../../utils/hooks";
import { Base, ComponentProps } from "../__helpers__";
import { checkmarkVariants } from "../Animated/Checkmark";
import { SelectionInputFProps, SelectionInputStates } from "../__helpers__/SelectionInput/Base";
import Animated from "../Animated";

const grey1 = Color("#ffffff").toValue();
const grey5 = Color("#d6d6d6").toValue();
const primary = Color("#0303ff").toValue();

const inputVariants = {
  checked: {
    backgroundColor: primary,
    borderColor: primary,
  },
  indeterminate: {
    backgroundColor: grey1,
    borderColor: primary,
  },
  initial: { backgroundColor: grey1, borderColor: grey5 },
  pressed: { borderColor: primary },
};

const boxVariants = {
  initial: { scale: 1 },
  pressed: { scale: 0.85 },
};

export const CheckboxStates = [...SelectionInputStates, "indeterminate"] as const;
export type CheckboxState = typeof CheckboxStates[number];

export type FProps = ComponentProps<"input", false, CheckboxState> & Pick<SelectionInputFProps, "label">;

const Checkbox = React.forwardRef<HTMLInputElement, FProps>(
  ({ defaultChecked = false, label, state = "default", checked, onChange, ...props }, ref) => {
    const id = useInputId(props.id);
    const [isChecked, setIsChecked] = useState(defaultChecked || state === "checked" || state === "disabled|checked");
    const [isPressed, setIsPressed] = useState(false);
    const isDisabled = useDisabled(props, state) || state.includes("disabled");
    const [classNames, rest] = useClassnames(
      `checkbox selection-input__box ${
        state !== "disabled|checked" && state !== "disabled|unchecked" && !isDisabled ? "" : "disabled"
      } ${state === "focus-visible" ? state : ""}`,
      props
    );

    const [pathLength, opacity] = useAnimateCheckmark();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isDisabled) {
        setIsChecked(!isChecked);
        if (onChange) onChange(e);
      }
    };

    useEffect(() => {
      if (isChecked || (isChecked === false && isPressed === true)) {
        setIsPressed(false);
      }
      if (checked !== undefined) {
        setIsChecked(checked);
      }
      if (state === "indeterminate") {
        setIsChecked(defaultChecked);
      }
    }, [id, defaultChecked, checked, state, isChecked, isPressed]);

    const isIndeterminate = useMemo(() => state === "indeterminate", [state]);

    const whileTap = !isDisabled && state !== "checked" ? "pressed" : undefined;

    return (
      <Base label={label} id={id} className="flex-row-center-center">
        <AnimateSharedLayout>
          <motion.label
            initial="initial"
            animate={state === "pressed" ? "pressed" : undefined}
            whileTap={whileTap}
            onTapStart={() => setIsPressed(true)}
            onTapCancel={() => setIsPressed(false)}
            variants={boxVariants}
            className="checkbox__label__container"
            data-testid="checkbox-label-container"
          >
            <motion.input
              id={id}
              type="checkbox"
              value={isChecked || state === "disabled|checked"}
              className={classNames}
              onChange={e => handleChange(e)}
              animate={isChecked ? "checked" : isIndeterminate ? "indeterminate" : state === "pressed" ? "pressed" : "initial"}
              whileTap={whileTap}
              variants={inputVariants}
              transition={{ duration: 0.15 }}
              tabIndex={isDisabled ? -1 : 0}
              ref={ref}
              aria-checked={state === "indeterminate" ? "mixed" : isChecked}
              aria-disabled={isDisabled}
              data-ischecked={isChecked ? "true" : "false"}
              data-testid="checkbox"
              disabled={isDisabled === true ? true : false}
              {...rest}
            />
            <Animated.Checkmark size={13} whileTap={whileTap} initial={false} custom={isChecked} isPressed={isPressed}>
              {isIndeterminate && (
                <motion.path
                  d="M1.75 7.583h10.5"
                  fill="transparent"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  initial={checkmarkVariants.initial}
                  animate={checkmarkVariants.checked}
                  style={{ pathLength, opacity }}
                  transition={{ duration: 0.5 }}
                  data-testid="animated-checkmark-children-prop"
                />
              )}
            </Animated.Checkmark>
          </motion.label>
        </AnimateSharedLayout>
      </Base>
    );
  }
);

export default Checkbox;
