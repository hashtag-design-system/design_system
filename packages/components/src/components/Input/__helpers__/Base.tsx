import React, { useState } from "react";
import errors from "../../../config/errors";
import { IconPropType } from "../../../typings";
import { useClassnames, useDisabled, useInputId } from "../../../utils/hooks";
import FloatingLabel from "./FloatingLabel";

const InputStates = ["default", "hover", "focus", "success", "error", "disabled"] as const;
export type InputState = typeof InputStates[number];
const InputTypes = ["text", "email", "hidden", "number", "password", "search", "button", "url"] as const;
export type InputType = typeof InputTypes[number];
export type BaseReactInputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "type"> & {
  value?: React.ReactText;
  defaultValue?: React.ReactText;
  typing?: boolean;
  inchange?: (value: React.ReactText) => void;
};
export type ReactInputHTMLAttributes = Omit<BaseReactInputHTMLAttributes, "value">;

export type Props = {
  placeholder?: string;
  floatingplaceholder?: boolean;
  type?: InputType;
  state?: InputState;
  label?: string;
  icon?: IconPropType;
  allowClear?: boolean;
  prefix?: string;
};

const Base = React.forwardRef<HTMLInputElement, Props & BaseReactInputHTMLAttributes>(
  (
    {
      placeholder,
      floatingplaceholder: floatingPlaceholder = true,
      type = "text",
      label,
      value,
      typing = true,
      defaultValue,
      icon,
      allowClear = false,
      children,
      prefix,
      style,
      inchange,
      ...props
    },
    ref
  ) => {
    const { state = "default" } = props;
    const id = useInputId(props.id);
    const [isActive, setIsActive] = useState(value ? true : false);
    const [spanWidth, setSpanWidth] = useState(0);
    const isDisabled = useDisabled(props) || !typing;
    let [classNames, rest] = useClassnames(`input input-placeholder-font ${floatingPlaceholder ? "floating" : ""}`, props);

    // Change and revalidate Props
    // Set related to the <Select /> component
    if (state !== "default" && (typing || state === "focus")) {
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

    const { onChange, onFocus, onBlur, ...restProps } = rest;

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
          disabled={isDisabled}
          aria-disabled={isDisabled}
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
          floatingPlaceholder={floatingPlaceholder}
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

Base.displayName = "InputBase";

export default Base;
