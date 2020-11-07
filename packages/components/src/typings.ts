import React from "react";

export type IconPropType = {
  component: React.ReactNode;
  color?: string;
};

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
export type SelectionInputLabelPosition = typeof SelectionInputLabelPositions[number]

export type SelectionInputLabelType = {
  value: string;
  position?: SelectionInputLabelPosition;
}