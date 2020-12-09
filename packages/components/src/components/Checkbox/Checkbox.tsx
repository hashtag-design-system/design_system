import { AnimateSharedLayout, motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { useAnimateCheckmark, useClassnames, useInputId } from "../../utils/hooks";
import { Animated, Base, ReactProps } from "../__helpers__";
import { checkmarkVariants } from "../__helpers__/Animated/Checkmark";
import { SelectionInputProps, SelectionInputState } from "../__helpers__/SelectionInput/Base";

const boxVariants = {
  checked: (isIndeterminate: boolean) => ({
    backgroundColor: !isIndeterminate ? "var(--primary)" : undefined,
    borderColor: "var(--primary)",
  }),
  initial: { backgroundColor: "var(--grey-1)", borderColor: "var(--grey-5)" },
  pressed: (isIndeterminate: boolean) => ({ scale: !isIndeterminate ? 0.75 : 1, borderColor: "var(--primary)" }),
};

export type CheckboxState = SelectionInputState | "indeterminate";

export type Props = Omit<SelectionInputProps, "state"> & ReactProps<undefined, CheckboxState>["input_state_obj"];

const Checkbox = React.forwardRef<HTMLLabelElement, Props>(
  ({ defaultChecked = false, checked, state = "default", label, groupName, ...props }, ref) => {
    const id = useInputId(props.id);
    const [isChecked, setIsChecked] = useState(defaultChecked || state === "checked" || state === "disabled|checked");
    const [classNames, rest] = useClassnames(
      `checkbox selection-input__box ${state !== "disabled|checked" && state !== "disabled|unchecked" ? "shadow-sm" : "disabled"} ${
        state === "focus-visible" ? "focus-visible" : ""
      }`,
      props
    );

    const [pathLength, opacity] = useAnimateCheckmark();

    const handleChange = () => {
      if (checked !== undefined) {
        checked = isChecked;
      }
    };

    const handleClick = () => {
      if (!state.includes("disabled")) {
        setIsChecked(!isChecked);
      }
    };

    const isIndeterminate = useMemo(() => state === "indeterminate", [state]);

    const whileTap = !state.includes("disabled") && state !== "checked" ? "pressed" : undefined;

    return (
      <Base type="checkbox" label={label} id={id} onChange={() => handleChange()} checked={isChecked} ref={ref}>
        <AnimateSharedLayout>
          <motion.label
            htmlFor={id}
            animate={isChecked || (isIndeterminate && state !== "pressed") ? "checked" : state === "pressed" ? "pressed" : "initial"}
            whileTap={whileTap}
            className={classNames}
            variants={boxVariants}
            transition={{ duration: 0.15 }}
            custom={isIndeterminate}
            role="checkbox"
            tabIndex={state.includes("disabled") ? -1 : 0}
            ref={ref}
            onChange={() => handleChange()}
            onClick={e => handleClick()}
            aria-checked={isChecked}
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
