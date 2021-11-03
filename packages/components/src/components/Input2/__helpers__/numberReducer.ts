import { InputFProps, InputNumberFProps } from "..";

// ------------ Reducer types ------------ //
export const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  HANDLE_FOCUS: "handle:focus",
  HANDLE_BLUR: "handle:blur",
  HANDLE_CHANGE: "handle:change",
  HANDLE_KEY_UP_CAPTURE: "handle:key_up_capture",
  HANDLE_KEY_DOWN_CAPTURE: "handle:key_down_capture",
} as const;

export type ACTIONTYPE =
  | { type: typeof ACTIONS.INCREMENT | typeof ACTIONS.DECREMENT; payload: Required<Pick<InputFProps, "step">> }
  | { type: typeof ACTIONS.HANDLE_FOCUS | typeof ACTIONS.HANDLE_BLUR }
  | { type: typeof ACTIONS.HANDLE_CHANGE; payload: { newVal: number } }
  | {
      type: typeof ACTIONS.HANDLE_KEY_UP_CAPTURE | typeof ACTIONS.HANDLE_KEY_DOWN_CAPTURE;
      payload: { e: React.KeyboardEvent<HTMLInputElement> };
    };

export type ReducerInitialStateType = {
  isDisabled: boolean;
  hasShiftKey: boolean;
} & Required<Pick<InputFProps, "value" | "min" | "max" | "step" | "defaultValue">> &
  Pick<InputNumberFProps, "none">;

// ------------ Utility functions ------------ //
const valueEqualsDefault = (value: number, defaultValue: React.ReactText) => {
  if (String(value) === String(defaultValue)) return "";
  else return value;
};

const increment = (value: number, step: number, max: number) => {
  if (!(value + step > max)) return value + step;
  else return value;
};

const decrement = (value: number, step: number, min: number) => {
  if (!(value - step < min)) return value - step;
  else return value;
};

// ------------ The reducer ------------ //
export const reducer = (state: ReducerInitialStateType, action: ACTIONTYPE): ReducerInitialStateType => {
  const { value: number, min: preMin, max: preMax, step: prevStep, defaultValue, isDisabled, hasShiftKey, none } = state;

  const value = parseFloat(String(number || preMin));
  const min = parseFloat(String(preMin));
  const max = parseFloat(String(preMax));
  const step = parseFloat(String(prevStep));

  if (isDisabled) return state;

  switch (action.type) {
    case ACTIONS.INCREMENT: {
      const stepNumber = parseFloat(String(action.payload.step));
      return { ...state, value: increment(value, stepNumber, max) };
    }
    case ACTIONS.DECREMENT: {
      const stepNumber = parseFloat(String(action.payload.step));
      return { ...state, value: decrement(value, stepNumber, min) };
    }
    case ACTIONS.HANDLE_FOCUS:
      return { ...state, value: valueEqualsDefault(value, defaultValue) };
    case ACTIONS.HANDLE_BLUR:
      if ((!value || String(value) === "" || String(value) === String(defaultValue)) && !none) {
        return { ...state, value: defaultValue.toString() };
      }
      return state;
    case ACTIONS.HANDLE_CHANGE: {
      const { newVal } = action.payload;
      if (hasShiftKey === true) return { ...state, hasShiftKey: false };
      if (isNaN(newVal)) return { ...state, value: "" };
      return { ...state, value: newVal };
    }
    case ACTIONS.HANDLE_KEY_UP_CAPTURE:
      const e = action.payload.e;
      if (!(e.shiftKey && (e.key === "ArrowUp" || e.key === "ArrowDown"))) return { ...state, hasShiftKey: false };
      return state;
    case ACTIONS.HANDLE_KEY_DOWN_CAPTURE: {
      const e = action.payload.e;
      if (e.shiftKey) {
        state = { ...state, hasShiftKey: true };
        if (e.key === "ArrowUp") {
          if (value === 1 || (value.toString() === "" && min === 1)) {
            state = { ...state, value: increment(value, 9, max) };
          } else state = { ...state, value: increment(value, 10, max) };
        } else if (e.key === "ArrowDown") {
          if (value === 1 || (value.toString() === "" && min === 1) || value - 10 < min) {
            state = { ...state, value: decrement(value, 9, min) };
          } else state = { ...state, value: decrement(value, 10, min) };
        }
      } else {
        if (e.key === "ArrowUp") state = { ...state, value: increment(value, step, max) };
        if (e.key === "ArrowDown") state = { ...state, value: decrement(value, step, min) };
      }

      return state;
    }
    default:
      return state;
  }
};
