import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Button from "../Button";
import InputBase, { ReactInputHTMLAttributes } from "./__helpers__/InputBase";

const animationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const NumberInputStates = ["default", "focused", "success", "error", "disabled"] as const;
export type NumberInputState = typeof NumberInputStates[number];

export type Props = {
  min?: number;
  max?: number;
  count?: number;
  stepNumber?: number;
  state?: NumberInputState;
};

// TODO: Checkbox animation in https://codesandbox.io/s/framer-motion-2-layout-animations-kij8p?from-embed
export const Number = React.forwardRef<HTMLInputElement, Props & ReactInputHTMLAttributes>(
  ({ min = 0, max = 9999999, count = 0, stepNumber = 1, state, ...props }, ref) => {
    const [value, setValue] = useState(count !== undefined ? count : "");
    const [isBtnShown, setIsBtnShown] = useState(false);
    const [isUp, setIsUp] = useState(false);
    const [isDown, setIsDown] = useState(false);

    // const increment = (multiplyStepNumber = 1) => {
    //   console.log("hey");

    //   const number = parseFloat(value.toString());
    //   if (!(number + stepNumber * multiplyStepNumber > max) && state !== "disabled") {
    //     setValue(number + stepNumber * multiplyStepNumber);
    //   }
    // };


    // TODO: Shift+up / Shift+down key -> 10 * stepNumber increase or decrease
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

    // TODO: Replace with <Icon /> components
    return (
      <div className="input-number" style={props.style}>
        <InputBase
          type="number"
          className={className}
          value={value}
          ref={ref}
          onChange={e => handleChange(e)}
          onFocus={e => {
            setIsBtnShown(true);
            if (String(value) === String(count)) {
              setValue("");
            }
            if (onFocus) {
              onFocus(e);
            }
          }}
          onBlur={e => {
            setIsBtnShown(false);
            if (!value) {
              setValue(String(count));
            }
            if (onBlur) {
              onBlur(e);
            }
          }}
          invalue={value => invalue && invalue(value)}
          {...rest}
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
              >
                <Button
                  style={{ height: isUp ? "24px" : isDown ? "20px" : "" }}
                  onMouseEnter={() => setIsUp(true)}
                  onMouseLeave={() => setIsUp(false)}
                >
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.25 6.91665L7 1.08331L1.75 6.91665"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
                <Button
                  style={{ height: isDown ? "24px" : isUp ? "20px" : "" }}
                  onMouseEnter={() => setIsDown(true)}
                  onMouseLeave={() => setIsDown(false)}
                >
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.25 1.08332L7 6.91666L1.75 1.08332"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </InputBase>
      </div>
    );
  }
);

export default Number;
