import { range } from "lodash";
import React from "react";

type FProps = React.ComponentPropsWithoutRef<"div">;

const Dot: React.FC = () => {
  return <div className="time-picker__dot" data-testid="time-picker-dot" />;
};

export const Dots: React.FC<FProps> = ({ ...props }) => {
  return (
    <div data-testid="time-picker-dots-container" {...props}>
      {range(2).map((_, i) => (
        <Dot key={i} />
      ))}
    </div>
  );
};
