import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

/*
 * <Heart />
 */

// @ts-expect-error
export const Heart: IconSVG<{ Filled: typeof HeartFilled }> = createIcon({
  displayName: "HeartIcon",
  d:
    "M13.463 6.25l-1.039 1.019-1.05-.99A4.458 4.458 0 0010.01 5.4l.57-1.388a5.958 5.958 0 011.824 1.176l.126-.124.003.003a5.883 5.883 0 011.786-1.131 6.022 6.022 0 014.521.01c.718.293 1.37.722 1.92 1.261l-1.05 1.07a4.455 4.455 0 00-1.436-.942 4.522 4.522 0 00-3.392-.008c-.495.2-.945.485-1.331.842l-.088.08zm7.44 7.028c.49-.51.88-1.103 1.152-1.752a5.684 5.684 0 00-.01-4.436 5.827 5.827 0 00-1.285-1.883l-1.05 1.07c.41.403.733.878.954 1.399a4.186 4.186 0 01.008 3.269c-.2.478-.489.917-.851 1.295l-.104.107L12.53 19.4 5.357 12.36l-.13-.132a4.326 4.326 0 01-.89-1.328A4.192 4.192 0 014 9.278a4.125 4.125 0 011.246-2.98 4.29 4.29 0 011.405-.917 4.428 4.428 0 011.675-.318c.577.003 1.149.118 1.684.337l.57-1.388a5.997 5.997 0 00-2.247-.449 5.928 5.928 0 00-2.241.427 5.79 5.79 0 00-1.896 1.237A5.625 5.625 0 002.5 9.286c.004.755.16 1.504.458 2.203.283.664.69 1.271 1.198 1.79l-.003.003 7.677 7.531a1 1 0 001.4 0l7.677-7.531-.004-.004zm-8.723 6.464z",
});

export const HeartFilled = createIcon({
  displayName: "HeartFilledIcon",
  d:
    "M12.9 4.7a6 6 0 00-4.1-1.6a5.9 5.9 0 00-2.2.4a5.8 5.8 0 00-1.9 1.2A5.6 5.6 0 003 8.8c0 .8.2 1.5.5 2.2c.3.7.7 1.3 1.2 1.8l0 0 7.7 7.5a1 1 0 001.4 0l7.7-7.5 0 0c.5-.5.9-1.1 1.2-1.8a5.7 5.7 0 000-4.4a5.8 5.8 0 00-1.3-1.9a6 6 0 00-1.9-1.3a6 6 0 00-4.5 0a5.9 5.9 0 00-1.8 1.1l0 0-.1.1z",
});

Heart.Filled = HeartFilled;

/*
 * <Heart2 />
 */

// @ts-expect-error
export const Heart2: IconSVG<{ Colored: typeof Heart2Colored }> = createIcon({
  displayName: "Heart2Icon",
  d:
    "M8.97 9.68a.75.75 0 010-1.06l2.371-2.372A4.459 4.459 0 0010.01 5.4l.57-1.388a5.958 5.958 0 011.824 1.176l.126-.124.003.003a5.883 5.883 0 011.786-1.131 6.022 6.022 0 014.521.01c.718.293 1.37.722 1.92 1.261l-1.05 1.07a4.455 4.455 0 00-1.436-.942 4.522 4.522 0 00-3.392-.008c-.495.2-.945.485-1.331.842l-.088.08-.382.376a.732.732 0 01-.05.055l-3 3a.75.75 0 01-1.061 0zm11.933 3.598c.49-.51.88-1.103 1.152-1.752a5.684 5.684 0 00-.01-4.436 5.827 5.827 0 00-1.285-1.883l-1.05 1.07c.41.403.733.878.954 1.399a4.186 4.186 0 01.008 3.269c-.2.478-.489.917-.851 1.295l-.104.107L12.53 19.4 5.357 12.36l-.13-.132a4.326 4.326 0 01-.89-1.328A4.192 4.192 0 014 9.278a4.125 4.125 0 011.246-2.98 4.29 4.29 0 011.405-.917 4.428 4.428 0 011.675-.318c.577.003 1.149.118 1.684.337l.57-1.388a5.997 5.997 0 00-2.247-.449 5.928 5.928 0 00-2.241.427 5.79 5.79 0 00-1.896 1.237A5.625 5.625 0 002.5 9.286c.004.755.16 1.504.458 2.203.283.664.69 1.271 1.198 1.79l-.003.003 7.677 7.531a1 1 0 001.4 0l7.677-7.531-.004-.004zm-8.723 6.464z",
});

export const Heart2Colored = createIcon({
  displayName: "Heart2ColoredIcon",
  path: (
    <>
      <Path
        fill="white"
        d="M8.97 9.18a.75.75 0 010-1.06l2.371-2.372 1.159.963-2.47 2.47a.75.75 0 01-1.06 0z"
      />
      <Path
        fill="red"
        d="M8.97 9.18a.75.75 0 010-1.06l2.371-2.372a4.497 4.497 0 00-3.016-1.185 4.428 4.428 0 00-1.674.318 4.29 4.29 0 00-1.405.917A4.125 4.125 0 004 8.778c.003.554.117 1.106.338 1.623.21.49.51.941.89 1.329l.129.131L12.53 18.9l7.187-7.052.104-.107a4.25 4.25 0 00.852-1.295 4.186 4.186 0 00-.009-3.27 4.328 4.328 0 00-.954-1.397 4.455 4.455 0 00-1.436-.943 4.522 4.522 0 00-3.392-.008c-.495.2-.945.485-1.331.842l-.088.08-.382.376a.732.732 0 01-.05.055l-3 3a.75.75 0 01-1.061 0z"
      />
    </>
  ),
});

Heart2.Colored = Heart2Colored;
