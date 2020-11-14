import React, { useState } from "react";
import errors from "../../../config/errors";
import { IconPropType } from "../../../typings";
import { useClassnames, useInputId } from "../../../utils/hooks";
import FloatingLabel from "./FloatingLabel";

const InputStates = ["default", "hover", "focus", "success", "error", "disabled"] as const;
export type InputState = typeof InputStates[number];
const InputTypes = ["text", "email", "hidden", "number", "password", "search", "url"] as const;
export type InputType = typeof InputTypes[number];
export type BaseReactInputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "type"> & {
  value?: React.ReactText;
  defaultValue?: React.ReactText;
  inchange?: (value: React.ReactText) => void;
};
export type ReactInputHTMLAttributes = Omit<BaseReactInputHTMLAttributes, "value">;

export type Props = {
  placeholder?: string;
  floatingPlaceholder?: boolean;
  type?: InputType;
  state?: InputState;
  label?: string;
  icon?: IconPropType;
  allowClear?: boolean;
  prefix?: string;
};

export const Base = React.forwardRef<HTMLInputElement, Props & BaseReactInputHTMLAttributes>(
  (
    {
      placeholder,
      floatingPlaceholder = true,
      type = "text",
      label,
      value,
      defaultValue,
      state = "default",
      icon,
      allowClear = false,
      disabled,
      children,
      prefix,
      inchange,
      style,
      ...props
    },
    ref
  ) => {
    const id = useInputId(props.id);
    const [isActive, setIsActive] = useState(value ? true : false);
    const [spanWidth, setSpanWidth] = useState(0);
    let [classNames, rest] = useClassnames(`input ${floatingPlaceholder ? "floating" : ""} input-placeholder-font`, props);

    // Change and revalidate Props
    if (state !== "default") {
      classNames += ` ${state}`;
    }

    if (!placeholder) {
      floatingPlaceholder = false;
    }
    if (!placeholder && !label) {
      throw new Error("The property `placeholder` or `label` must be provided");
    }
    // TODO: Replace with <Icon /> component
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

    const { onChange, onFocus, onBlur } = props;

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
          defaultValue={defaultValue}
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
          <FloatingLabel id={id} defaultValue={defaultValue ? true : false} isActive={isActive || prefix !== undefined}>
            {placeholder}
          </FloatingLabel>
        )}
        {icon}
      </div>
    );
  }
);

export default Base;
