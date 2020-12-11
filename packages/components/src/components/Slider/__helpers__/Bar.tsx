import React from "react";
import { SliderFProps } from "../index";

export const Bar = React.forwardRef<HTMLSpanElement, Pick<SliderFProps, "className">>(({ className }, ref) => {
  return (
    <span className={`slider__bar shadow__inset-sm ${className}`}>
      <span ref={ref} className={`slider__bar__progress ${className}`} />
    </span>
  );
});
