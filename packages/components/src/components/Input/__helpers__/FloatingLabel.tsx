import React, { useEffect, useState } from "react";
import { InputFProps } from "../index";

type Props = {
  defaultValue: boolean;
  isActive?: boolean;
};

type FProps = Props & Pick<InputFProps, "floatingplaceholder" | "id">;

const FloatingLabel: React.FC<FProps> = ({ id, defaultValue, isActive = false, floatingplaceholder, children }) => {
  const [isFloated, setIsFloated] = useState(defaultValue || isActive);

  useEffect(() => {
    if (typeof floatingplaceholder === "object") {
      setIsFloated(floatingplaceholder.now);
    } else {
      setIsFloated(defaultValue || isActive);
    }
  }, [floatingplaceholder, isActive, defaultValue]);

  if (typeof floatingplaceholder) {
  }

  return floatingplaceholder ? (
    <label htmlFor={id} className={`input-placeholder-font input__floating-label ${isFloated ? "active" : ""}`}>
      {children}
    </label>
  ) : null;
};

FloatingLabel.displayName = "InputFloatingLabel";

export default FloatingLabel;
