import React, { useEffect, useRef } from "react";
import keys from "../../config/keys";
import { useClassnames } from "../../utils/hooks";
import { InputFProps } from "./index";
import Input from "./Input";
import LabelContainer from "./__helpers__/LabelContainer";

export type Props = {
  digits: number;
  error?: boolean;
};

export type FProps = Props & Pick<InputFProps, "helptext">;

const DigitSequence: React.FunctionComponent<FProps> = ({ digits = 4, helptext, error, ...props }) => {
  const initialRef = useRef<HTMLInputElement>(null);
  const inputRefs = useRef<HTMLInputElement[] | null[]>([]);

  let [classNames, rest] = useClassnames("input-digit-sequence", props);
  const state = error ? "error" : "default";

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    if (e.target.value.length >= 1) {
      focus(i);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.currentTarget.value.length >= 1) {
      focus(i);
    }
  };

  const focus = (i: number) => {
    if (inputRefs.current[i]) {
      inputRefs.current[i]?.focus();
    }
  };

  return (
    <div className={classNames} {...rest}>
      <div className="input-digit-sequence__wrapper" style={{ width: "auto" }}>
        {/* 
            Separated the components, so that no confusion is made in the browser 
            • 1st component should not have the same ref as the others, because it the first displayed & we set it by default to be focused on componentDidMount
            • All the other components, up to the LAST one, should have the same onChange and ref attributes
            • The last component should not have an onChange function, because it does not have a next component (ref) to focus on
          */}
        {[...Array(digits)].map((_, i) =>
          i === 0 ? (
            <Input.Digit
              ref={initialRef}
              onChange={e => handleChange(e, i)}
              onKeyPress={e => handleKeyPress(e, i)}
              state={state}
              key={`${keys.digitInput}${i}`}
            />
          ) : i === digits ? (
            <Input.Digit ref={ref => (inputRefs.current[i - 1] = ref)} state={state} key={`${keys.digitInput}${i}`} />
          ) : (
            <Input.Digit
              onChange={e => handleChange(e, i)}
              onKeyPress={e => handleKeyPress(e, i)}
              ref={ref => (inputRefs.current[i - 1] = ref)}
              state={state}
              key={`${keys.digitInput}${i}`}
            />
          )
        )}
      </div>
      {helptext && (
        <LabelContainer className="body-14" withHelpText>
          {helptext.icon}
          {helptext.value}
        </LabelContainer>
      )}
    </div>
  );
};

DigitSequence.displayName = "InputDigitSequence";

export default DigitSequence;
