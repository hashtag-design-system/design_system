import React from "react";
import { addClassnames } from "../../utils/styles";

type Props = {
  label?: string;
  withHelpText?: boolean;
  withIcon?: boolean;
  error?: boolean;
};

const LabelContainer: React.FC<Props & React.HTMLAttributes<HTMLElement>> = ({
  label,
  withHelpText = false,
  withIcon = false,
  error = false,
  children,
  ...props
}) => {
  const { className, ...rest } = props;
  let classNames = addClassnames("body-12", props);
  if (error) {
    classNames += " input__help-text error";
  } else {
    classNames += " input__help-text";
  }
  if (withIcon) {
    classNames += ` input__help-text__icon ${error ? "error" : ""}`;
  }

  // TODO: Make the input__help-text__icon classes in the stylesheets
  return (
    <div className="input__label-container" style={{ justifyContent: `${!label ? "flex-end" : ""}` }} {...rest}>
      {label}
      {withHelpText && <div className={`${classNames}`}>{children}</div>}
    </div>
  );
};

export default LabelContainer;
