import React, { useMemo } from "react";
import { SelectionInputFProps } from "./Base";

const SelectionInputLabelPositions = ["top", "bottom", "right", "left"] as const;
type SelectionInputLabelPosition = typeof SelectionInputLabelPositions[number];

export type SelectionInputLabelType = {
  value: string;
  position?: SelectionInputLabelPosition;
} & Pick<React.CSSProperties, "gap">;

type RequiredInputLabel = Required<SelectionInputLabelType>;

export type Props = Pick<SelectionInputFProps, "id" | "label">;

export const LabelContainer: React.FC<Props> = ({ id, label: propsLabel, children }) => {
  const label: RequiredInputLabel | undefined = useMemo(() => {
    if (propsLabel) {
      const newLabel: RequiredInputLabel = {
        value: "",
        position: (typeof propsLabel === "object" && propsLabel.position) || "right",
        gap: "",
      };

      if (typeof propsLabel === "string") {
        newLabel.value = propsLabel;
      } else {
        newLabel.value = propsLabel.value;
      }

      return newLabel;
    }
  }, [propsLabel]);
  const topOrLeft = label && ["top", "left"].includes(label.position);

  return (
    <>
      {!topOrLeft && children}
      {label && (
        <label htmlFor={id} className="selection-input__span input-label-font" data-testid="selection-input-label">
          {label.value}
        </label>
      )}
      {topOrLeft && children}
    </>
  );
};
