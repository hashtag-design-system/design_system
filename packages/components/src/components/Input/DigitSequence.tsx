import React, { useEffect, useRef, useState } from "react";
import { CONFIG } from "../../config";
import { InputContextProvider, useClassnames } from "../../utils";
import Input, { InputFProps } from "./index";
import { HelpTextContainer } from "./__helpers__";

export type Props = {
  numberOfDigits?: number;
  error?: boolean;
  focusOnRender?: boolean;
  onChange?: (text: string) => void;
};

export type FProps = Props & Pick<InputFProps, "defaultValue" | "helptext" | "maxLength">;

const DigitSequence: React.FunctionComponent<FProps> = ({
  error = false,
  focusOnRender = true,
  defaultValue = "",
  numberOfDigits = String(defaultValue).length || 4,
  helptext,
  maxLength,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState<string[]>([...String(defaultValue)]);
  const [classNames, rest] = useClassnames("input-digit-sequence", props);
  const state = error ? "error" : "default";

  const inputRefs = useRef<HTMLInputElement[] | null[]>([]);

  const handleChange = (i: number, val: string, curVal: string) => {
    const newVal: string = val;

    if (newVal.length >= 1) {
      [...newVal].forEach((letter, index) => {
        const idx = i + index;
        const last = idx === numberOfDigits - 1;
        setValue(prevState => [...prevState, letter]);
        if (!last && curVal.length >= 1) {
          focus(idx + 1);
        } else {
          blur(idx);
        }
      });
    } else {
      setValue(prevState => [...prevState.filter((_, index) => index !== i)]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace" && e.currentTarget.value.length === 0) {
      focus(i - 1);
    }
  };

  const focus = (i: number) => {
    if (inputRefs.current[i]) {
      inputRefs.current[i]?.focus();
    }
  };

  const blur = (i: number) => {
    if (inputRefs.current[i]) {
      inputRefs.current[i]?.blur();
    }
  };

  useEffect(() => {
    if (focusOnRender) {
      focus(0);
    }
  }, [focusOnRender]);

  useEffect(() => {
    if (onChange) {
      onChange(value.join(""));
    }
  }, [value, onChange]);

  return (
    <div className={classNames} data-testid="input-digit-sequence" {...rest}>
      <InputContextProvider value={{ state: error ? "error" : "default" }}>
        <div className="input-digit-sequence__container" style={{ width: "auto" }}>
          {/* 
            Separated the components, so that no confusion is made in the browser 
            • First component should not have a `ref` Prop as the others, because it is the first displayed & we set it by default to be focused on useEffect()
            • All the other components, up to the LAST one, should have the same `onChange` and `ref` attributes
            • The last component should not have an `onChange` function, because it does not have a next component (ref) to focus on
          */}
          {[...Array(numberOfDigits)].map((_, i) => (
            <Input.Digit
              value={value[i]}
              onChange={e => {
                // e.preventDefault();
                handleChange(i, e.target.value, e.currentTarget.value);
              }}
              onKeyDown={e => handleKeyDown(e, i)}
              forwardref={ref => (inputRefs.current[i] = ref)}
              state={state}
              overrideOnChange
              maxLength={maxLength}
              key={(CONFIG.listKeys.DIGIT_INPUT, i)}
            />
          ))}
        </div>
        <HelpTextContainer second helptext={helptext} data-testid="input-digit-sequence-help-text" />
      </InputContextProvider>
    </div>
  );
};

DigitSequence.displayName = "InputDigitSequence";

export default DigitSequence;
