import React from "react";
import { useInputContext } from "../../../../utils";
import { InputFProps } from "../../index";

type Props = {
  second?: boolean;
};

type FProps = Props & Pick<InputFProps, "helptext">;

export const HelpTextContainer: React.FC<FProps> = ({ helptext, second = false, children, ...props }) => {
  const { passwordboxes } = useInputContext();

  return helptext || children ? (
    <div
      className={`input__help-text__container body-12 ${helptext?.error ? "error" : ""} ${
        helptext?.transparent ? "transparent" : ""
      } ${second ? "second" : ""}`}
      data-testid="help-text-container"
      style={{ gap: passwordboxes ? "0.15em" : "" }}
      {...props}
    >
      {children
        ? children
        : helptext && (
            <>
              {helptext.value}
              {helptext?.icon}
            </>
          )}
    </div>
  ) : null;
};
