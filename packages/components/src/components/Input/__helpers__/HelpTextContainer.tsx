import React from "react";
import { InputProps } from "..";
import LabelContainer from "./LabelContainer";

export type Props = Omit<InputProps, "state"> & {state?: string};

const HelpTextContainer: React.FC<Props> = ({
  label,
  helptext,
  secondhelptext,
  characterLimit,
  className,
  value,
  state,
  children,
  ...props
}) => {
  return (
    <div className="input__wrapper" style={{ width: props.style?.width || props.width }}>
      {(label || helptext) && (
        <LabelContainer
          className="body-12"
          label={label}
          withHelpText={helptext ? true : false}
          withIcon={helptext && helptext.icon ? true : false}
        >
          {helptext?.value}
          {helptext?.icon}
        </LabelContainer>
      )}
      {children}
      {(secondhelptext || props.maxLength || characterLimit) && !className?.includes("input-digit") && (
        <LabelContainer
          className="body-12"
          withHelpText
          withIcon={secondhelptext && secondhelptext.icon ? true : false}
          charactersLimit={{ maxLength: props.maxLength, characters: String(value).length }}
          style={{ marginLeft: `${label || helptext ? "0px" : "12px"}` }}
        >
          {secondhelptext?.icon}
          {secondhelptext?.value}
        </LabelContainer>
      )}
    </div>
  );
};

HelpTextContainer.displayName = "InputHelpTextContainer";

export default HelpTextContainer;
