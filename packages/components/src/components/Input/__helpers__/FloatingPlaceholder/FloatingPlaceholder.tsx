import React from "react";
import { useInputContext } from "../../../../utils/contexts/InputContext";
import { DEFAULT_PADDING, EM_REM_MULTIPLIER } from "../FieldContainer/FieldContainer";

type Props = {
  prefixWidth?: number;
};

export const FloatingPlaceholder: React.FunctionComponent<Props> = ({ prefixWidth = 0 }) => {
  const { id, placeholder, floatingplaceholder, prefix } = useInputContext();

  return floatingplaceholder ? (
    <label
      htmlFor={id}
      className="input__floating-placeholder"
      style={{
        left:
          (prefix || prefixWidth) && typeof prefix !== "string"
            ? `${(prefixWidth + DEFAULT_PADDING) / EM_REM_MULTIPLIER}rem`
            : undefined,
      }}
      data-testid="floating-placeholder"
    >
      {placeholder}
    </label>
  ) : null;
};
