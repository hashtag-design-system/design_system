import React from "react";

export const Label: React.FC = ({ children }) => {
  return <div className="time-picker__labels-container__label" data-testid="time-picker-label">{children}</div>;
};
