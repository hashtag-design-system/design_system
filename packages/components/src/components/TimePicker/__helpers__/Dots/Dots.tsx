import React from "react";

type FProps = React.ComponentPropsWithoutRef<"div">;

export const Dots: React.FC<FProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <div className="time-picker__dot" />
      <div className="time-picker__dot" />
    </div>
  );
};
