import React, { useEffect, useState } from "react";
import errors from "../../../config/errors";
import { IconPropType } from "../../../typings";
import { generateId } from "../../../utils";
import { addClassnames } from "../../../utils/styles";
import FloatingLabel from "./FloatingLabel";

const InputStates = ["default", "focused", "success", "error", "disabled"] as const;
export type InputState = typeof InputStates[number];
const InputTypes = ["text", "email", "hidden", "number", "password", "search", "url"] as const;
export type InputType = typeof InputTypes[number];
export type ReactInputHTMLAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "defaultValue" | "type"
> & {
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
      ...props
    },
    ref
  ) => {
    const [id, setId] = useState(props.id || "");
    const [isActive, setIsActive] = useState(value ? true : false);
    const [spanWidth, setSpanWidth] = useState(0);

    const { className, onChange, onFocus, onBlur, ...rest } = props;

    let classNames = addClassnames(`input ${floatingPlaceholder ? "floating " : ""}input-placeholder-font`, props);

    if (state !== "default" && state !== "focused") {
      classNames += ` ${state}`;
    }

    if (!placeholder) {
      floatingPlaceholder = false;
    }

    // TODO: set icon to the clear icon component
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

    useEffect(() => {
      if (!id) {
        setId(
          generateId({
            length: 5,
            specialCharacters: "-_",
          })
        );
      }
    }, [id]);

    return (
      <div className="input__container__base">
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
            ...props.style,
            paddingLeft: prefix ? `${15 + spanWidth}px` : "",
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
