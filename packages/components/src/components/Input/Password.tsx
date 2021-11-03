import { Button, Input as ChakraInput, InputRightElement } from "@chakra-ui/react";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import Form from "../Form";
import Input, { InputProps } from "./index";
import { PasswordBoxes } from "./__helpers__";

// SEE: https://www.youtube.com/watch?v=7-1VZ2wF8pw
// SEE: https://www.youtube.com/watch?v=yrrw6KdGuxc&t

export type StrengthBoxesState = ("sm" | "md" | "lg")[];

export type Props = Omit<InputProps, "hasClearBtn" | "type"> & {
  hasShownBtn?: boolean;
  // toggleIcon?: IconPropType;
  form?: "sign_up" | "login";
  label?: React.ReactNode;
};

export const Password = forwardRef<HTMLInputElement, Props>(
  (
    { placeholder = "Password", label, form, autoComplete, hasShownBtn = true, children, onChange, onFocus, onBlur, ...props },
    ref
  ) => {
    const [password, setPassword] = useState<string | number>("");
    const [isFocused, setIsFocused] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [strengthBoxes, setStrengthBoxes] = useState<StrengthBoxesState>(["sm", "sm", "sm"]);
    // const _className = cx("", props.className);

    if (form === "sign_up") autoComplete = "new-password";
    else if (form === "login") autoComplete = "current-password";

    const handleIsShown = () => setIsShown(prev => !prev);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = e.target.value;
      setPassword(newVal);
      calcPasswordStrength(newVal);

      if (onChange) onChange(e);
    };

    const calcPasswordStrength = useCallback(
      (newVal = password) => {
        const validations = [
          newVal.length >= 8,
          (newVal.match(/[A-Z]/g) || []).length >= 2,
          (newVal.match(/[a-z]/g) || []).length >= 2,
          (newVal.match(/[0-9]/g) || []).length >= 3,
          (newVal.match(/[^0-9a-zA-Z\s]/g) || []).length >= 2,
          // The `i` flag makes it case insentitive
          (newVal.match(/(.)\1/i) || []).length <= 0 && newVal.length > 0,
        ].filter(validation => validation === true);

        setStrengthBoxes(prevState => {
          validations.forEach((_, i) => {
            if (i <= 1) prevState[i + 1] = "sm";

            if (i < 3) prevState[i] = "md";
            else if (i >= 3) prevState[i - 3] = "lg";
          });
          return prevState;
        });
      },
      [password]
    );

    useEffect(() => {
      if (!password) {
        setStrengthBoxes(prevState => prevState.map(() => "sm"));
      } else calcPasswordStrength();
    }, [password, form, setStrengthBoxes, calcPasswordStrength]);

    return (
      <>
        <Form.Label display="flex">
          {label}
          {form === "sign_up" && <PasswordBoxes strengthBoxes={strengthBoxes} isFocused={isFocused} />}
        </Form.Label>
        <Input
          type={isShown ? "text" : "password"}
          value={password}
          placeholder={placeholder}
          autoComplete={autoComplete}
          letterSpacing={0.5}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
          ref={ref}
        >
          {children}
          {hasShownBtn && (
            <InputRightElement width="4.5rem">
              <Button size="sm" onClick={handleIsShown}>
                {isShown ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          )}
        </Input>
      </>
    );
  }
);

Password.displayName = "InputPassword";
// @ts-expect-error
Password.id = ChakraInput.id;
