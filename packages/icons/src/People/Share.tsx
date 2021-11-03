import { createIcon } from "@chakra-ui/icons";
import { IconSVG } from "../utils";

// @ts-expect-error
export const Share: IconSVG<{ Filled: typeof ShareFilled }> = createIcon({
  displayName: "ShareIcon",
  d:
    "M17.6 3.8a2.1 2.1 0 100 4.2a2.1 2.1 0 000-4.2zm-3.6 2.1a3.6 3.6 0 11.5 1.9l-6.8 3.6c.1.4.2.8.2 1.2c0 .5-.1 1.1-.3 1.5l6.8 3.6a3.6 3.6 0 11-.3 1.5v0l-7.4-3.9a3.6 3.6 0 11.3-5.2l7.1-3.7a3.6 3.6 0 010-.5zm-9.7 4.5a2.1 2.1 0 100 4.2a2.1 2.1 0 000-4.2zm13.3 6.7a2.1 2.1 0 100 4.2a2.1 2.1 0 000-4.2z",
});

export const ShareFilled = createIcon({
  displayName: "ShareFilledIcon",
  d:
    "M14.1 5.8a3.6 3.6 0 11.5 1.9l-6.8 3.6c.1.4.2.8.2 1.2c0 .5-.1 1.1-.3 1.5l6.8 3.6a3.6 3.6 0 11-.3 1.5v0l-7.4-3.9a3.6 3.6 0 11.3-5.2l7.1-3.7a3.6 3.6 0 010-.5z",
});

Share.Filled = ShareFilled;
