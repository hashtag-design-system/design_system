import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Button from "../Button";
import BaseField, { BaseReactInputHTMLAttributes, InputState } from "./__helpers__/BaseField";

const animationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export type Props = {
  min?: number;
  max?: number;
  count?: number;
  stepNumber?: number;
  state?: InputState;
};

const Number = React.forwardRef<HTMLInputElement, Props & Omit<BaseReactInputHTMLAttributes, "step">>(
  ({ min = 0, max = 9999999, count = 0, stepNumber = 1, state, ...props }, ref) => {
    const [value, setValue] = useState<any>(count);
    const [isBtnShown, setIsBtnShown] = useState(false);
    const [isUp, setIsUp] = useState(false);
    const [isDown, setIsDown] = useState(false);
    const [shiftKey, setShiftKey] = useState(false);

    const increment = (step = stepNumber) => {
      const number = value || count;

      if (!(number + step > max) && state !== "disabled") {
        setValue((count: number) => parseFloat(String((parseFloat(String(count)) || count) + step)));
      }
    };

    const decrement = (step = stepNumber) => {
      const number = value || count;

      if (!(number - step < min) && state !== "disabled") {
        setValue((count: number) => parseFloat(String((parseFloat(String(count)) || count) - step)));
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (shiftKey === true) {
        return;
      }
      const text = e.target.valueAsNumber;
      if (isNaN(text)) {
        setValue("");
        return;
      }
      if (value === count) {
        setValue("");
        return;
      }
      if (String(text).length > String(max).length || state === "disabled" || text > max || text < min) {
        e.preventDefault();
      } else {
        setValue(text);
      }
    };

    const { className, onChange, onFocus, onBlur, inchange, ...rest } = props;

    // TODO: Replace with <Icon /> components
    return (
      <div className="input-number" style={props.style}>
        <BaseField
          type="number"
          className={className}
          value={value}
          ref={ref}
          onChange={e => handleChange(e)}
          step={stepNumber}
          onFocus={e => {
            setIsBtnShown(true);
            // Bug on 2nd focus, does not work
            if (String(value) === String(count)) {
              setValue("");
            }
            if (onFocus) {
              onFocus(e);
            }
          }}
          onMouseOver={() => setIsBtnShown(true)}
          onBlur={e => {
            setIsBtnShown(false);
            if (!value) {
              setValue(String(count));
            }
            if (onBlur) {
              onBlur(e);
            }
          }}
          onKeyDownCapture={e => {
            if (e.shiftKey) {
              if (e.key === "ArrowUp") {
                setShiftKey(true);
                increment(10);
              } else if (e.key === "ArrowDown") {
                setShiftKey(true);
                decrement(10);
              }
            }
          }}
          onKeyUpCapture={e => {
            if (!(e.shiftKey && (e.key === "ArrowUp" || e.key === "ArrowDown"))) {
              setShiftKey(false);
            }
          }}
          inchange={value => inchange && inchange(value)}
          {...rest}
          style={{ paddingRight: isBtnShown ? "30px" : "" }}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        >
          <AnimatePresence>
            {isBtnShown && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={animationVariants}
                transition={{ duration: 0.3 }}
                exit={animationVariants.hidden}
                className="input-number__btn"
                onMouseOver={() => setIsBtnShown(true)}
                onMouseLeave={() => setIsBtnShown(false)}
              >
                <Button
                  type="secondary"
                  style={{ height: isUp ? "1.5em" : isDown ? "1.25em" : "" }}
                  onMouseEnter={() => setIsUp(true)}
                  onMouseLeave={() => setIsUp(false)}
                  onClick={() => increment()}
                >
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.25 6.91665L7 1.08331L1.75 6.91665" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
                <Button
                  type="secondary"
                  style={{ height: isDown ? "1.5em" : isUp ? "1.25em" : "" }}
                  onMouseEnter={() => setIsDown(true)}
                  onMouseLeave={() => setIsDown(false)}
                  onClick={() => decrement()}
                >
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.25 1.08332L7 6.91666L1.75 1.08332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </BaseField>
      </div>
    );
  }
);

Number.displayName = "InputNumber";

export default Number;
