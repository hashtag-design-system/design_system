import { HTMLMotionProps } from "framer-motion";
import React from "react";
import { BaseReactInputHTMLAttributes } from "./components/Input";

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

export type AllProps = React.AllHTMLAttributes<unknown> | BaseReactInputHTMLAttributes | HTMLMotionProps<any>;

export type AtLeastOneFrom<T> = { [K in keyof T]: Pick<T, K> }[keyof T];

// https://dev.to/brettblox/react-hooks-usereducer-4g3m
// https://stackoverflow.com/a/58903847/13142787
export type ReducerActionType<
  T extends string,
  P extends {} | undefined,
  E = boolean | undefined,
  M = Record<string, unknown> | undefined
> = {
  type: T;
} & (P extends undefined
  ? {}
  : {
      payload: P;
    }) &
  (E extends true ? { error: boolean } : {}) &
  (M extends undefined
    ? {}
    : {
        metadata: M;
      });

export type ValueOf<T> = T[keyof T];
