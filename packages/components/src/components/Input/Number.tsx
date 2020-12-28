import { AnimatePresence, motion } from "framer-motion";
import React, { useReducer, useState } from "react";
import { InputContextProvider } from "../../utils/contexts/InputContext";
import { useDisabled } from "../../utils/hooks";
import { ACTIONS, reducer, ReducerInitialStateType } from "../../utils/reducers/inputNumber";
import Button from "../Button";
import { InputFProps } from "./index";
import { BaseNumber } from "./__helpers__";

const IS_UP_HEIGHT = "1.55rem";
const IS_DOWN_HEIGHT = "1.2rem";

const initialState: ReducerInitialStateType = {
  min: 0,
  max: 9999999,
  value: 0,
  defaultValue: 0,
  isDisabled: false,
  hasShiftKey: false,
};

const animationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export type FProps = Omit<InputFProps, "characterLimit" | "type" | "allowClear" | "passwordboxes">;

const Number: React.FunctionComponent<FProps> = ({
  min = 0,
  max = 9999999,
  step = 1,
  value: propsValue,
  defaultValue = min,
  state = "default",
  width = "7.5em",
  overrideOnChange,
  onFocus,
  onBlur,
  onMouseOver,
  ...props
}) => {
  const isDisabled = useDisabled(props, state);
  const [{ value }, dispatch] = useReducer(reducer, initialState, (): typeof initialState => {
    return {
      ...initialState,
      value: propsValue || defaultValue || min,
      isDisabled,
      min,
      max,
    };
  });
  const [isBtnShown, setIsBtnShown] = useState<boolean>(false || state === "hover" || state === "focus" || state === "disabled");
  const [isUp, setIsUp] = useState<boolean>(false);
  const [isDown, setIsDown] = useState<boolean>(false);

  const increment = (stepNumber = step) => {
    dispatch({ type: ACTIONS.INCREMENT, payload: { step: stepNumber } });
  };

  const decrement = (stepNumber = step) => {
    dispatch({ type: ACTIONS.DECREMENT, payload: { step: stepNumber } });
  };

  const toggleBtn = (boolean: boolean) => {
    if (!isDisabled && state === "default") {
      setIsBtnShown(boolean);
    }
  };

  // TODO: Replace with <Icon /> components
  return (
    <div onMouseOver={() => toggleBtn(true)} onMouseLeave={() => toggleBtn(false)} data-testid="input-number-container">
      <InputContextProvider
        value={{
          ...props,
          value,
          dispatch,
          defaultValue,
          state: isBtnShown ? "focus" : state,
          min,
          max,
          step,
          width,
          overrideOnChange,
          onMouseOver: e => {
            toggleBtn(true);
            if (onMouseOver) {
              onMouseOver(e);
            }
          },
          onFocus: e => {
            toggleBtn(true);
            if (onFocus) {
              onFocus(e);
            }
          },
          onBlur: e => {
            toggleBtn(false);
            if (onBlur) {
              onBlur(e);
            }
          },
        }}
      >
        <BaseNumber isBtnShown={isBtnShown} data-testid="input-number">
          <AnimatePresence>
            {isBtnShown && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={animationVariants}
                transition={{ duration: 0.3 }}
                exit={animationVariants.hidden}
                className="input-number__btn__container"
                data-testid="input-number-btn-container"
              >
                <Button
                  type="secondary"
                  style={{ height: isUp ? IS_UP_HEIGHT : isDown ? IS_DOWN_HEIGHT : undefined }}
                  onMouseEnter={() => setIsUp(true)}
                  onMouseLeave={() => setIsUp(false)}
                  onClick={() => increment()}
                  data-testid="input-number-btn-increase"
                >
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.25 6.91665L7 1.08331L1.75 6.91665" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
                <Button
                  type="secondary"
                  style={{ height: isDown ? IS_UP_HEIGHT : isUp ? IS_DOWN_HEIGHT : undefined }}
                  onMouseEnter={() => setIsDown(true)}
                  onMouseLeave={() => setIsDown(false)}
                  onClick={() => decrement()}
                  data-testid="input-number-btn-decrease"
                >
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.25 1.08332L7 6.91666L1.75 1.08332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </BaseNumber>
      </InputContextProvider>
    </div>
  );
};

export default Number;
