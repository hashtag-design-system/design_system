import { createIcon } from "@chakra-ui/icons";
import { EllipseFilled, IconSVG, Path } from "./utils";

/*
 * <Close />
 */

export const Close = createIcon({
  displayName: "CloseIcon",
  d:
    "M22.033 2.472a.75.75 0 01-.005 1.061L13.476 12l8.552 8.467a.75.75 0 01-1.056 1.066l-8.563-8.478-8.381 8.299a.75.75 0 01-1.056-1.066L11.344 12 2.972 3.712a.75.75 0 111.056-1.066l8.382 8.299 8.562-8.478a.75.75 0 011.061.005z",
});

/*
 * <CloseCircle />
 */

// @ts-expect-error
export const CloseCircle: IconSVG<{
  Filled: typeof CloseCircleFilled;
}> = createIcon({
  displayName: "CloseCircleIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M8.5 16a.8.8 0 010-1.1l3.2-3.1-3.2-3.1a.8.8 0 111.1-1.1l3.2 3.2 3.3-3.2a.8.8 0 011.1 1.1l-3.3 3.2 3.3 3.2a.8.8 0 01-1.1 1.1l-3.3-3.2-3.2 3.2a.8.8 0 01-1.1 0zM12.5 20.5a8.5 8.5 0 100-17a8.5 8.5 0 000 17zm0 1.5c5.5 0 10-4.5 10-10s-4.5-10-10-10s-10 4.5-10 10s4.5 10 10 10z"
    />
  ),
});

export const CloseCircleFilled = createIcon({
  displayName: "CloseCircleFilledIcon",
  path: (
    <>
      <EllipseFilled />
      <Path
        fill="white"
        d="M7.967 15.953a.75.75 0 01.005-1.06l3.174-3.143-3.174-3.142a.75.75 0 111.056-1.066l3.184 3.153 3.26-3.228a.75.75 0 111.056 1.066l-3.25 3.217 3.25 3.217a.75.75 0 11-1.056 1.066l-3.26-3.228-3.184 3.153a.75.75 0 01-1.061-.005z"
      />
    </>
  ),
});

CloseCircle.Filled = CloseCircleFilled;
