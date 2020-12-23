import React, { useState } from "react";
import errors from "../../../config/errors";
import { IconPropType } from "../../../typings";
import { error, isError } from "../../../utils";
import { useInputId } from "../../../utils/hooks";
import { ReactProps } from "../../__helpers__";
import BaseInput from "./BaseInput";
import FloatingLabel from "./FloatingLabel";

const InputStates = ["default", "hover", "focus", "success", "error", "disabled"] as const;
export type InputState = typeof InputStates[number];

export type Props = {
  placeholder?: string;
  floatingplaceholder?: boolean | { now: boolean };
  label?: string;
  icon?: IconPropType;
  allowclear?: boolean;
  prefix?: string;
};

export type FProps = Props & ReactProps<InputState>["base_input"];

const FieldContainer = React.forwardRef<HTMLInputElement, FProps>(
  (
    {
      placeholder,
      floatingplaceholder = true,
      type = "text",
      label,
      value,
      className,
      allowTyping: typing = true,
      defaultValue,
      icon,
      allowclear = false,
      children,
      prefix,
      style,
      ...props
    },
    ref
  ) => {
    const { state = "default" } = props;
    const id = useInputId(props.id);
    const [isActive, setIsActive] = useState(value ? true : false);
    const [spanWidth, setSpanWidth] = useState(0);

    if (!placeholder) {
      floatingplaceholder = false;
    }
    if (isError() && !placeholder && !label && type !== "number") {
      error(errors.PLACEHOLDER_OR_LABEL);
    }
    // TODO: Replace with <Icon /> component
    if (isError() && allowclear && icon) {
      error(errors.ALLOW_CLEAR_AND_ICON);
    }
    if (isError() && floatingplaceholder && label) {
      error(errors.FLOATING_PLACEHOLDER_AND_LABEL);
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
          allowTyping={typing}
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
          isActive={isActive || prefix !== undefined || state === "focus"}
        >
          {placeholder}
        </FloatingLabel>
        {icon}
      </div>
    );
  }
);

FieldContainer.displayName = "InputFieldContainer";

export default FieldContainer;
