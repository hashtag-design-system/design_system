import React, { useState } from "react";
import errors from "../../../config/errors";
import { IconPropType } from "../../../typings";
import { useClassnames, useInputId } from "../../../utils";
import FloatingLabel from "./FloatingLabel";

const InputStates = ["default", "focus", "success", "error", "disabled"] as const;
export type InputState = typeof InputStates[number];
const InputTypes = ["text", "email", "hidden", "number", "password", "search", "url"] as const;
export type InputType = typeof InputTypes[number];
export type ReactInputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "type"> & {
  invalue?: (value: string | number) => void;
};

export type Props = {
  placeholder?: string;
  floatingPlaceholder?: boolean;
  type?: InputType;
  state?: InputState;
  label?: string;
  value?: string | number;
  icon?: IconPropType;
  allowClear?: boolean;
  prefix?: string;
};

export const InputBase = React.forwardRef<HTMLInputElement, Props & ReactInputHTMLAttributes>(
  (
    {
      placeholder,
      floatingPlaceholder = true,
      type = "text",
      label,
      value,
      state = "default",
      icon,
      allowClear = false,
      disabled,
      children,
      prefix,
      invalue,
      style,
      ...props
    },
    ref
  ) => {
    const id = useInputId(props.id);
    const [isActive, setIsActive] = useState(value ? true : false);
    const [spanWidth, setSpanWidth] = useState(0);
    let [classNames, rest] = useClassnames(`input ${floatingPlaceholder ? "floating " : ""}input-placeholder-font`, props);

    if (state !== "default") {
      classNames += ` ${state}`;
    }
    if (!placeholder) {
      floatingPlaceholder = false;
    }

    const { onChange, onFocus, onBlur } = props;

    // TODO: Replace with <Icon /> component
    // Check and change (re-validate) Props
    if (allowClear && icon) {
      throw new Error(errors.allowClearAndIcon);
    }
    if (floatingPlaceholder && label) {
      throw new Error(errors.floatingPlaceholderAndLabel);
    }
    if (state === "error") {
    }

    if (type === "hidden") {
      return null;
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsActive(true);
      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setIsActive(false);
      }
      if (onBlur) {
        onBlur(e);
      }
    };

    return (
      <div className="input__wrapper__base">
        {prefix && (
          <span
            ref={el => {
              if (!el) return;

              setSpanWidth(Math.round(el.getBoundingClientRect().width));
            }}
            className="input__prefix body-16 light"
          >
            {prefix}
          </span>
        )}
        {children}
        <input
          id={id}
          type={type}
          className={classNames}
          placeholder={!floatingPlaceholder ? placeholder : undefined}
          value={value}
          onChange={e => onChange && onChange(e)}
          onFocus={e => handleFocus(e)}
          onBlur={e => handleBlur(e)}
          disabled={disabled || rest["aria-disabled"] === "true" ? true : false || classNames.includes("disabled")}
          ref={ref}
          style={{
            ...style,
            paddingLeft: prefix ? `${20 + spanWidth}px` : undefined,
            paddingRight: icon ? "36px" : undefined,
          }}
          {...rest}
        />
        {floatingPlaceholder && (
          <FloatingLabel id={id} isActive={isActive || prefix !== undefined}>
            {placeholder}
          </FloatingLabel>
        )}
        {icon}
      </div>
    );
  }
);

export default InputBase;
