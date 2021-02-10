import React, { useState } from "react";
import { useClassnames, useDisabled, useInputId } from "../../utils";
import { InputContextProvider } from "../../utils";
import { ComponentProps } from "../__helpers__";
import { InputSBProps } from "./index";
import { InputContainer, OuterFieldContainer } from "./__helpers__";

export type FProps = Omit<InputSBProps, "type" | "prefix" | "suffix"> & Omit<ComponentProps<"textarea">, "value" | "type" | "prefix">;

const Multiline = React.forwardRef<HTMLTextAreaElement, FProps>(
  (
    {
      placeholder = "Placeholder",
      floatingplaceholder = true,
      defaultValue,
      state = "default",
      cols = 28,
      rows = 5,
      forwardref,
      characterLimit,
      maxLength,
      allowClear,
      onChange,
      ...props
    },
    ref
  ) => {
    const id = useInputId(props.id);
    const [value, setValue] = useState<React.ReactText>(defaultValue || "");
    const [classNames, rest] = useClassnames("input input-multiline", props, { stateToRemove: { state } });
    const isDisabled = useDisabled(props, state);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newVal = e.target.value;

      if (characterLimit && maxLength && String(newVal).length > maxLength) {
        return;
      }

      setValue(newVal);

      if (onChange) {
        onChange(e);
      }
    };

    // TODO: Replace with <Icon /> component
    if (allowClear) {
      // suffix = <>
    }

    return (
      <InputContextProvider
        value={{
          ...rest,
          value,
          id,
          onChange: handleChange,
          placeholder,
          floatingplaceholder,
          defaultValue,
          state,
          characterLimit,
          maxLength,
          allowClear,
        }}
      >
        <InputContainer>
          <OuterFieldContainer>
            <textarea
              id={id}
              className={classNames}
              value={value || ""}
              placeholder={floatingplaceholder === false && placeholder ? placeholder : undefined}
              disabled={isDisabled}
              aria-disabled={isDisabled}
              aria-label={placeholder}
              onChange={e => handleChange(e)}
              ref={ref}
              data-hasfloatingplaceholder={floatingplaceholder}
              // * Enable / disabled the Grammarly extension
              // data-gramm="false"
              cols={cols}
              rows={rows}
              data-testid="input-multiline"
              {...rest}
            />
          </OuterFieldContainer>
        </InputContainer>
      </InputContextProvider>
    );
  }
);

Multiline.displayName = "InputMultiline";

export default Multiline;
