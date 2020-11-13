import React, { useEffect, useState } from "react";
import { generateId, useClassnames } from "../../utils";
import { Props as InputProps } from "./Input";
import FloatingLabel from "./__helpers__/FloatingLabel";
import LabelContainer from "./__helpers__/LabelContainer";

export type Props = Omit<InputProps, "type" | "icon" | "ref">;

export const Multiline = React.forwardRef<HTMLTextAreaElement, Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (
    {
      placeholder,
      label,
      floatingPlaceholder = true,
      defaultValue,
      state = "default",
      helptext: helpText,
      secondhelptext: secondHelpText,
      allowClear = false,
      cols = 28,
      rows = 5,
      disabled,
      ...props
    },
    ref
  ) => {
    const [id, setId] = useState(props.id || "");
    const [value, setValue] = useState(defaultValue || "");
    const [isActive, setIsActive] = useState(defaultValue === "");

    const { onChange, onFocus, onBlur } = props;
    let [classNames, rest] = useClassnames(`input input-multiline`, props);
    if (state !== "default") {
      classNames += ` ${state}`;
    }

    // Generate a unique ID ofr the form element, if not provided
    useEffect(() => {
      if (id === "") {
        setId(
          generateId({
            length: 5,
            specialCharacters: "-_",
          })
        );
      }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const target = e.target;
      const text = target.value;
      setValue(text);
      setIsActive(true);

      if (onChange) {
        onChange(e);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsActive(true);
      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (e.target.value === "") {
        setIsActive(false);
      }
      if (onBlur) {
        onBlur(e);
      }
    };

    // Check and change (re-validate) Props
    if (floatingPlaceholder && label) {
      floatingPlaceholder = false;
    }

    if (!placeholder) {
      floatingPlaceholder = false;
    }

    return (
      <div className="input__wrapper" style={{ width: props.style?.width }}>
        {(label || helpText) && (
          <LabelContainer
            className="body-12"
            label={label}
            withHelpText={helpText ? true : false}
            withIcon={helpText && helpText.icon ? true : false}
          >
            {helpText?.value}
            {helpText?.icon}
          </LabelContainer>
        )}
        <div className="input__wrapper__field">
          <div className={classNames} style={{ paddingTop: `${label || !floatingPlaceholder ? "12px" : "24px"}` }}>
            <textarea
              ref={ref}
              id={id}
              className={`input ${floatingPlaceholder ? "floating" : ""} input-placeholder-font`}
              placeholder={!floatingPlaceholder ? placeholder : undefined}
              onChange={e => handleChange(e)}
              onFocus={e => handleFocus(e)}
              onBlur={e => handleBlur(e)}
              value={value}
              cols={cols}
              rows={rows}
              disabled={disabled || rest["aria-disabled"] === "true" ? true : false || classNames.includes("disabled")}
              {...rest}
            />
          </div>
          {floatingPlaceholder && (
            <FloatingLabel id={id} isActive={isActive}>
              {placeholder}
            </FloatingLabel>
          )}
        </div>
        {(secondHelpText || props.maxLength) && (
          <LabelContainer
            className="body-12"
            withHelpText
            withIcon={secondHelpText && secondHelpText.icon ? true : false}
            charactersLimit={{ maxLength: props.maxLength, characters: String(value).length }}
            error={state === "error"}
            style={{ marginLeft: `${label || helpText ? "0px" : "12px"}` }}
          >
            {secondHelpText?.icon}
            {secondHelpText?.value}
          </LabelContainer>
        )}
      </div>
    );
  }
);

export default Multiline;
