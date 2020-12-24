import React from "react";
import { useClassnames, useDisabled, useInputId } from "../../../utils/hooks";
import { InputBaseFProps } from "../index";

const BaseInput = React.forwardRef<HTMLInputElement, InputBaseFProps>(
  ({ placeholder, value, type, floatingplaceholder, allowclear, children, ...props }, ref) => {
    const { state = "default" } = props;

    const id = useInputId(props.id);
    let [classNames, rest] = useClassnames(`input input-placeholder-font ${floatingplaceholder ? "floating" : ""}`, props);
    const isDisabled = useDisabled(props);
    // Change and revalidate Props
    // Set related to the <Select /> component
    if (state !== "default" && state === "focus") {
      classNames += ` ${state}`;
    }

    return (
      <>
        <input
          id={id}
          type={type}
          className={classNames}
          placeholder={!floatingplaceholder ? placeholder : undefined}
          value={value}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-placeholder={placeholder}
          ref={ref}
          {...rest}
        />
        {children}
      </>
    );
  }
);

export default BaseInput;
