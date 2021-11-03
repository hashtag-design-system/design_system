import { WarningTwoIcon } from "@chakra-ui/icons";
import {
  chakra,
  FormControl as ChakraFormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  forwardRef,
  HelpTextProps as FormHelperTextProps,
  useFormControlContext,
  useMergeRefs,
} from "@chakra-ui/react";
import { addDomEvent, cx } from "@chakra-ui/utils";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

// Control
export type ControlProps = FormControlProps & {
  isOptional?: boolean;
};

export const Control: React.FC<ControlProps> = ({ isOptional, isRequired, ...props }) => {
  return <ChakraFormControl isRequired={!isOptional ?? isRequired ?? true} {...props} />;
};

// ErrorMessage
export type ErrorMessageProps = FormErrorMessageProps;

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, ...props }) => {
  return (
    <FormErrorMessage gridGap={2} {...props}>
      <WarningTwoIcon />
      {children}
    </FormErrorMessage>
  );
};

// HelperText
export type HelperTextProps = FormHelperTextProps & {
  showCharacterLimit?: boolean;
};

type HelperTextState = { maxLength?: number; value: string; isShown: boolean };

export const HelperText = forwardRef<HelperTextProps, "div">(({ showCharacterLimit = true, children, ...props }, propsRef) => {
  const [{ maxLength, value, isShown: isLimitShown }, setLimit] = useState<HelperTextState>({
    maxLength: undefined,
    isShown: false,
    value: "",
  });
  const internalRef = useRef<HTMLDivElement>(null);
  const refs = useMergeRefs(internalRef, propsRef);
  const _className = cx("flex-row-space-between-flex-start", props.className);

  const { id: inputId } = useFormControlContext();
  // console.log(id, ref.current?.closest(`input[id=${id}]`));

  const handleChange = (evt: Event) => {
    const e = evt as unknown as React.ChangeEvent<HTMLInputElement>;
    setLimit(prev => ({ ...prev, value: e.target.value }));
  };

  const handleFocus = (evt: Event, isShown: boolean) => {
    const e = evt as unknown as React.FocusEvent<HTMLInputElement>;
    setLimit(prev => ({ ...prev, maxLength: e.target.maxLength, isShown }));
  };

  useEffect(() => {
    const elem: HTMLInputElement | undefined = internalRef.current
      ?.closest('div[role="group"][class*="form-control"]')
      ?.querySelector(`input[id="${inputId}"], textarea[id="${inputId}"]`)!;
    if (elem) {
      setLimit(prev => ({ ...prev, value: elem.value || "", maxLength: elem.maxLength }));
      addDomEvent(elem, "input", handleChange);
      addDomEvent(elem, "focusin", e => handleFocus(e, true));
      addDomEvent(elem, "focusout", e => handleFocus(e, false));
    }
  }, [inputId]);

  return (
    <FormHelperText gridGap={4} {...props} className={_className} ref={refs}>
      {children}
      {!!maxLength && showCharacterLimit && (
        <motion.span
          style={{ whiteSpace: "nowrap" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLimitShown ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {value.length} / {maxLength}
        </motion.span>
      )}
    </FormHelperText>
  );
});

// Label
export type LabelProps = FormLabelProps;

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  // const ref = useRef<HTMLLabelElement>(null);
  const _className = cx("flex-row-space-between-flex-end", props.className);
  const { isRequired } = useFormControlContext();

  const handleRef = useCallback((node: HTMLLabelElement | null) => {
    if (!node) return;
    const parent = node.parentElement;
    if (!parent) return;
    if (parent.classList.contains("chakra-input__group")) parent.parentElement?.prepend(node);
  }, []);

  props = { ...props, ref: handleRef } as LabelProps;

  return isRequired ? (
    <FormLabel requiredIndicator={<></>} {...props}>
      {children}
    </FormLabel>
  ) : (
    <FormLabel marginRight={0} gridGap={4} {...props} className={_className}>
      {children}
      <chakra.span className="normal" color="gray.500" fontSize="sm">
        Optional
      </chakra.span>
    </FormLabel>
  );
};

Control.displayName = "FormControl";
ErrorMessage.displayName = "FormErrorMessage";
Label.displayName = "InputLabel";
