import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "./utils";

// @ts-expect-error
export const Star: IconSVG<{
  Filled: typeof StarFilled;
  HalfColored: typeof StarHalfColored;
}> = createIcon({
  displayName: "StarIcon",
  d:
    "M11.2 4c.4-1.2 2.2-1.2 2.6 0l1.6 5h5.2c1.3 0 1.9 1.7.8 2.4l-4.2 3.1 1.6 5c.4 1.2-1 2.3-2.1 1.5L12.5 17.9l-4.2 3.1c-1.1.8-2.5-.3-2.1-1.5l1.6-5-4.2-3.1c-1.1-.8-.5-2.4.8-2.4h5.2l1.6-5zm1.3.9-1.5 4.7c-.2.6-.7.9-1.3.9H4.8l4 2.9c.5.3.7 1 .5 1.5l-1.5 4.6 4-2.9a1.4 1.4 0 011.6 0l4 2.9-1.5-4.6a1.4 1.4 0 01.5-1.5l4-2.9h-4.9a1.4 1.4 0 01-1.3-.9L12.5 4.9z",
});

export const StarFilled = createIcon({
  displayName: "StarFilledIcon",
  d:
    "M10.7 4c.4-1.2 2.2-1.2 2.6 0l1.6 5h5.2c1.3 0 1.9 1.7.8 2.4l-4.2 3.1 1.6 5c.4 1.2-1 2.3-2.1 1.5L12 17.9l-4.2 3.1c-1.1.8-2.5-.3-2.1-1.5l1.6-5-4.2-3.1c-1.1-.8-.5-2.4.8-2.4h5.2l1.6-5z",
});

export const StarHalfColored = createIcon({
  displayName: "StarHalfColoredIcon",
  path: (
    <>
      <Path
        fill="#FFE100"
        d="M12.5 17.941l-4.246 3.082c-1.058.768-2.481-.267-2.077-1.51l1.621-4.984-4.243-3.079c-1.058-.768-.515-2.443.793-2.443h5.247l1.621-4.985A1.325 1.325 0 0112.5 3.09V17.94z"
        />
      <Path
        fill="#EBEBEB"
        d="M13.784 4.022l1.621 4.985h5.247c1.308 0 1.851 1.675.793 2.443l-4.243 3.08 1.62 4.983c.405 1.243-1.018 2.278-2.076 1.51L12.5 17.94V3.09c.54 0 1.082.31 1.284.932z"
      />
    </>
  ),
});

Star.Filled = StarFilled;
Star.HalfColored = StarHalfColored;
