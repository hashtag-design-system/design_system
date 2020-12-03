import React, { useState } from "react";
import errors from "../../../config/errors";
import { IconPropType } from "../../../typings";
import { useInputId } from "../../../utils/hooks";
import BaseInput from "./BaseInput";
import FloatingLabel from "./FloatingLabel";

const InputStates = ["default", "hover", "focus", "success", "error", "disabled"] as const;
export type InputState = typeof InputStates[number];
const InputTypes = ["text", "email", "hidden", "number", "password", "range", "search", "button", "url"] as const;
export type InputType = typeof InputTypes[number];
export type BaseReactInputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "type"> & {
  value?: React.ReactText;
  defaultValue?: React.ReactText;
  typing?: boolean;
  inchange?: (value: React.ReactText) => void;
  inselect?: (key: string, e: React.SyntheticEvent<HTMLLIElement>) => void;
};
export type ReactInputHTMLAttributes = Omit<BaseReactInputHTMLAttributes, "value">;

export type Props = {
  placeholder?: string;
  floatingplaceholder?: boolean | { now: boolean };
  type?: InputType;
  state?: InputState;
  forceState?: boolean;
  label?: string;
  icon?: IconPropType;
  allowclear?: boolean;
  prefix?: string;
};

const BaseField = React.forwardRef<HTMLInputElement, Props & BaseReactInputHTMLAttributes>(
  (
    {
      placeholder,
      floatingplaceholder = true,
      type = "text",
      label,
      value,
      className,
      typing = true,
      defaultValue,
      icon,
      allowclear = false,
      children,
      prefix,
      style,
      inchange,
      ...props
    },
    ref
  ) => {
    const { state = "default", forceState = false } = props;
    const id = useInputId(props.id);
    const [isActive, setIsActive] = useState(value ? true : false);
    const [spanWidth, setSpanWidth] = useState(0);

    if (!placeholder) {
      floatingplaceholder = false;
    }
    if (!placeholder && !label) {
      throw new Error("The property `placeholder` or `label` must be provided");
    }
    // TODO: Replace with <Icon /> component
    if (allowclear && icon) {
      throw new Error(errors.allowClearAndIcon);
    }
    if (floatingplaceholder && label) {
      throw new Error(errors.floatingPlaceholderAndLabel);
    }
    if (state === "error") {
    }

    if (type === "hidden") {
      return null;
    }

    const { onChange, onFocus, onBlur, ...restProps } = props;

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
        <BaseInput
          placeholder={placeholder}
          className={className}
          floatingplaceholder={floatingplaceholder}
          type={type}
          label={label}
          value={value}
          typing={typing}
          defaultValue={defaultValue}
          icon={icon}
          allowclear={allowclear}
          prefix={prefix}
          onChange={e => onChange && onChange(e)}
          onFocus={e => handleFocus(e)}
          onBlur={e => handleBlur(e)}
          state={state}
          ref={ref}
          style={{
            ...style,
            paddingLeft: prefix ? `${20 + spanWidth}px` : undefined,
            paddingRight: icon ? "36px" : undefined,
          }}
          {...restProps}
        />
        <FloatingLabel
          id={id}
          floatingplaceholder={floatingplaceholder}
          defaultValue={defaultValue ? true : false}
          isActive={isActive || prefix !== undefined}
        >
          {placeholder}
        </FloatingLabel>
        {icon}
      </div>
    );
  }
);

BaseField.displayName = "InputBaseField";

export default BaseField;
