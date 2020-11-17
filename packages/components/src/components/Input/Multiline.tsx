import React, { useState } from "react";
import errors from "../../config/errors";
import { useClassnames, useDisabled, useInputId } from "../../utils/hooks";
import { Props as InputProps } from "./Input";
import FloatingLabel from "./__helpers__/FloatingLabel";
import HelpTextContainer from "./__helpers__/HelpTextContainer";

export type Props = Omit<InputProps, "type" | "icon" | "ref">;

const Multiline = React.forwardRef<HTMLTextAreaElement, Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ placeholder, floatingplaceholder: floatingPlaceholder = true, defaultValue, cols = 28, rows = 5, ...props }, ref) => {
    const {
      label,
      // allowClear = false,
    } = props;

    const id = useInputId(props.id);
    const [value, setValue] = useState(defaultValue || "");
    const [isActive, setIsActive] = useState(defaultValue === "");
    const isDisabled = useDisabled(props);
    let [classNames, rest] = useClassnames(`input input-multiline`, props, {
      stateToRemove: { state: props.state, defaultState: "default" },
    });

    const { onChange, onFocus, onBlur } = props;

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
      throw new Error(errors.floatingPlaceholderAndLabel);
    }
    if (!placeholder) {
      throw new Error(errors.placeholderOrLabel);
    }

    return (
      <div className="input__wrapper" style={{ width: props.style?.width }}>
        <HelpTextContainer value={value} {...props}>
          <div className="input__wrapper__base">
            <div className={classNames} style={{ paddingTop: `${label || !floatingPlaceholder ? "12px" : "20px"}` }}>
              <textarea
                ref={ref}
                id={id}
                className={`input ${floatingPlaceholder ? "floating" : ""} input-placeholder-font`}
                placeholder={!floatingPlaceholder ? placeholder : undefined}
                onChange={e => handleChange(e)}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e)}
                value={value}
                // * Enable / disabled the Grammarly extension
                // data-gramm="false"
                cols={cols}
                rows={rows}
                disabled={isDisabled}
                {...rest}
              />
            </div>
            <FloatingLabel
              id={id}
              floatingPlaceholder={floatingPlaceholder}
              defaultValue={defaultValue ? true : false}
              isActive={isActive}
            >
              {placeholder}
            </FloatingLabel>
          </div>
        </HelpTextContainer>
      </div>
    );
  }
);

Multiline.displayName = "InputMultiline";

export default Multiline;
