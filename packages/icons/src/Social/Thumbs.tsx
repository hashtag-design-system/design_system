import { createIcon } from "@chakra-ui/icons";
import { IconSVG } from "../utils";

/*
 * <ThumbsUp />
 */

// @ts-expect-error
export const ThumbsUp: IconSVG<{ Filled: typeof ThumbsUpFilled }> = createIcon({
  displayName: "ThumbsUpIcon",
  d:
    "M2.5 11.1h3V20.5h-3v-9.4zM10.3 20.5h7.9c.7 0 1.3-.4 1.6-1l2.6-5.6c.1-.2.1-.4.1-.6v-1.6c0-.9-.8-1.6-1.8-1.6h-5.5l.8-3.7 0-.3c0-.3-.1-.6-.4-.8l-.3-.2a1 1 0 00-1.3 0L9 9.8A1.5 1.5 0 008.5 10.9v8c0 .9.8 1.6 1.8 1.6zm0-9.6 3.3-3c.1-.1.4 0 .3.2l-.6 2.3a1 1 0 001 1.3h6.6v1.6l-2.6 5.6H10.3v-8z",
});

export const ThumbsUpFilled = createIcon({
  displayName: "ThumbsUpFilledIcon",
  d:
    "M2 10.6h3V20H2v-9.4zM9.8 20h7.9c.7 0 1.3-.4 1.6-1l2.6-5.6c.1-.2.1-.4.1-.6v-1.6c0-.9-.8-1.6-1.8-1.6h-5.5l.8-3.7 0-.3c0-.3-.1-.6-.4-.8l-.3-.2a1 1 0 00-1.3 0L8.5 9.3A1.5 1.5 0 008 10.4v8c0 .9.8 1.6 1.8 1.6z",
});

ThumbsUp.Filled = ThumbsUpFilled;

/*
 * <ThumbsDown />
 */

// @ts-expect-error
export const ThumbsDown: IconSVG<{
  Filled: typeof ThumbsDownFilled;
}> = createIcon({
  displayName: "ThumbsDownIcon",
  d:
    "M22.5 13.9h-3V4.5h3v9.4zM14.8 4.5H6.9c-.7 0-1.3.4-1.6 1l-2.6 5.6a1.5 1.5 0 00-.1.6v1.6c0 .9.8 1.6 1.8 1.6h5.5l-.8 3.7 0 .3c0 .3.1.6.4.8l.3.2a1 1 0 001.3 0l5.1-4.7c.3-.3.5-.7.5-1.1v-8c0-.9-.8-1.6-1.8-1.6zm0 9.6-3.3 3c-.1.1-.4 0-.3-.2l.6-2.3a1 1 0 00-1-1.3H4.3v-1.6l2.6-5.6h7.9v8z",
});

export const ThumbsDownFilled = createIcon({
  displayName: "ThumbsDownFilledIcon",
  d:
    "M22 13.4h-3V4h3v9.4zM14.3 4H6.4c-.7 0-1.3.4-1.6 1l-2.6 5.6A1.5 1.5 0 002 11.2v1.6c0 .9.8 1.6 1.8 1.6h5.5l-.8 3.7 0 .3c0 .3.1.6.4.8l.3.2a1 1 0 001.3 0l5.1-4.7c.3-.3.5-.7.5-1.1v-8c0-.9-.8-1.6-1.8-1.6z",
});

ThumbsDown.Filled = ThumbsDownFilled;
