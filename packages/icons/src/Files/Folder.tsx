import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

// @ts-expect-error
export const Folder: IconSVG<{ Filled: typeof FolderFilled }> = createIcon({
  displayName: "FolderIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M21 17v-6a1.5 1.5 0 00-1.5-1.5h-6.4a2.5 2.5 0 01-2.2-1.4l-1.2-2.3a.5.5 0 00-.4-.3H5.5A1.5 1.5 0 004 7v10a1.5 1.5 0 001.5 1.5h14A1.5 1.5 0 0021 17zM5.5 4a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3v-6a3 3 0 00-3-3h-6.4a1 1 0 01-.9-.6l-1.2-2.3A2 2 0 009.3 4H5.5z"
    />
  ),
});

export const FolderFilled = createIcon({
  displayName: "FolderFilledIcon",
  d:
    "M5 4a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3v-6a3 3 0 00-3-3h-6.4a1 1 0 01-.9-.6l-1.2-2.3A2 2 0 008.8 4H5z",
});

Folder.Filled = FolderFilled;
