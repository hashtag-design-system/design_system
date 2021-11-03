import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

// @ts-expect-error
export const Save: IconSVG<{ Filled: typeof SaveFilled }> = createIcon({
  displayName: "SaveIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M9.8 16a.8.8 0 01.8-.8h4a.8.8 0 010 1.5h-4a.8.8 0 01-.8-.8zm0 3a.8.8 0 01.8-.8h4a.8.8 0 010 1.5h-4a.8.8 0 01-.8-.8zM8.8 7.3h5.4a.1.1 0 00.1-.1V3.5h-5.5v3.7c0 0 0 .1.1.1zM7.3 3.5H6.5A.5.5 0 006 4v16a.5.5 0 00.5.5h.8v-7.7c0-.9.7-1.6 1.6-1.6h7.4c.9 0 1.6.7 1.6 1.6v7.7h.8a.5.5 0 00.5-.5V6.9a.6.6 0 00-.2-.4l-2.8-2.8a.6.6 0 00-.3-.2V7.2a1.6 1.6 0 01-1.6 1.6H8.8A1.6 1.6 0 017.3 7.2V3.5zM6.5 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V6.9c0-.6-.2-1.1-.6-1.5l-2.8-2.8A2.1 2.1 0 0015.6 2H6.5zm9.8 18.5v-7.7a.1.1 0 00-.1-.1H8.8a.1.1 0 00-.1.1v7.7h7.5z"
    />
  ),
});

export const SaveFilled = createIcon({
  displayName: "SaveFilledIcon",
  path: (
    <>
      <Path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V6.9c0-.6-.2-1.1-.6-1.5l-2.8-2.8A2.1 2.1 0 0015.1 2H6z" />
      <Path
        fill="white"
        d="M9.3 16a.8.8 0 01.8-.8h4a.8.8 0 010 1.5h-4a.8.8 0 01-.8-.8zM9.3 19a.8.8 0 01.8-.8h4a.8.8 0 010 1.5h-4a.8.8 0 01-.8-.8z"
      />
      <Path
        fill="white"
        d="M6.8 20.5v-7.7c0-.9.7-1.6 1.6-1.6h7.4c.9 0 1.6.7 1.6 1.6v7.7h-1.5v-7.7a.1.1 0 00-.1-.1H8.3a.1.1 0 00-.1.1v7.7h-1.5zM8.3 7.3h5.4a.1.1 0 00.1-.1V3.5l1.5 0V7.2a1.6 1.6 0 01-1.6 1.6H8.3A1.6 1.6 0 016.8 7.2V3.5h1.5v3.7c0 0 0 .1.1.1z"
      />
    </>
  ),
});

Save.Filled = SaveFilled;
