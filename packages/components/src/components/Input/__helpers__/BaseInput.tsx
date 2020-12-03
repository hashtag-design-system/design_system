import React from "react";
import { useClassnames, useDisabled, useInputId } from "../../../utils/hooks";
import { BaseReactInputHTMLAttributes, Props as InputProps } from "./BaseField";

const BaseInput = React.forwardRef<HTMLInputElement, InputProps & BaseReactInputHTMLAttributes>(
  ({ placeholder, value, defaultValue, type, floatingplaceholder, forceState, typing, allowclear, children, ...props }, ref) => {
    const { state = "default" } = props;

    const id = useInputId(props.id);
    let [classNames, rest] = useClassnames(`input input-placeholder-font ${floatingplaceholder ? "floating" : ""}`, props);
    const isDisabled = useDisabled(props) || typing === false;

    // Change and revalidate Props
    // Set related to the <Select /> component
    if (state !== "default" && (typing || state === "focus")) {
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
          defaultValue={defaultValue}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-placeholder={placeholder}
          data-forcestate={forceState}
          ref={ref}
          {...rest}
        />
        {children}
      </>
    );
  }
);

export default BaseInput;
