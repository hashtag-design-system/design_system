import React from "react";

type Props = {
  id: string;
  defaultValue: boolean;
  isActive?: boolean;
};

const FloatingLabel: React.FC<Props> = ({ id, defaultValue, isActive = false, children }) => {
  return (
    <label htmlFor={id} className={`input-placeholder-font input__floating-label ${isActive || defaultValue ? "active" : ""}`}>
      {children}
    </label>
  );
};

export default FloatingLabel;
