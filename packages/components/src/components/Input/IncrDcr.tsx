import React, { useReducer } from "react";
import { InputContextProvider } from "../../utils/contexts/InputContext";
import { useClassnames, useDisabled } from "../../utils/hooks";
import { ACTIONS, reducer, ReducerInitialStateType } from "../../utils/reducers/inputNumber";
import Button from "../Button";
import { ComponentProps } from "../__helpers__";
import { InputNumberFProps } from "./index";
import { InputBaseState } from "./Input";
import { BaseNumber } from "./__helpers__";
import { AddIcon } from "./__icons__/AddIcon";
import { SubtractIcon } from "./__icons__/SubtractIcon";

// 11 states in total
const IncrDcrStates = [
  "focus-visible|increase",
  "focus-visible|decrease",
  "hover",
  "hover|increase",
  "hover|decrease",
  "active",
  "active|increase",
  "active|decrease",
] as const;
export type IncrDcrState = typeof IncrDcrStates[number] | InputBaseState;

export const initialState: ReducerInitialStateType = {
  min: 1,
  max: 9999,
  value: 1,
  defaultValue: 1,
  isDisabled: false,
  hasShiftKey: false,
};

export type FProps = Omit<
  InputNumberFProps,
  "state" | "helptext" | "secondhelptext" | "floatingplaceholder" | "label" | "optional" | "prefix" | "suffix"
> &
  Pick<ComponentProps<"input", false, IncrDcrState>, "state">;

const IncrDcr: React.FunctionComponent<FProps> = ({
  min = 1,
  max = 9999,
  step = 1,
  value: propsValue,
  defaultValue = min,
  width = "3rem",
  overrideOnChange,
  state = "default",
  ...props
}) => {
  const [classNames, rest] = useClassnames("input-incr-dcr", props);
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

  const increment = (stepNumber = step) => {
    dispatch({ type: ACTIONS.INCREMENT, payload: { step: stepNumber } });
  };

  const decrement = (stepNumber = step) => {
    dispatch({ type: ACTIONS.DECREMENT, payload: { step: stepNumber } });
  };

  const active = state === "active";
  const leftActive =
    (parseFloat(value.toString()) > min || state === "active|decrease" || state === "hover|decrease" || active) &&
    state !== "active|increase" &&
    !isDisabled;

  const rightActive =
    (parseFloat(value.toString()) < max || !value || state === "active|increase" || state === "hover|increase" || active) &&
    state !== "active|decrease" &&
    !isDisabled;

  return (
    <div className="input-incr-dcr__container">
      <Button
        disabled={!leftActive ? true : false}
        className={`input-incr-dcr__btn ${state === "hover|decrease" ? "hover" : ""} ${
          state === "focus-visible|decrease" ? "focus-visible" : ""
        }`}
        onClick={() => decrement()}
        data-testid="input-incr-dcr-decrease"
      >
        <SubtractIcon />
      </Button>
      <InputContextProvider
        value={{
          ...rest,
          value,
          dispatch,
          defaultValue,
          state,
          min,
          max,
          step,
          className: classNames,
          width,
          overrideOnChange,
        }}
      >
        <BaseNumber data-testid="input-incr-dcr" />
        <Button
          disabled={!rightActive ? true : false}
          className={`input-incr-dcr__btn ${state === "hover|increase" ? "hover" : ""} ${
            state === "focus-visible|increase" ? "focus-visible" : ""
          }`}
          onClick={() => increment()}
          data-testid="input-incr-dcr-increase"
        >
          <AddIcon />
        </Button>
      </InputContextProvider>
    </div>
  );
};

IncrDcr.displayName = "InputIncrDcr";

export default IncrDcr;
