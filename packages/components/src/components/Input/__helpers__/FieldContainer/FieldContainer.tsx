import React, { useEffect, useRef, useState } from "react";
import { InputContextProvider, useInputContext } from "../../../../utils/contexts";
import { Base } from "../Base/Base";
import { FixGroup } from "../FixGroup/FixGroup";
import { OuterFieldContainer } from "../OuterFieldContainer/OuterFieldContainer";

export const DEFAULT_PADDING = 8 + 12;
export const EM_REM_MULTIPLIER = 16;

export const FieldContainer: React.FunctionComponent = () => {
  const {
    value: propsValue,
    id,
    type,
    label,
    defaultValue,
    placeholder,
    floatingplaceholder = true,
    prefix,
    suffix,
    characterLimit,
    maxLength,
    allowClear,
    onChange,
    children,
    overrideOnChange,
    style,
    ...rest
  } = useInputContext();

  const [value, setValue] = useState<React.ReactText>(defaultValue || "");
  const [prefixWidth, setPrefixWidth] = useState<number>(0);
  const [suffixWidth, setSuffixWidth] = useState<number>(0);

  const prefixRef = useRef<HTMLDivElement>(null);
  const suffixRef = useRef<HTMLDivElement>(null);

  // TODO: Replace with <Icon /> component
  if (allowClear) {
    // suffix = <>
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;

    if (characterLimit && maxLength && String(newVal).length > maxLength) {
      e.preventDefault();
    }

    setValue(newVal);

    if (onChange) {
      onChange(e);
    }
  };

  useEffect(() => {
    if (prefixRef && prefixRef.current) {
      const prefixWidth = prefixRef.current.offsetWidth;
      setPrefixWidth(prefixWidth);
    }
    if (suffixRef && suffixRef.current) {
      const suffixWidth = suffixRef.current.offsetWidth;
      setSuffixWidth(suffixWidth);
    }
  }, [prefix, suffix]);

  return (
    <OuterFieldContainer prefixWidth={prefixWidth}>
      <InputContextProvider
        value={{
          ...rest,
          id,
          value: overrideOnChange ? propsValue : value,
          placeholder: floatingplaceholder === false && placeholder ? placeholder : undefined,
          onChange: e => handleChange(e),
          style: {
            ...style,
            paddingLeft: prefix ? `${(prefixWidth + DEFAULT_PADDING) / EM_REM_MULTIPLIER}em` : "",
            paddingRight: suffix ? `${(suffixWidth + DEFAULT_PADDING) / EM_REM_MULTIPLIER}em` : "",
          },
          type,
          label,
          defaultValue,
          floatingplaceholder,
          prefix,
          suffix,
          characterLimit,
          maxLength,
          allowClear,
          overrideOnChange,
        }}
      >
        <FixGroup group={prefix} ref={prefixRef} position="left" data-testid="prefix" />
        <Base />
        {children}
        <FixGroup group={suffix} ref={suffixRef} position="right" data-testid="suffix" />
      </InputContextProvider>
    </OuterFieldContainer>
  );
};
