import React from "react";
import { SelectionInputProps } from "../../../typings";
import { useClassnames } from "../../../utils/hooks";
import { LabelContainer } from "./LabelContainer";

export type Props = SelectionInputProps & {
  ref?: React.ForwardedRef<HTMLLabelElement>;
  onChange: React.AllHTMLAttributes<HTMLInputElement>["onChange"];
};

export const Base: React.FC<Props & Omit<React.AllHTMLAttributes<HTMLInputElement>, "label" | "onChange">> = ({
  checked,
  defaultChecked,
  state = "default",
  label,
  groupName,
  type,
  children,
  onClick,
  onChange,
  id,
  ...props
}) => {
  const topOrBottom = label && typeof label === "object" && label.position ? ["top", "bottom"].includes(label.position) : false;

  const [classNames, rest] = useClassnames("selection-input__hidden-input", props);

  return (
    <div
      className="selection-input__wrapper"
      style={{
        width: props.style?.width,
        flexDirection: topOrBottom ? "column" : undefined,
        gap: label && typeof label === "object" && label.gap !== undefined ? label.gap : undefined,
      }}
      onClick={onClick}
    >
      <LabelContainer label={label} id={id}>
        <input
          type={type}
          className={classNames}
          checked={checked}
          onChange={onChange}
          onClick={onClick}
          value={label ? (typeof label === "object" ? label.value : label) : undefined}
          name={groupName}
          disabled={state.includes("disabled")}
          {...rest}
        />
        {children}
      </LabelContainer>
    </div>
  );
};
