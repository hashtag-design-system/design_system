import { AnimateSharedLayout, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { ColorSystemObj, ConfigVariables } from "../../config";
import { useAnimateCheckmark, useClassnames, useConfigContext, useDisabled, useInputId } from "../../utils";
import Animated from "../Animated";
import { checkmarkVariants } from "../Animated/Checkmark";
import { Base, ComponentProps } from "../__helpers__";
import { SelectionInputFProps, SelectionInputStates } from "../__helpers__/SelectionInput/Base";

type CustomVariants = Pick<ColorSystemObj, "grey"> & Pick<ConfigVariables, "primary">

const inputVariants = {
  checked: ({ primary }: CustomVariants) => ({
    backgroundColor: primary,
    borderColor: primary,
  }),
  indeterminate: ({ grey, primary }: CustomVariants) => ({
    backgroundColor: grey["100"],
    borderColor: primary,
  }),
  initial: ({ grey }: CustomVariants) => ({ backgroundColor: grey["100"], borderColor: grey["500"] }),
  pressed: ({ primary }: CustomVariants) => ({ borderColor:primary }),
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
    const {
      colors: { grey },
      variables: { primary },
    } = useConfigContext();

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
              custom={{ grey, primary } as CustomVariants}
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
                  stroke={primary}
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
