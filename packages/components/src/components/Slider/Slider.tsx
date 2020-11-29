import React, { useState } from "react";
import { useClassnames } from "../../utils/hooks";
import { BaseReactInputHTMLAttributes, NumberInputProps } from "../Input";

export type Props = NumberInputProps;

const Slider = React.forwardRef<HTMLInputElement, Props & BaseReactInputHTMLAttributes>(
  ({ min, max, count = 0, step = 1, inchange, ...props }, ref) => {
    const [classNames, rest] = useClassnames("slider shadow__inset-small", props);
    const [value, setValue] = useState(0);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const text = parseFloat(e.target.value);

    //   setValue(text);
    //   console.log(text);

    //   if (inchange) {
    //     inchange(text);
    //   }
    // };

    const handleRangeSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);

      setValue(e.target.valueAsNumber);
    };

    return (
      <div className="slider__wrapper">
        <div className="slider__value body-16">
          <span></span>
        </div>
        <div className="slider__field flex-row-center"></div>
        {/* role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={!!disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-valuetext={ariaValueText} */}
      </div>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
