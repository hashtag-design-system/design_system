import { Color } from "framer";
import { AnimateSharedLayout, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useAnimateCheckmark, useClassnames, useDisabled, useInputId } from "../../utils/hooks";
import { Animated, Base } from "../__helpers__";
import { checkmarkVariants } from "../__helpers__/Animated/Checkmark";
import { SelectionInputFProps, SelectionInputStates } from "../__helpers__/SelectionInput/Base";

const grey1 = Color("#ffffff").toValue();
const grey5 = Color("#d6d6d6").toValue();
const primary = Color("#0303ff").toValue();

const boxVariants = {
  checked: (isIndeterminate: boolean) => ({
    backgroundColor: !isIndeterminate ? primary : undefined,
    borderColor: primary,
  }),
  initial: { backgroundColor: grey1, borderColor: grey5 },
  pressed: (isIndeterminate: boolean) => ({ scale: !isIndeterminate ? 0.8 : 1, borderColor: primary }),
};

export const CheckboxStates = [...SelectionInputStates, "indeterminate"] as const;
export type CheckboxState = typeof CheckboxStates[number];

export type FProps = SelectionInputFProps<CheckboxState>;

const Checkbox = React.forwardRef<HTMLLabelElement, FProps>(
  ({ defaultChecked = false, label, groupName, state = "default", onChange, onClick, incheck, onKeyDownCapture, ...props }, ref) => {
    const id = useInputId(props.id);
    const [isChecked, setIsChecked] = useState(defaultChecked || state === "checked" || state === "disabled|checked");
    const isDisabled = useDisabled(props, state) || state.includes("disabled");
    const [classNames, rest] = useClassnames(
      `checkbox selection-input__box ${
        state !== "disabled|checked" && state !== "disabled|unchecked" && !isDisabled ? "shadow-sm" : "disabled"
      } ${state === "focus-visible" ? state : ""}`,
      props
    );

    const [pathLength, opacity] = useAnimateCheckmark();

    const handleClick = (e?: React.MouseEvent<HTMLLabelElement>) => {
      if (!state.includes("disabled") && !isDisabled) {
        setIsChecked(!isChecked);
        if (onClick && e) onClick(e);
      }
    };

    useEffect(() => {
      if (incheck) {
        incheck(isChecked);
      }
    }, [incheck, isChecked]);

    const isIndeterminate = useMemo(() => state === "indeterminate", [state]);

    const whileTap = !state.includes("disabled") && !isDisabled && state !== "checked" ? "pressed" : undefined;

    return (
      <Base
        type="checkbox"
        label={label}
        id={id}
        checked={isChecked}
        ref={ref}
        className="flex-row-center-center"
        groupName={groupName}
      >
        <AnimateSharedLayout>
          <motion.label
            htmlFor={id}
            animate={isChecked || (isIndeterminate && state !== "pressed") ? "checked" : state === "pressed" ? "pressed" : "initial"}
            whileTap={whileTap}
            className={classNames}
            data-ischecked={isChecked ? "true" : "false"}
            variants={boxVariants}
            transition={{ duration: 0.15 }}
            custom={isIndeterminate}
            role="checkbox"
            tabIndex={isDisabled ? -1 : 0}
            ref={ref}
            onClick={e => {
              e.preventDefault();
              handleClick(e);
            }}
            onKeyDownCapture={e => e.code === "Space" && handleClick()}
            aria-checked={state === "indeterminate" ? "mixed" : isChecked}
            data-testid="checkbox"
            {...rest}
          >
            <Animated.Checkmark size={14} whileTap={whileTap} initial={false} custom={isChecked}>
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
                  transition={{ duration: 0.2 }}
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

Checkbox.displayName = "Checkbox";

export default Checkbox;
