import React, { useState } from "react";
import errors from "../../config/errors";
import { error, isError } from "../../utils";
import { useClassnames, useDisabled, useInputId } from "../../utils/hooks";
import { InputFProps } from "./index";
import FloatingLabel from "./__helpers__/FloatingLabel";
import HelpTextContainer from "./__helpers__/HelpTextContainer";

export type FProps = Omit<InputFProps, "type" | "icon" | "ref"> & React.ComponentPropsWithoutRef<"textarea">;

const Multiline = React.forwardRef<HTMLTextAreaElement, FProps>(
  ({ placeholder, floatingplaceholder = true, defaultValue, cols = 28, rows = 5, ...props }, ref) => {
    const {
      label,
      // allowClear = false,
    } = props;

    const id = useInputId(props.id);
    const [value, setValue] = useState(defaultValue || "");
    const [isActive, setIsActive] = useState(defaultValue === "");
    const isDisabled = useDisabled(props);
    let [classNames, rest] = useClassnames("input input-multiline", props, {
      stateToRemove: { state: props.state },
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
    if (isError() && floatingplaceholder && label) {
      error(errors.FLOATING_PLACEHOLDER_AND_LABEL);
      return null;
    }
    if (isError() && !placeholder) {
      error(errors.PLACEHOLDER_OR_LABEL);
      return null;
    }

    return (
      <div className="input__wrapper" style={{ width: props.style?.width }}>
        <HelpTextContainer value={value} {...props}>
          <div className="input__wrapper__base">
            <div className={classNames} style={{ paddingTop: `${label || !floatingplaceholder ? "12px" : "20px"}` }}>
              <textarea
                ref={ref}
                id={id}
                className={`${classNames} ${floatingplaceholder ? "floating" : ""} input-placeholder-font`}
                placeholder={!floatingplaceholder ? placeholder : undefined}
                onChange={e => handleChange(e)}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e)}
                value={value}
                // * Enable / disabled the Grammarly extension
                // data-gramm="false"
                cols={cols}
                rows={rows}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                {...rest}
              />
            </div>
            <FloatingLabel
              id={id}
              floatingplaceholder={floatingplaceholder}
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
