import React from "react";
import { useClassnames, useInputId } from "../../../utils/hooks";
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
  Omit<ComponentProps<"input" | "label", false, S extends undefined ? SelectionInputState : S>, "onClick"> &
  Pick<React.ComponentPropsWithoutRef<"label">, "onClick"> & { checked?: boolean; type?: ComponentProps<"input">["type"] };

export type FProps = SelectionInputFProps &
  Pick<React.ComponentPropsWithoutRef<"div">, "onClick"> &
  Omit<React.ComponentPropsWithRef<"label">, "onClick">;

export const Base: React.FC<FProps> = ({
  defaultChecked = false,
  checked = defaultChecked,
  state = "default",
  label,
  groupName,
  type,
  onClick,
  onChange,
  className,
  children,
  ref,
  ...props
}) => {
  const id = useInputId(props.id);
  const topOrBottom = label && typeof label === "object" && label.position ? ["top", "bottom"].includes(label.position) : false;

  const [classNames, rest] = useClassnames("selection-input__hidden-input", props);

  return (
    <div
      className={`selection-input__container ${className ? className : ""}`}
      style={{
        width: props.style?.width,
        flexDirection: topOrBottom ? "column" : undefined,
        gap: label && typeof label === "object" && label.gap !== undefined ? label.gap : undefined,
      }}
      data-testid="selection-input__container"
    >
      <LabelContainer label={label} id={id}>
        <input
          type={type}
          className={classNames}
          checked={checked}
          value={String(checked)}
          onChange={() => console.log()}
          name={groupName}
          disabled={state.includes("disabled")}
          aria-labelledby={id}
          data-testid="selection-input-base"
          {...rest}
        />
        {children}
      </LabelContainer>
    </div>
  );
};
