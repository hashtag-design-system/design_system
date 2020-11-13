import React from "react";

export type IconPropType = React.ReactNode;

export type InputHelpTextType = {
  value: string;
  icon?: React.ReactNode;
};

export interface GenerateIdParams {
  length: number;
  specialCharacters?: string;
  lowerCase?: boolean;
  upperCase?: boolean;
  numbersOnly?: boolean;
  numbers?: boolean;
  hyphen?: boolean;
  underscore?: boolean;
}

const SelectionInputLabelPositions = ["top", "bottom", "right", "left"] as const;
export type SelectionInputLabelPosition = typeof SelectionInputLabelPositions[number];

export type SelectionInputLabelType = {
  value: string;
  position?: SelectionInputLabelPosition;
  gap?: React.CSSProperties["gap"];
};

export type SelectionInputProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: string | SelectionInputLabelType;
  groupName?: string;
  state?: SelectionInputState;
} & Omit<React.HTMLAttributes<HTMLLabelElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag">;

const SelectionInputStates = ["unchecked", "pressed", "focus-visible", "checked", "disabled|unchecked", "disabled|checked"] as const;
export type SelectionInputState = typeof SelectionInputStates[number];
