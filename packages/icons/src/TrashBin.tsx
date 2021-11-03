import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "./utils";

// @ts-expect-error
export const TrashBin: IconSVG<{
  Filled: typeof TrashBinFilled;
  HandleFilled: typeof TrashBinHandleFilled;
}> = createIcon({
  displayName: "TrashBinIcon",
  d:
    "M8.469 2.5a.75.75 0 01.75-.75h6.562a.75.75 0 01.75.75v1.133H20a.75.75 0 010 1.5H5a.75.75 0 010-1.5h3.469V2.5zm1.5 1.133h5.062V3.25H9.97v.383zM5 7.078a.75.75 0 01.75.75v9.76c0 1.863 1.265 3.162 2.583 3.162h8.334c1.318 0 2.583-1.299 2.583-3.163V7.828a.75.75 0 011.5 0v9.76c0 2.457-1.72 4.662-4.083 4.662H8.333c-2.363 0-4.083-2.205-4.083-4.663V7.828a.75.75 0 01.75-.75zm5 2.445a.75.75 0 01.75.75v7.782a.75.75 0 01-1.5 0v-7.781a.75.75 0 01.75-.75zm5 0a.75.75 0 01.75.75v7.782a.75.75 0 01-1.5 0v-7.781a.75.75 0 01.75-.75z",
});

export const TrashBinFilled = createIcon({
  displayName: "TrashBinFilledIcon",
  path: (
    <>
      <Path d="M4.5 7.078h15a.75.75 0 01.75.75v9.76c0 2.457-1.72 4.662-4.083 4.662H7.833c-2.363 0-4.083-2.205-4.083-4.663V7.828a.75.75 0 01.75-.75z" />
      <Path d="M7.969 2.5a.75.75 0 01.75-.75h6.562a.75.75 0 01.75.75v1.133H19.5a.75.75 0 010 1.5h-15a.75.75 0 010-1.5h3.469V2.5z" />
      <Path
        fill="white"
        d="M9.5 9.5a.8.8 0 01.8.8v7.8a.8.8 0 01-1.5 0v-7.8a.8.8 0 01.8-.8zM14.5 9.5a.8.8 0 01.8.8v7.8a.8.8 0 01-1.5 0v-7.8a.8.8 0 01.8-.8z"
      />
    </>
  ),
});

export const TrashBinHandleFilled = createIcon({
  displayName: "TrashBinHandleFilledIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M8 2.5a.8.8 0 01.8-.8h6.6a.8.8 0 01.8.8v1.1H19.5a.8.8 0 010 1.5h-15a.8.8 0 010-1.5h3.5V2.5zM4.5 7.1a.8.8 0 01.8.8v9.8c0 1.9 1.3 3.2 2.6 3.2h8.3c1.3 0 2.6-1.3 2.6-3.2V7.8a.8.8 0 011.5 0v9.8c0 2.5-1.7 4.7-4.1 4.7H7.8c-2.4 0-4.1-2.2-4.1-4.7V7.8a.8.8 0 01.8-.8zm5 2.4a.8.8 0 01.8.8v7.8a.8.8 0 01-1.5 0v-7.8a.8.8 0 01.8-.8zm5 0a.8.8 0 01.8.8v7.8a.8.8 0 01-1.5 0v-7.8a.8.8 0 01.8-.8z"
    />
  ),
});

TrashBin.Filled = TrashBinFilled;
TrashBin.HandleFilled = TrashBinHandleFilled;
