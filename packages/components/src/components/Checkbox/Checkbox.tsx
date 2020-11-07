import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import React, { useMemo, useState } from "react";
import { SelectionInputLabelType } from "../../typings";
import useInputId from "../../utils/hooks/useInputId";
import { addClassnames } from "../../utils/styles";
import SelectionInputLabelContainer from "../__helpers__/SelectionInputLabelContainer";

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
    backgroundColor: !isIndeterminate ? "var(--primary)" : "",
    borderColor: "var(--primary)",
  }),
  initial: { backgroundColor: "var(--grey-1)", borderColor: "var(--grey-5)" },
  pressed: (isIndeterminate: boolean) => ({ scale: !isIndeterminate ? 0.75 : 1, borderColor: "var(--primary)" }),
};

const CheckboxStates = [
  "default",
  "pressed",
  "focus-visible",
  "indeterminate",
  "checked",
  "disabled|unchecked",
  "disabled|checked",
] as const;
export type CheckboxState = typeof CheckboxStates[number];

export type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  state?: CheckboxState;
  label?: string | SelectionInputLabelType;
};

export const Checkbox = React.forwardRef<
  HTMLLabelElement,
  Props & Omit<React.HTMLAttributes<HTMLLabelElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag">
>(({ defaultChecked = false, checked, state = "default", label, ...props }, ref) => {
  const id = useInputId(props.id);
  const [isChecked, setIsChecked] = useState(defaultChecked || state === "disabled|checked");
  const isIndeterminate = useMemo(() => state === "indeterminate", [state]);
  const topOrBottom =
    label && typeof label === "object" && label.position ? ["top", "bottom"].includes(label.position) : false;
  const whileTap = !state.includes("disabled") ? "pressed" : "";

  // Animation state
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  const { className, ...rest } = props;
  let classNames = addClassnames(
    `checkbox ${state !== "disabled|checked" && state !== "disabled|unchecked" ? "shadow-2" : "disabled"}`,
    props
  );

  return (
    <div
      className="checkbox__wrapper"
      style={{
        width: props.style?.width,
        flexDirection: topOrBottom ? "column" : undefined,
        gap: topOrBottom ? "8px" : undefined,
      }}
    >
      <input
        id={id}
        type="checkbox"
        className="checkbox__hidden-input"
        onChange={() => {
          if (checked !== undefined) {
            checked = isChecked;
          }
        }}
        onClick={() => setIsChecked(!isChecked)}
        checked={isChecked}
        // hidden
        disabled={state.includes("disabled")}
      />
      <SelectionInputLabelContainer label={label}>
        {/* {label && ["top", "left"].includes(label.position) && (
          <span className="checkbox__span input-label-font">{label.value}</span>
        )} */}
        <AnimatePresence>
          <motion.label
            htmlFor={id}
            animate={isChecked || isIndeterminate ? "checked" : "initial"}
            whileTap={whileTap}
            className={classNames}
            variants={boxVariants}
            transition={{ duration: 0.15 }}
            custom={isIndeterminate}
            tabIndex={0}
            ref={ref}
            {...rest}
          >
            <motion.svg whileTap={whileTap} initial={false} width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              {!isIndeterminate ? (
                <motion.path
                  d="M1.75 7.156l3.55 3.658 7.43-7.897"
                  fill="transparent"
                  stroke={state !== "disabled|checked" ? "var(--grey-1)" : "var(--grey-7)"}
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
                  d="M2.25 9.75h13.5"
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
        </AnimatePresence>
      </SelectionInputLabelContainer>
    </div>
  );
});

export default Checkbox;
