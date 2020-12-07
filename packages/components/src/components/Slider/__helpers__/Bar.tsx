import React from "react";
import { SliderProps } from "..";

export const Bar = React.forwardRef<HTMLSpanElement, Pick<SliderProps, "className">>(({ className }, ref) => {
  return (
    <span className={`slider__bar shadow__inset-sm ${className}`}>
      <span ref={ref} className={`slider__bar__progress ${className}`} />
    </span>
  );
});
