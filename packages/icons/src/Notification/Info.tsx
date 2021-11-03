import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

// @ts-expect-error
export const Info: IconSVG<{ Filled: typeof InfoFilled }> = createIcon({
  displayName: "InfoIcon",
  path: (
    <>
      <Path d="M13.5 8a1 1 0 11-2 0 1 1 0 012 0z" />
      <Path
        fillRule="evenodd"
        d="M12.5 10.5a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75zm0 10a8 8 0 100-16 8 8 0 000 16zm0 1.5a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
      />
    </>
  ),
});

export const InfoFilled = createIcon({
  displayName: "InfoFilledIcon",
  path: (
    <>
      <Path d="M12 22a9.5 9.5 0 100-19a9.5 9.5 0 000 19z" />
      <Path fill="white" d="M13 8a1 1 0 11-2 0 1 1 0 012 0zM12 10.5a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75z" />
    </>
  ),
});

Info.Filled = InfoFilled;
