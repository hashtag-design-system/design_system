import { createIcon } from "@chakra-ui/icons";
import { IconSVG } from "./utils";

// @ts-expect-error
export const Bookmark: IconSVG<{ Filled: typeof BookmarkFilled }> = createIcon({
  displayName: "BookmarkIcon",
  d:
    "M12.5 13.6l5.5 5V2.5H7v16.1l5.5-5zm0 2-5.3 4.9c-.6.6-1.7.1-1.7-.7V2a1 1 0 011-1h12a1 1 0 011 1v17.7c0 .9-1 1.3-1.7.7L12.5 15.6z",
});

export const BookmarkFilled = createIcon({
  displayName: "BookmarkFilledIcon",
  d:
    "M12 15.6l-5.3 4.9c-.6.6-1.7.1-1.7-.7V2a1 1 0 011-1h12a1 1 0 011 1v17.7c0 .9-1 1.3-1.7.7L12 15.6z",
});

Bookmark.Filled = BookmarkFilled;
