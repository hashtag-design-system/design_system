import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

const FilledCorner: React.FC = () => (
  <Path fill="white" d="M17.1 9.3 12.8 4.9v3c0 .8.6 1.4 1.4 1.4h3z" />
);

/*
 * <File />
 */

// @ts-expect-error
export const File: IconSVG<{ Filled: typeof FileFilled }> = createIcon({
  displayName: "FileIcon",
  d:
    "M11.8 3.5H7.5A1.5 1.5 0 006 5v14a1.5 1.5 0 001.5 1.5h10A1.5 1.5 0 0019 19v-8.3h-4.4a2.9 2.9 0 01-2.9-2.9V3.5zM20.5 10v9a3 3 0 01-3 3h-10a3 3 0 01-3-3V5a3 3 0 013-3h5l8 8zm-2.9-.8L13.3 4.9v3c0 .8.6 1.4 1.4 1.4h3z",
});

export const FileFilled = createIcon({
  displayName: "FileFilledIcon",
  path: (
    <>
      <Path d="M20 10v9a3 3 0 01-3 3H7a3 3 0 01-3-3V5a3 3 0 013-3h5l8 8z" />
      <FilledCorner />
    </>
  ),
});

File.Filled = FileFilled;

/*
 * <FileWithText />
 */

// @ts-expect-error
export const FileWithText: IconSVG<{
  Filled: typeof FileWithTextFilled;
}> = createIcon({
  displayName: "FileWithTextIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M12.5 2h-6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V10l-8-8zm5.1 7.3L13.3 4.9v3c0 .8.6 1.4 1.4 1.4h3zM11.8 3.5H6.5A.5.5 0 006 4v16a.5.5 0 00.5.5h12a.5.5 0 00.5-.5v-9.3h-4.4a2.9 2.9 0 01-2.9-2.9V3.5zm-1.2 6a.8.8 0 01-.8.8H7.7a.8.8 0 010-1.5h2.1a.8.8 0 01.8.8zm7.5 4.3a.8.8 0 01-.8.8H7.7a.8.8 0 010-1.5h9.6a.8.8 0 01.8.8zm0 4.3a.8.8 0 01-.8.8H7.7a.8.8 0 010-1.5h9.6a.8.8 0 01.8.8z"
    />
  ),
});

export const FileWithTextFilled = createIcon({
  displayName: "FileWithTextFilledIcon",
  path: (
    <>
      <Path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V10l-8-8H6z" />
      <Path
        fill="white"
        d="M17.55 18a.75.75 0 01-.75.75H7.2a.75.75 0 010-1.5h9.6a.75.75 0 01.75.75zM17.55 13.733a.75.75 0 01-.75.75H7.2a.75.75 0 110-1.5h9.6a.75.75 0 01.75.75zM10.083 9.467a.75.75 0 01-.75.75H7.2a.75.75 0 010-1.5h2.133a.75.75 0 01.75.75z"
      />
      <FilledCorner />
    </>
  ),
});

FileWithText.Filled = FileWithTextFilled;
