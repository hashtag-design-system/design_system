import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

// @ts-expect-error
export const Image: IconSVG<{ Filled: typeof ImageFilled }> = createIcon({
  displayName: "ImageIcon",
  d:
    "M1.5 3.8A2.8 2.8 0 014.3 1h16.5A2.8 2.8 0 0123.5 3.8v16.5A2.8 2.8 0 0120.7 23H4.3A2.8 2.8 0 011.5 20.2V3.8zm2.8-1.4c-.8 0-1.4.6-1.4 1.4v16.5c0 .4.2.8.5 1L15.7 8.9l6.4 6.4V3.8c0-.8-.6-1.4-1.4-1.4H4.3zm17.8 14.9-6.4-6.4L5.1 21.6h15.7c.8 0 1.4-.6 1.4-1.4v-2.9zM7.9 5.8a1.6 1.6 0 100 3.2a1.6 1.6 0 000-3.2zm-3 1.6a3 3 0 116 0a3 3 0 01-6 0z",
});

export const ImageFilled = createIcon({
  displayName: "ImageFilledIcon",
  path: (
    <>
      <Path d="M1 3.8A2.8 2.8 0 013.8 1h16.5A2.8 2.8 0 0123 3.8v16.5A2.8 2.8 0 0120.2 23H3.8A2.8 2.8 0 011 20.2V3.8z" />
      <Path
        fill="white"
        d="M4.6 21.6h15.7c.8 0 1.4-.6 1.4-1.4v-4.9l-6.4-6.4L2.9 21.3c.3.2 1.3.3 1.7.3zM4.4 7.4a3 3 0 116 0a3 3 0 01-6 0z"
      />
    </>
  ),
});

Image.Filled = ImageFilled;
