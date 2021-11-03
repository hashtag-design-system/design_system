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

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

export type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

export type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never;
    }[keyof T]
  : "";

export type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";

type NestedObjectType = {
  a: string;
  b: string;
  nest: {
    c: string;
  };
  otherNest: {
    c: string;
  };
};

export type NestedObjectPaths = Paths<NestedObjectType>;
// type NestedObjectPaths = "a" | "b" | "nest" | "otherNest" | "nest.c" | "otherNest.c"
export type NestedObjectLeaves = Leaves<NestedObjectType>;
// type NestedObjectLeaves = "a" | "b" | "nest.c" | "otherNest.c"
