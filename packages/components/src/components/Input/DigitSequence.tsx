import React, { useEffect, useState } from "react";
import keys from "../../config/keys";
import { InputHelpTextType } from "../../typings";
import { addClassnames } from "../../utils/styles";
import Input from "./Input";
import LabelContainer from "./LabelContainer";

export type Props = {
  digits: number;
  separator?: boolean;
  helpText?: InputHelpTextType;
  error?: boolean;
};

export const DigitSequence: React.FC<Props & React.HTMLAttributes<HTMLElement>> = ({
  digits,
  separator = false,
  helpText,
  error,
  ...props
}) => {
  const [rightDigits, setRightDigits] = useState(0);
  const [leftDigits, setLeftDigits] = useState(0);

  useEffect(() => {
    const halfDigits = Math.floor(digits / 2);
    setRightDigits(halfDigits + (digits - halfDigits * 2));
    setLeftDigits(halfDigits);
  }, [digits, rightDigits, leftDigits]);

  const { className, ...rest } = props;
  let classNames = addClassnames("input-digit-sequence", props);
  const state = error ? "error" : "default";

  return (
    <div className={classNames} {...rest}>
      <div className="input-digit-sequence__container">
        <div className="input-digit-sequence__right" style={{ width: "auto" }}>
          {[...Array(rightDigits)].map((_, i) => (
            <Input.Digit state={state} key={`${keys.digitInput}${i + 1}`} />
          ))}
        </div>
        {separator && (
          <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2.30005H14" stroke="#999999" stroke-width="3" stroke-linecap="round" />
          </svg>
        )}
        <div className="input-digit-sequence__left">
          {[...Array(leftDigits)].map((_, i) => (
            <Input.Digit state={state} key={`${keys.digitInput}${i + 1 + rightDigits}`} />
          ))}
        </div>
      </div>
      {helpText && (
        <LabelContainer error={error ? true : false} withHelpText>
          {helpText.icon}
          {helpText.value}
        </LabelContainer>
      )}
    </div>
  );
};

export default DigitSequence;
