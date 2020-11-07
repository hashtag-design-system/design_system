import React, { useMemo } from "react";
import { SelectionInputLabelType } from "../../typings";
import { CheckboxProps } from "../Checkbox/index";

type RequiredInputLabel = Required<SelectionInputLabelType>;

export type Props = {
  label: CheckboxProps["label"];
};

export const SelectionInputLabelContainer: React.FC<Props> = ({ label: propsLabel, children }) => {
  const label: Required<SelectionInputLabelType> | undefined = useMemo(() => {
    if (propsLabel) {
      const newLabel: Required<SelectionInputLabelType> = {
        value: "",
        position: (typeof propsLabel === "object" && propsLabel.position) || "right",
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
      {label && <span className="checkbox__span input-label-font">{label.value}</span>}
      {topOrLeft && children}
    </>
  );
};

export default SelectionInputLabelContainer;
