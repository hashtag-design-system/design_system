import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Button from "../Button";
import BaseInput, { ReactInputHTMLAttributes } from "./__helpers__/InputBase";

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
    const [value, setValue] = useState(count ? count : "");
    const [isBtnShown, setIsBtnShown] = useState(false);
    const [isUp, setIsUp] = useState(false);
    const [isDown, setIsDown] = useState(false);

    // const increment = () => {
    //   if (!(value + stepNumber > max) && state !== "disabled") {
    //     setValue(value => value + stepNumber);
    //   }
    // };

    const { className, onChange, invalue, ...rest } = props;

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
        setValue(e.target.value);
      }
    };

    // TODO: Replace with <Icon /> components
    return (
      <div className="input-number" style={props.style}>
        <BaseInput
          type="number"
          className={className}
          value={value}
          ref={ref}
          onChange={e => handleChange(e)}
          onFocus={() => setIsBtnShown(true)}
          onBlur={() => setIsBtnShown(false)}
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
        </BaseInput>
      </div>
    );
  }
);

export default Number;
