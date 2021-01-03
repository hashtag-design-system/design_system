import React from "react";
import { useInputContext } from "../../../../utils/contexts/InputContext";
import { useClassnames, useDisabled, useInputId } from "../../../../utils/hooks";
import { ComponentProps } from "../../../__helpers__";
import { InputType } from "../../../__helpers__/props";

export type Props = {
  value?: React.ReactText;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  type?: InputType;
  overrideOnChange?: boolean;
};

export type FProps<S extends string = string> = Props & Omit<ComponentProps<"input", false, S>, "prefix" | "icon" | "value">;

export const Base: React.FunctionComponent = () => {
  const {
    id: propsId,
    value,
    defaultValue,
    placeholder,
    type,
    floatingplaceholder,
    state = "default",
    onChange,
    style,
    children: propsChildren,
    characterLimit,
    overrideOnChange,
    allowClear,
    // ! Not to be included in the HTML element
    forwardref,
    maxLength,
    disabled,
    ...props
  } = useInputContext();

  const id = useInputId(propsId);
  const [classNames, rest] = useClassnames("input", props, { stateToRemove: { state } });
  const isDisabled = useDisabled(props, state) || disabled;

  // return type === "textarea" ? (
  //   <textarea
  //     id={id}
  //     className={classNames}
  //     value={value || ""}
  //     placeholder={placeholder}
  //     disabled={isDisabled}
  //     aria-disabled={isDisabled}
  //     aria-label={placeholder}
  //     ref={ref}
  //     // * Enable / disabled the Grammarly extension
  //     // data-gramm="false"
  //     cols={28}
  //     rows={5}
  //     {...rest}
  //   />
  // ) : (
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (overrideOnChange && onChange) {
      e.preventDefault();
      onChange(e);
      return;
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      id={id}
      type={type}
      className={classNames}
      value={value}
      placeholder={!floatingplaceholder ? placeholder : undefined}
      disabled={Boolean(isDisabled)}
      aria-disabled={isDisabled}
      aria-label={placeholder}
      ref={forwardref}
      data-hasfloatingplaceholder={floatingplaceholder}
      data-testid="input"
      onChange={e => handleChange(e)}
      style={style}
      maxLength={maxLength}
      {...rest}
    />
  );
};
