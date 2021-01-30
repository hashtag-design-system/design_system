export { listKeys } from "./lists";
export { breakpoints } from "./styles";

export const IconPositions = ["left", "right"] as const;
export type IconPosition = typeof IconPositions[number];

export type IconSize = 24 | 36;
