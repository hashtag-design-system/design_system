import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "./utils";

// @ts-expect-error
export const Flame: IconSVG<{ Filled: typeof FlameFilled }> = createIcon({
  displayName: "FlameIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M13.4 2.9c.4 3.2 2.2 5 3.6 6.4l.3.3C18.9 11.3 20 12.4 20 14.7c0 3.9-3.1 6.8-7.3 6.8C8.4 21.5 5 18.6 5 14.7c0-1.2.4-2.2 1-3c.5.9 1.1 1.5 1.9 1.8c1.2.5 2.3.1 3-.6l-1-1.1 1 1.1c1.1-1.1.9-2.6.3-3.8c-1-1.9-.6-3.3.2-4.5c.6-.8 1.3-1.4 2-1.8zm.8-1.9c.3-.1.6.2.7.5c0 3.4 1.7 5.2 3.3 6.8l.2.2c1.6 1.6 3.1 3.2 3.1 6.1c0 4.8-3.9 8.3-8.8 8.3c-5 0-9.2-3.4-9.2-8.3c0-2 1-4 2.6-4.9c.3-.2.7 0 .8.3c1 2.5 2.3 2.5 3 1.8c.4-.4.5-1.1 0-2.1c-2.5-4.8 1.9-8.3 4.3-8.9z"
    />
  ),
});

export const FlameFilled = createIcon({
  displayName: "FlameFilledIcon",
  d:
    "M13.7 1c.3-.1.6.2.7.5c0 3.4 1.7 5.2 3.3 6.8l.2.2C19.5 10.2 21 11.8 21 14.7C21 19.6 17.1 23 12.2 23C7.2 23 3 19.6 3 14.7c0-2 1-4 2.6-4.9c.3-.2.7 0 .8.3c1 2.5 2.3 2.5 3 1.8c.4-.4.5-1.1 0-2.1c-2.5-4.8 1.9-8.3 4.3-8.9z",
});

Flame.Filled = FlameFilled;
