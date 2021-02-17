import React from "react";
import { CONFIG } from "../../../config";
import { error, useClassnames, useDisabled, useInputContext } from "../../../utils";
import Input from "../index";
import { ACTIONS } from "./numberReducer";

type Props = {
  isBtnShown?: boolean;
};

export const BaseNumber: React.FunctionComponent<Props> = ({ isBtnShown, children, ...testProps }) => {
  const {
    dispatch,
    min = 0,
    max = 9999999,
    step = 1,
    value,
    defaultValue,
    state = "default",
    floatingplaceholder = false,
    placeholder = "",
    width,
    overrideOnChange,
    forwardref,
    onChange,
    onFocus,
    onBlur,
    onKeyDownCapture,
    onKeyUpCapture,
    onMouseOver,
    ...props
  } = useInputContext();

  const [classNames, rest] = useClassnames("input-number", props);
  const isDisabled = useDisabled(props, state);

  if (dispatch === undefined) {
    error(CONFIG.ERRORS.SOMETHING_WENT_WRONG);
    return null;
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: ACTIONS.HANDLE_FOCUS });
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: ACTIONS.HANDLE_BLUR });
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleKeyDownCapture = (e: React.KeyboardEvent<HTMLInputElement>) => {
    dispatch({ type: ACTIONS.HANDLE_KEY_DOWN_CAPTURE, payload: { e } });
    if (onKeyDownCapture) {
      onKeyDownCapture(e);
    }
  };

  const handleKeyUpCapture = (e: React.KeyboardEvent<HTMLInputElement>) => {
    dispatch({ type: ACTIONS.HANDLE_KEY_UP_CAPTURE, payload: { e } });
    if (onKeyUpCapture) {
      onKeyUpCapture(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (overrideOnChange && onChange) {
      return;
    }
    const newVal = e.target.valueAsNumber;

    if (!isNaN(newVal) && (String(newVal).length > String(max).length || isDisabled || newVal > max || newVal < min)) {
      e.preventDefault();
    } else {
      dispatch({ type: ACTIONS.HANDLE_CHANGE, payload: { newVal } });
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Input
      value={value}
      type="number"
      state={state}
      placeholder={placeholder}
      floatingplaceholder={floatingplaceholder}
      className={classNames}
      forwardref={forwardref}
      width={width}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      min={min}
      max={max}
      step={step}
      disabled={isDisabled}
      overrideOnChange
      data-isbtnshown={isBtnShown}
      onChange={e => handleChange(e)}
      onFocus={e => handleFocus(e)}
      onMouseOver={e => onMouseOver && onMouseOver(e)}
      onBlur={e => handleBlur(e)}
      onKeyDown={e => handleKeyDownCapture(e)}
      onKeyUp={e => handleKeyUpCapture(e)}
      {...rest}
      {...testProps}
    >
      {children}
    </Input>
  );
};
