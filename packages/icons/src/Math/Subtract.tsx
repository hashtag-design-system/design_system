import { createIcon } from "@chakra-ui/icons";
import { IconSVG, EllipseFilled, Path } from "../utils";

export const Subtract = createIcon({
  displayName: "MathSubtractIcon",
  d: "M2.25 13a.75.75 0 01.75-.75h18a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z",
});

// @ts-expect-error
export const SubtractCircle: IconSVG<{
  Filled: typeof SubtractCircleFilled;
}> = createIcon({
  displayName: "MathSubtractCircleIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M7.25 12a.75.75 0 01.75-.75h8a.75.75 0 010 1.5H8a.75.75 0 01-.75-.75zM12 20.5a8.5 8.5 0 100-17a8.5 8.5 0 000 17zm0 1.5c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10z"
    />
  ),
});

export const SubtractCircleFilled = createIcon({
  displayName: "SubtractCircleFilledIcon",
  path: (
    <>
      <EllipseFilled />
      <Path fill="white" d="M7.25 12a.75.75 0 01.75-.75h8a.75.75 0 010 1.5H8a.75.75 0 01-.75-.75z" />
    </>
  ),
});

SubtractCircle.Filled = SubtractCircleFilled;
