import React from "react";
import { useClassnames } from "../../../utils/hooks";
import { ReactProps, SelectionInputProps } from "../index";
import { LabelContainer } from "./LabelContainer";

export const SelectionInputStates = ["default", "pressed", "focus-visible", "checked", "disabled|unchecked", "disabled|checked"] as const;
export type SelectionInputState = typeof SelectionInputStates[number];

// TODO: State
export type SelectionInputFProps<S extends string | undefined = undefined> = SelectionInputProps &
  Omit<ReactProps<S extends undefined ? SelectionInputState : S>["input"], "onClick"> &
  Pick<React.ComponentPropsWithoutRef<"label">, "onClick">;

export type FProps = SelectionInputFProps &
  Pick<React.ComponentPropsWithoutRef<"div">, "onClick"> &
  Omit<React.ComponentPropsWithRef<"label">, "onClick">;

export const Base: React.FC<FProps> = ({
  id,
  checked,
  defaultChecked,
  state = "default",
  label,
  groupName,
  type,
  onClick,
  onChange,
  className,
  children,
  ...props
}) => {
  const topOrBottom = label && typeof label === "object" && label.position ? ["top", "bottom"].includes(label.position) : false;

  const [classNames, rest] = useClassnames("selection-input__hidden-input", props);

  return (
    <div
      className={`selection-input__container ${className}`}
      style={{
        width: props.style?.width,
        flexDirection: topOrBottom ? "column" : undefined,
        gap: label && typeof label === "object" && label.gap !== undefined ? label.gap : undefined,
      }}
    >
      <LabelContainer label={label} id={id}>
        <input
          type={type}
          className={classNames}
          checked={checked}
          onChange={e => onChange && onChange(e)}
          name={groupName}
          disabled={state.includes("disabled")}
          {...rest}
        />
        {children}
      </LabelContainer>
    </div>
  );
};
