import React, { useState } from "react";
import { addClassnames } from "../../utils/styles";
import Button from "../Button";
import { ReactInputHTMLAttributes } from "./Input";

export type Props = {
  min?: number;
  max?: number;
  count?: number;
  fillColor?: string;
  stepNumber?: number;
};

export const IncrDcr = React.forwardRef<HTMLInputElement, Props & ReactInputHTMLAttributes>(
  ({ min = 0, max = 1000, count = 0, fillColor = "black", stepNumber = 1, ...props }, ref) => {
    const [value, setValue] = useState(count);
    const { className, ...rest } = props;
    const classNames = addClassnames("input-incr-dcr body-16 medium", props);


    // TODO: Replace with <Icon /> components

    const increment = () => {
      if (!(value + stepNumber > max)) {
        setValue(value => value + stepNumber);
      }
    };

    const decrement = () => {
      if (!(value - stepNumber < min)) {
        setValue(value => value - stepNumber);
      }
    };

    return (
      <div className={classNames} {...rest}>
        <Button
          type="primary"
          className={`input-incr-dcr__icon ${value > min ? "" : "disabled"}`}
          onClick={() => decrement()}
        >
          <svg width="14" height="2" viewBox="0 0 20 2" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H19" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </Button>
        {value}
        <Button type="primary" className="input-incr-dcr__icon" onClick={() => increment()}>
          <svg width="14" height="14" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 10H19M10 19V1" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </Button>
      </div>
    );
  }
);

export default IncrDcr;
