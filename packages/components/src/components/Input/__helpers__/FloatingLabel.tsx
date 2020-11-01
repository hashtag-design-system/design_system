import React from "react";

type Props = {
  id: string;
  isActive?: boolean;
};

const FloatingLabel: React.FC<Props> = ({ id, isActive = false, children }) => {
  return (
    <label htmlFor={id} className={`input-placeholder-font input__floating-label ${isActive ? "active" : ""}`}>
      {children}
    </label>
  );
};

export default FloatingLabel;
