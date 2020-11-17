import React from "react";

type Props = {
  id: string;
  defaultValue: boolean;
  isActive?: boolean;
  floatingPlaceholder: boolean;
};

const FloatingLabel: React.FC<Props> = ({ id, defaultValue, isActive = false, floatingPlaceholder, children }) => {
  return floatingPlaceholder ? (
    <label htmlFor={id} className={`input-placeholder-font input__floating-label ${isActive || defaultValue ? "active" : ""}`}>
      {children}
    </label>
  ) : null;
};

FloatingLabel.displayName = "InputFloatingLabel";

export default FloatingLabel;
