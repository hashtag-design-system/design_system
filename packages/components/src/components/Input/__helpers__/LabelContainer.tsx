import React from "react";
import { useClassnames } from "../../../utils/hooks";

type Props = {
  label?: string;
  withHelpText?: boolean;
  withIcon?: boolean;
  charactersLimit?: { characters: number; maxLength?: number };
};

const LabelContainer: React.FC<Props & React.HTMLAttributes<HTMLElement>> = ({
  label,
  withHelpText = false,
  withIcon = false,
  charactersLimit,
  children,
  ...props
}) => {
  let [classNames, rest] = useClassnames("input__help-text", props);

  // TODO: Make the input__help-text__icon classes in the stylesheets
  return (
    <div className="input__label-container" style={{ justifyContent: `${!label ? "flex-end" : ""}` }} {...rest}>
      {label}
      {withHelpText && <div className={classNames}>{children}</div>}
      {charactersLimit && charactersLimit.maxLength && (
        <div className={`body-12 ${classNames} ${charactersLimit.maxLength === charactersLimit.characters ? "error medium" : ""}`}>
          {charactersLimit.characters} / {charactersLimit.maxLength}
        </div>
      )}
    </div>
  );
};

LabelContainer.displayName = "InputLabelContainer";

export default LabelContainer;
