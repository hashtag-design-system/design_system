import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

// @ts-expect-error
export const Map: IconSVG<{ Filled: typeof MapFilled }> = createIcon({
  displayName: "MapIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M8.2 2.3a.8.8 0 01.7 0l7.7 3.5 4.9-2.5a1.9 1.9 0 012.8 1.7v11.7c0 .7-.4 1.4-1.1 1.7l-6.3 3.3a.8.8 0 01-.7 0l-7.7-3.5-4.9 2.5A1.9 1.9 0 01.8 19v-11.7c0-.7.4-1.4 1.1-1.7l6.3-3.3zM9.3 16.9l6.5 2.9V7.1L9.3 4.2v12.8zM7.8 4.2v12.7l-4.8 2.5a.5.5 0 01-.7-.4V7.3a.5.5 0 01.2-.4L7.8 4.2zm9.5 2.8V19.8l5.3-2.7a.5.5 0 00.2-.4V5a.5.5 0 00-.7-.4l-4.8 2.5z"
    />
  ),
});

export const MapFilled = createIcon({
  displayName: "MapFilledIcon",
  d:
    "M7.7 2.3a.8.8 0 01.7 0l7.7 3.5 4.9-2.5a1.9 1.9 0 012.8 1.7v11.7c0 .7-.4 1.4-1.1 1.7l-6.3 3.3a.8.8 0 01-.7 0l-7.7-3.5-4.9 2.5A1.9 1.9 0 01.3 19v-11.7c0-.7.4-1.4 1.1-1.7l6.3-3.3z",
});

Map.Filled = MapFilled;
