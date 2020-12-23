import { AnimateSharedLayout, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useAnimateCheckmark, useClassnames, useDisabled, useInputId } from "../../utils/hooks";
import { Animated, Base } from "../__helpers__";
import { checkmarkVariants } from "../__helpers__/Animated/Checkmark";
import { SelectionInputFProps, SelectionInputStates } from "../__helpers__/SelectionInput/Base";

const boxVariants = {
  checked: (isIndeterminate: boolean) => ({
    backgroundColor: !isIndeterminate ? "var(--primary)" : undefined,
    borderColor: "var(--primary)",
  }),
  initial: { backgroundColor: "var(--grey-1)", borderColor: "var(--grey-5)" },
  pressed: (isIndeterminate: boolean) => ({ scale: !isIndeterminate ? 0.75 : 1, borderColor: "var(--primary)" }),
};

export const CheckboxStates = [...SelectionInputStates, "indeterminate"] as const;
export type CheckboxState = typeof CheckboxStates[number];

export type FProps = SelectionInputFProps<CheckboxState>;

const Checkbox = React.forwardRef<HTMLLabelElement, FProps>(
  ({ defaultChecked = false, label, groupName, onChange, onClick, incheck, ...props }, ref) => {
    const { state = "default" } = props;
    const id = useInputId(props.id);
    const [isChecked, setIsChecked] = useState(defaultChecked || state === "checked" || state === "disabled|checked");
    const isDisabled = useDisabled(props) || state.includes("disabled");
    const [classNames, rest] = useClassnames(
      `checkbox selection-input__box ${
        state !== "disabled|checked" && state !== "disabled|unchecked" && !isDisabled ? "shadow-sm" : "disabled"
      } ${state === "focus-visible" ? "focus-visible" : ""}`,
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
      <Base type="checkbox" label={label} id={id} checked={isChecked} ref={ref} className="flex-row-center-center">
        <AnimateSharedLayout>
          <motion.label
            htmlFor={id}
            animate={isChecked || (isIndeterminate && state !== "pressed") ? "checked" : state === "pressed" ? "pressed" : "initial"}
            whileTap={whileTap}
            className={classNames}
            ischecked={isChecked}
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
            aria-labelledby={id}
            {...rest}
          >
            <Animated.Checkmark width={14} whileTap={whileTap} initial={false} custom={isChecked}>
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
