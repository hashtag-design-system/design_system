import React from "react";
import { InputBaseFProps } from "../../index";

type Props = {
  position?: "left" | "right";
  group?: InputBaseFProps["prefix"] | InputBaseFProps["suffix"];
};

export const FixGroup = React.forwardRef<HTMLDivElement, Props>(({ group, position, ...props }, ref) => {
  return group ? (
    <div
      className={`input__icon ${position}`}
      ref={ref}
      style={{
        transform: typeof group === "string" ? "translateY(-15%)" : "translateY(-40%)",
      }}
      data-testid="fix-group"
      {...props}
    >
      {group}
    </div>
  ) : null;
});
