import React, { useMemo } from "react";
import { SelectionInputLabelType, SelectionInputProps } from "../../../typings";

type RequiredInputLabel = Required<SelectionInputLabelType>;

export type Props = {
  id?: string;
  label: SelectionInputProps["label"];
};

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
        <label htmlFor={id} className="selection-input__span input-label-font">
          {label.value}
        </label>
      )}
      {topOrLeft && children}
    </>
  );
};
