export { listKeys } from "./lists";

export const IconPositions = ["left", "right"] as const;
export type IconPosition = typeof IconPositions[number];

export type IconSize = 24 | 36;
