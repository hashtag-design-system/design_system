import { AnimateSharedLayout, motion, useMotionValue, useTransform } from "framer-motion";
import React, { useMemo, useState } from "react";
import { SelectionInputProps, SelectionInputState } from "../../typings";
import { useClassnames, useInputId } from "../../utils";
import { Base } from "../__helpers__";

// See -> https://codesandbox.io/s/framer-motion-svg-checkbox-kqm7y?file=/src/Example.tsx:137-300
const tickVariants = {
  pressed: (isChecked: boolean) => ({
    pathLength: isChecked ? 0.75 : 0.3,
  }),
  checked: { pathLength: 1 },
  initial: { pathLength: 0 },
};

const boxVariants = {
  checked: (isIndeterminate: boolean) => ({
    backgroundColor: !isIndeterminate ? "var(--primary)" : undefined,
    borderColor: "var(--primary)",
  }),
  initial: { backgroundColor: "var(--grey-1)", borderColor: "var(--grey-5)" },
  pressed: (isIndeterminate: boolean) => ({ scale: !isIndeterminate ? 0.75 : 1, borderColor: "var(--primary)" }),
};

export type CheckboxState = SelectionInputState | "indeterminate";

export type Props = Omit<SelectionInputProps, "state"> & { state?: CheckboxState };

export const Checkbox = React.forwardRef<HTMLLabelElement, Props>(
  ({ defaultChecked = false, checked, state = "unchecked", label, groupName, ...props }, ref) => {
    const id = useInputId(props.id);
    const [isChecked, setIsChecked] = useState(defaultChecked || state === "checked" || state === "disabled|checked");
    const [classNames, rest] = useClassnames(
      `checkbox selection-input__box ${state !== "disabled|checked" && state !== "disabled|unchecked" ? "shadow-2" : "disabled"} ${
        state === "focus-visible" ? "focus-visible" : ""
      }`,
      props
    );

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

    // Animation state
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

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
            <motion.svg whileTap={whileTap} initial={false} width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              {!isIndeterminate ? (
                <motion.path
                  d="M1.75 7.156l3.55 3.658 7.43-7.897"
                  fill="transparent"
                  stroke="var(--grey-1)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={tickVariants}
                  style={{ pathLength, opacity }}
                  custom={isChecked}
                  transition={{ duration: 0.2 }}
                />
              ) : (
                <motion.path
                  d="M1.75 7.583h10.5"
                  fill="transparent"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  initial={tickVariants.initial}
                  animate={tickVariants.checked}
                  style={{ pathLength, opacity }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.svg>
          </motion.label>
        </AnimateSharedLayout>
      </Base>
    );
  }
);

export default Checkbox;
