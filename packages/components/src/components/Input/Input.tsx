import {
  ComponentWithAs,
  FormLabel as ChakraFormLabel,
  FormLabelProps,
  forwardRef,
  Input as ChakraInput,
  InputGroup,
  InputProps,
  useMergeRefs,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { Number, Stepper, Group } from "./Number";
import { Password } from "./Password";
import { TextArea } from "./TextArea";
import { ClearBtn, FloatingPlaceholder, useInput } from "./__helpers__";

export const MotionLabel = motion<FormLabelProps>(ChakraFormLabel);

type SubComponents = {
  Group: typeof InputGroup;
  Password: typeof Password;
  TextArea: typeof TextArea;
  NumberGroup: typeof Group;
  Number: typeof Number;
  NumberStepper: typeof Stepper;
};

const InputTypes = [
  "tel",
  "text",
  "textarea",
  "email",
  "file",
  "hidden",
  "number",
  "password",
  "checkbox",
  "radio",
  "range",
  "search",
  "button",
  "url",
] as const;
export type InputType = typeof InputTypes[number];

export type Props = Omit<InputProps, "type"> & {
  type?: InputType;
  hasFloatingPlaceholder?: boolean;
  hasClearBtn?: boolean;
};

// @ts-expect-error
const Input: ComponentWithAs<"input", Props> & SubComponents = forwardRef<Props, "input">(
  (
    {
      type = "text",
      placeholder,
      hasFloatingPlaceholder = (placeholder?.length || 0) !== 0,
      hasClearBtn,
      children,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    propsRef
  ) => {
    const {
      _internalValue,
      _internalRef,
      isFocused,
      hasAlready,
      offsetLeft,
      paddingLeft,
      paddingRight,
      paddingTop,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear,
    } = useInput<"input">({ ...props, onChange, onFocus, onBlur, hasFloatingPlaceholder });

    const baseStyle = useMultiStyleConfig("Input", props);
    const refs = useMergeRefs(_internalRef, propsRef);

    const component = (
      <>
        <ChakraInput
          placeholder={hasFloatingPlaceholder ? undefined : placeholder}
          paddingTop={paddingTop}
          type={type}
          // defaultValue={defaultValue}
          value={_internalValue}
          paddingLeft={paddingLeft ? paddingLeft + "px" : undefined}
          paddingRight={paddingRight ? paddingRight + "px" : undefined}
          ref={refs}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        <FloatingPlaceholder
          hasFloatingPlaceholder={hasFloatingPlaceholder}
          placeholder={placeholder}
          _internalValue={_internalValue}
          isFocused={isFocused}
          hasAlreadyLabel={hasAlready.label}
          offsetLeft={offsetLeft}
          defaultPaddingX={+(baseStyle.field.px?.toString() || 0) * 0.25}
          paddingLeft={paddingLeft}
        />
        <ClearBtn hasClearBtn={hasClearBtn} _internalValue={_internalValue} handleClear={handleClear} />
        {children}
      </>
    );

    return hasAlready.group ? component : <InputGroup>{component}</InputGroup>;
  }
);

Input.displayName = "Input";
// In order to be recognized by the Chakra's <FormControl> component
Input.id = ChakraInput.id;

Input.Group = InputGroup;
Input.Password = Password;
Input.TextArea = TextArea;
Input.NumberGroup = Group;
Input.Number = Number;
Input.NumberStepper = Stepper;

export default Input;
