import { createIcon } from "@chakra-ui/icons";
import { IconSVG, EllipseFilled, Path } from "../utils";

export const Add = createIcon({
  displayName: "MathAddIcon",
  d:
    "M12 2.25a.75.75 0 01.75.75v8.25H21a.75.75 0 010 1.5h-8.25V21a.75.75 0 01-1.5 0v-8.25H3a.75.75 0 010-1.5h8.25V3a.75.75 0 01.75-.75z",
});

// @ts-expect-error
export const AddCircle: IconSVG<{
  Filled: typeof AddCircleFilled;
}> = createIcon({
  displayName: "MathAddCircleIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M7.5 12a.8.8 0 01.8-.8h3v-3a.8.8 0 011.5 0v3h3a.8.8 0 010 1.5h-3v3a.8.8 0 01-1.5 0v-3h-3A.8.8 0 017.5 12zm4.5 8.5a8.5 8.5 0 100-17a8.5 8.5 0 000 17zm0 1.5c5.5 0 10-4.5 10-10S17.5 2 12 2S2 6.5 2 12s4.5 10 10 10z"
    />
  ),
});

export const AddCircleFilled = createIcon({
  displayName: "AddCircleFilledIcon",
  path: (
    <>
      <EllipseFilled />
      <Path
        fill="white"
        d="M7.5 12a.75.75 0 01.75-.75h3v-3a.75.75 0 011.5 0v3h3a.75.75 0 010 1.5h-3v3a.75.75 0 01-1.5 0v-3h-3A.75.75 0 017.5 12z"
      />
    </>
  ),
});

AddCircle.Filled = AddCircleFilled;
