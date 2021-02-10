import { HTMLMotionProps } from "framer-motion";
import React from "react";
import { ComponentProps } from "./components/__helpers__";
import { CONFIG } from "./config";

export const UserSelectionInputEventTypes = ["click", "space"] as const;
export type UserSelectionInputEventType = typeof UserSelectionInputEventTypes[number];

export type IconPropType = React.ReactNode;

export type SortDirection = "asc" | "desc";

export type AllProps = React.ComponentPropsWithoutRef<any> | ComponentProps<"input", true, string> | HTMLMotionProps<any>;

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

export type IconPosition = typeof CONFIG.iconPositions[number];

export type IconSize = 24 | 36;

export type LiteralUnion<T extends U, U = string> = T | (U & {});
export type NumberLiteralUnion<T extends U, U = number> = T | (U & {});