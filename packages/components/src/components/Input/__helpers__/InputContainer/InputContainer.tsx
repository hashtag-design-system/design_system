import React from "react";
import { useInputContext } from "../../../../utils";
import { HelpTextContainer } from "../HelpTextContainer/HelpTextContainer";

export const InputContainer: React.FC = ({ children }) => {
  const { value, id, maxLength, secondhelptext, label, characterLimit, optional, passwordboxes } = useInputContext();
  let { helptext } = useInputContext();

  const isAllowedMoreCharacters = String(value).length === maxLength;

  if (optional) {
    helptext = { ...helptext, value: "Optional" };
  }

  return (
    <div className="input__container" data-testid="input-container">
      {(label || helptext || passwordboxes || optional) && (
        <div
          className="input__label__container input__padding-container"
          style={{ justifyContent: !label ? "flex-end" : "space-between" }}
          data-testid="input-label-container"
        >
          {label && (
            <label htmlFor={id} className="input__label body-14" data-testid="input-label">
              {label}
            </label>
          )}
          <HelpTextContainer helptext={helptext}>{passwordboxes}</HelpTextContainer>
        </div>
      )}
      {children}
      {(secondhelptext || characterLimit) && (
        <div
          className="input__help-text__container-and-character-limit input__padding-container"
          style={{ justifyContent: !secondhelptext ? "flex-end" : "space-between" }}
          data-testid="second-help-text-container"
        >
          <HelpTextContainer second helptext={secondhelptext} />
          {characterLimit && maxLength && (
            <div className={`input__character-limit body-12 ${isAllowedMoreCharacters ? "semibold" : ""}`} data-testid="character-limit">
              {value ? String(value).length : 0} / {maxLength}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
