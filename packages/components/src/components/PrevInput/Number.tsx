import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useClassnames } from "../../utils/hooks";
import Button from "../Button";
import { ReactProps } from "../__helpers__";
import Input, { InputFProps, InputState } from "./index";

const animationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export type Props = ReactProps<InputState>["number_input"] & InputFProps;

const Number = React.forwardRef<HTMLInputElement, Props>(
  ({ min = 0, max = 9999999, defaultValue = 0, step = 1, onChange, onFocus, onBlur, ...props }, ref) => {
    const { state = "default" } = props;
    const [value, setValue] = useState<any>(defaultValue);
    const [classNames, rest] = useClassnames("", props, { stateToRemove: { state } });
    const [isBtnShown, setIsBtnShown] = useState(false);
    const [isUp, setIsUp] = useState(false);
    const [isDown, setIsDown] = useState(false);
    const [shiftKey, setShiftKey] = useState(false);

    const increment = (stepNumber = step) => {
      const number = value || defaultValue;

      if (!(number + stepNumber > max) && state !== "disabled") {
        setValue((count: number) => parseFloat(String((parseFloat(String(count)) || count) + stepNumber)));
      }
    };

    const decrement = (stepNumber = step) => {
      const number = value || defaultValue;

      if (!(number - stepNumber < min) && state !== "disabled") {
        setValue((count: number) => parseFloat(String((parseFloat(String(count)) || count) - stepNumber)));
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
      if (value === defaultValue) {
        setValue("");
        return;
      }
      if (String(text).length > String(max).length || state === "disabled" || text > max || text < min) {
        e.preventDefault();
      } else {
        setValue(text);
      }

      if (onChange) {
        onChange(e);
      }
    };

    // TODO: Replace with <Icon /> components
    return (
      <div
        className="input-number"
        style={props.style}
        onMouseOver={() => setIsBtnShown(true)}
        onMouseLeave={() => setIsBtnShown(false)}
      >
        <Input.BaseField
          type="number"
          className={classNames}
          value={value}
          ref={ref}
          onChange={e => handleChange(e)}
          step={step}
          onFocus={e => {
            setIsBtnShown(true);
            // Bug on 2nd focus, does not work
            if (String(value) === String(defaultValue)) {
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
              setValue(String(defaultValue));
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
        </Input.BaseField>
      </div>
    );
  }
);

Number.displayName = "InputNumber";

export default Number;
