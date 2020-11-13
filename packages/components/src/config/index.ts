import { tuple, tupleNum } from "../utils/type";

export const InputComponentStates = tuple("default", "focus-visible", "hover", "disabled");

export const IconPositions = tuple("left", "right");
export type IconPosition = typeof IconPositions[number];

export const IconSizes = tupleNum(24, 36);
export type IconSize = typeof IconSizes[number];
