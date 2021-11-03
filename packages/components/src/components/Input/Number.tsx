import {
  forwardRef,
  NumberDecrementStepper,
  NumberDecrementStepperProps,
  NumberIncrementStepper,
  NumberIncrementStepperProps,
  NumberInput,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputProps,
  useMergeRefs,
  useMultiStyleConfig
} from "@chakra-ui/react";
import { Icon } from "@hashtag-design-system/icons";
import { motion, MotionProps } from "framer-motion";
import React, { useState } from "react";
import { InputProps } from "./index";
import { FloatingPlaceholder, InputNumberContextProvider, useInput, useInputNumberContext } from "./__helpers__";

const MotionIncrementStepper = motion<NumberIncrementStepperProps>(NumberIncrementStepper);
const MotionDecrementStepper = motion<NumberDecrementStepperProps>(NumberDecrementStepper);

/*
 * NumberGroup
 */
export type GroupProps = Pick<InputProps, "hasFloatingPlaceholder"> &
  NumberInputProps & {
    format?: (val: string) => string;
  };

export const Group = forwardRef<GroupProps, "div">(
  (
    { placeholder, hasFloatingPlaceholder = (placeholder?.length || 0) !== 0, children, format, onChange, onFocus, onBlur, ...props },
    ref
  ) => {
    const { _internalValue, _setInternalValue, handleClear, ...rest } = useInput<"input">({
      ...props,
      onFocus,
      onBlur,
      hasFloatingPlaceholder,
    });

    const handleChange = (valueAsString: string, valueAsNumber: number) => {
      _setInternalValue(valueAsString);
      if (onChange) onChange(valueAsString, valueAsNumber);
    };

    return (
      <InputNumberContextProvider value={{ ...props, ...rest, _internalValue, placeholder, hasFloatingPlaceholder }}>
        {/* <Down /> */}
        <NumberInput
          width="100%"
          {...props}
          value={format ? format(_internalValue) : _internalValue}
          ref={ref}
          onChange={handleChange}
        >
          {children}
        </NumberInput>
      </InputNumberContextProvider>
    );
  }
);

Group.displayName = "InputNumberGroup";

/*
 * Number
 */
export type NumberProps = NumberInputFieldProps;

export const Number = React.forwardRef<HTMLInputElement, NumberProps>(
  ({ children, onChange, onFocus, onBlur, ...props }, propsRef) => {
    const {
      _internalValue,
      _internalRef,
      hasAlready,
      paddingLeft,
      paddingTop,
      paddingRight,
      isFocused,
      offsetLeft,
      placeholder,
      hasFloatingPlaceholder,
      handleChange,
      handleFocus,
      handleBlur,
      defaultValue,
      value,
      ...rest
    } = useInputNumberContext();

    const baseStyle = useMultiStyleConfig("NumberInput", props);
    const refs = useMergeRefs(_internalRef, propsRef);

    return (
      <>
        <NumberInputField
          paddingTop={paddingTop}
          paddingLeft={paddingLeft ? paddingLeft + "px" : undefined}
          paddingRight={paddingRight ? paddingRight + "px" : undefined}
          {...props}
          {...rest}
          placeholder={hasFloatingPlaceholder ? undefined : placeholder}
          ref={refs}
          onChange={e => {
            handleChange(e);
            if (onChange) onChange(e);
          }}
          onFocus={e => {
            handleFocus(e);
            if (onFocus) onFocus(e);
          }}
          onBlur={e => {
            handleBlur(e);
            if (onBlur) onBlur(e);
          }}
        />
        <FloatingPlaceholder
          placeholder={placeholder}
          hasFloatingPlaceholder={hasFloatingPlaceholder}
          _internalValue={_internalValue}
          isFocused={isFocused}
          hasAlreadyLabel={hasAlready.label}
          offsetLeft={offsetLeft}
          defaultPaddingX={+(baseStyle.field.px?.toString() || 0) * 0.25}
          paddingLeft={paddingLeft}
        />
        {children}
      </>
    );
  }
);

Number.displayName = "InputNumber";

/*
 * Stepper
 */
export type StepperProps = (NumberIncrementStepperProps | NumberDecrementStepperProps) & {
  type: "increment" | "decrement";
};

export const Stepper: React.FC<StepperProps> = forwardRef<StepperProps, "div">(({ type }, ref) => {
  const [hasHover, setHasHover] = useState(false);

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    setHasHover(e.type === "mouseover" ? true : false);
  };

  const rest: (NumberIncrementStepperProps | NumberDecrementStepperProps) &
    MotionProps &
    Pick<React.ComponentPropsWithRef<"div">, "ref"> = {
    ref,
    flex: hasHover ? "none" : 1,
    animate: { height: hasHover ? "62.5%" : "50%", transition: { duration: 0.2 } },
    onMouseOver: handleHover,
    onMouseOut: handleHover,
  };

  return type === "increment" ? (
    <MotionIncrementStepper {...rest}>
      <Icon.Chevron.Up />
    </MotionIncrementStepper>
  ) : (
    <MotionDecrementStepper {...rest}>
      <Icon.Chevron.Down />
    </MotionDecrementStepper>
  );
});

Stepper.displayName = "InputNumberIncrementStepperProps";
