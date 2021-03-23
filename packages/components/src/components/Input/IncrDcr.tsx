import React, { useEffect, useReducer } from "react";
import { InputContextProvider, useClassnames, useDisabled } from "../../utils";
import Button, { ButtonFProps } from "../Button";
import { ComponentProps } from "../__helpers__";
import { InputNumberFProps } from "./index";
import { InputBaseState } from "./Input";
import { ACTIONS, BaseNumber, reducer, ReducerInitialStateType } from "./__helpers__";
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

export type Props = {
  btnProps?: ButtonFProps;
  onBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type FProps = Props & Omit<
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
  btnProps,
  onValue,
  onBtnClick,
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

  const handleOperation = (e: React.MouseEvent<HTMLButtonElement>, operation: "increment" | "decrement", stepNumber = step) => {
    e.preventDefault();
    dispatch({ type: ACTIONS[operation.toUpperCase()], payload: { step: stepNumber } });
    if (onBtnClick) {
      onBtnClick(e);
    }
  };

  useEffect(() => {
    if (onValue) {
      const parsedValue = parseFloat(value.toString() || min.toString());
      onValue(parsedValue);
    }
  }, [value]);

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
        aria-label="Decrement"
        onClick={e => handleOperation(e, "decrement")}
        data-testid="input-incr-dcr-decrease"
        {...btnProps}
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
          aria-label="Increment"
          onClick={e => handleOperation(e, "increment")}
          data-testid="input-incr-dcr-increase"
          {...btnProps}
        >
          <AddIcon />
        </Button>
      </InputContextProvider>
    </div>
  );
};

IncrDcr.displayName = "InputIncrDcr";

export default IncrDcr;
