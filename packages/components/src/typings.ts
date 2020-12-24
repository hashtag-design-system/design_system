import { HTMLMotionProps } from "framer-motion";
import React from "react";
import { ComponentProps } from "./components/__helpers__";

export type IconPropType = React.ReactNode;

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

export type AllProps = React.ComponentPropsWithoutRef<any> | ComponentProps<"input", true ,string> | HTMLMotionProps<any>;

export type AtLeastOneFrom<T> = { [K in keyof T]: Pick<T, K> }[keyof T];

// https://dev.to/brettblox/react-hooks-usereducer-4g3m
// https://stackoverflow.com/a/58903847/13142787
export type ReducerActionType<
  T extends string,
  P extends {} | undefined = undefined,
  E extends boolean | undefined = undefined,
  M extends Record<string, unknown> | undefined = undefined
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
