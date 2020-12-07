import React, { useEffect, useState } from "react";
import { BaseReactInputHTMLAttributes, NumberInputProps } from "../../Input";
// import { ContextProvider } from "./ContextProvider";

// See -> https://www.youtube.com/watch?v=zOA2vpx44Nw
// See -> https://www.youtube.com/watch?v=mvq8uOGFqlc
// See -> https://www.youtube.com/watch?v=MxbEjINYIPc

const DEFAULT_SIZE = 0.875;

export type Props = NumberInputProps & {
  marks: { value: number; label: string }[];
  lockOnMarks?: boolean;
  zeroPercentageOnEdgeMarks?: boolean;
};

const Slider = React.forwardRef<HTMLInputElement, Props & BaseReactInputHTMLAttributes>(
  (
    { min, max, defaultValue, step, marks, lockOnMarks = false, zeroPercentageOnEdgeMarks = true, className, inchange, ...rest },
    ref
  ) => {
    const [value, setValue] = useState<number>(defaultValue || max === undefined ? 0 : max / 2);
    const [onHover, setOnHover] = useState<boolean>(false);
    const [size, setSize] = useState<number>(DEFAULT_SIZE);

    const handleChange = (value: React.ReactText) => {
      if (inchange) {
        inchange(value);
      }
      setValue(typeof value === "string" ? parseFloat(value) : value);
    };

    useEffect(() => {
      if (onHover) {
        const valueLength = String(max).length;
        let newValue: number = DEFAULT_SIZE * 1.75;

        if (valueLength > 3) {
          newValue = newValue + (valueLength - 3) * 0.4;
        }

        setSize(newValue);
      } else {
        setSize(DEFAULT_SIZE);
      }
    }, [max, onHover, size]);

    return (
      // <ContextProvider value={value} setValue={setValue} min={min} max={max} defaultValue={defaultValue} step={step}>
      <div
        className="slider__wrapper flex-column-flex-start-center"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <div
          className="slider__field flex-column-flex-start-stretch"
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          {...rest}
        >
          {/* <Field
              className={className}
              size={size}
              min={min}
              max={max}
              defaultValue={defaultValue}
              step={step}
              marks={marks}
              lockOnMarks={lockOnMarks}
              // zeroPercentageOnEdgeMarks={zeroPercentageOnEdgeMarks}
              inchange={value => handleChange(value)}
              ref={ref}
              {...rest}
            />
          <Marks marks={marks} zeroPercentageOnEdgeMarks={zeroPercentageOnEdgeMarks} /> */}
        </div>
      </div>
      // </ContextProvider>
    );
  }
);

export default Slider;
