import React from "react";
import { ComponentProps, SelectionInputProps } from "../index";
import { LabelContainer } from "./LabelContainer";

export const SelectionInputStates = [
  "default",
  "pressed",
  "focus-visible",
  "checked",
  "disabled|unchecked",
  "disabled|checked",
] as const;
export type SelectionInputState = typeof SelectionInputStates[number];

// TODO: State
export type SelectionInputFProps<S extends string | undefined = undefined> = SelectionInputProps &
  Omit<ComponentProps<"input" | "label", false, S extends undefined ? SelectionInputState : S>, "onClick" | "onKeyDownCapture"> &
  Pick<React.ComponentPropsWithoutRef<"label">, "onClick" | "onKeyDownCapture"> & {
    checked?: boolean;
    type?: ComponentProps<"input">["type"];
  };

export type FProps = Pick<SelectionInputFProps, "label"> & React.ComponentPropsWithoutRef<"div">;
export const Base: React.FC<FProps> = ({ id, defaultChecked = false, label, onClick, onChange, className, children, ...props }) => {
  const topOrBottom = label && typeof label === "object" && label.position ? ["top", "bottom"].includes(label.position) : false;

  return (
    <div
      className={`selection-input__container ${className ? className : ""}`}
      style={{
        width: props.style?.width,
        flexDirection: topOrBottom ? "column" : undefined,
        gap: label && typeof label === "object" && label.gap !== undefined ? label.gap : undefined,
      }}
      data-testid="selection-input__container"
      {...props}
    >
      <LabelContainer label={label} id={id}>
        {children}
      </LabelContainer>
    </div>
  );
};
