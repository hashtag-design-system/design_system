import React, { useState } from "react";
import Button from "../Button";
import InputBase, { ReactInputHTMLAttributes } from "./__helpers__/InputBase";

const IncrDcrInputStates = [
  "default",
  "focus_visible|left",
  "focus-visible|right",
  "active",
  "active|increase",
  "active|decrease",
  "disabled",
] as const;
export type IncrDcrInputState = typeof IncrDcrInputStates[number];

export type Props = {
  min?: number;
  max?: number;
  count?: number;
  stepNumber?: number;
  state?: IncrDcrInputState;
};

export const IncrDcr = React.forwardRef<HTMLInputElement, Props & Omit<ReactInputHTMLAttributes, "prefix">>(
  ({ min = 0, max = 1000, count = 0, stepNumber = 1, state = "default", ...props }, ref) => {
    const [value, setValue] = useState<string>(String(count));

    // TODO: Replace with <Icon /> components

    const increment = () => {
      if (!(parseFloat(value) + stepNumber > max)) {
        setValue(value => String(parseFloat(value) + stepNumber));
      }
    };

    const decrement = () => {
      if (!(parseFloat(value) - stepNumber < min)) {
        setValue(value => String(parseFloat(value) - stepNumber));
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;

      if (
        text.length > String(max).length ||
        state === "disabled" ||
        parseFloat(text) > max ||
        parseFloat(text) < min
      ) {
        e.preventDefault();
      } else {
        setValue(text);
      }
    };

    const { className, onChange, onFocus, onBlur, invalue, ...rest } = props;

    return (
      <div className="input-incr-dcr">
        <Button
          type="secondary"
          className={`input-incr-dcr__icon ${parseFloat(value) > min ? "" : "grey"}`}
          onClick={() => decrement()}
        >
          <svg width="14" height="2" viewBox="0 0 20 2" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H19" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </Button>
        <InputBase
          type="number"
          className={className}
          value={value}
          ref={ref}
          onChange={e => handleChange(e)}
          invalue={value => invalue && invalue(value)}
          onFocus={e => {
            if (String(value) === String(count)) {
              setValue("");
            }
            if (onFocus) {
              onFocus(e);
            }
          }}
          onBlur={e => {
            if (!value) {
              setValue(String(count));
            }
            if (onBlur) {
              onBlur(e);
            }
          }}
          {...rest}
        />
        <Button
          type="secondary"
          className={`input-incr-dcr__icon ${parseFloat(value) < max || !value ? "" : "grey"}`}
          onClick={() => increment()}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 10H19M10 19V1" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </Button>
      </div>
    );
  }
);

export default IncrDcr;
