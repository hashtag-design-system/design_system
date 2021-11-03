import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

// @ts-expect-error
export const Safari: IconSVG<{ Filled: typeof SafariFilled; Colored: typeof SafariColored }> = createIcon({
  displayName: "SafariIcon",
  d:
    "M12.5 3.75a8.25 8.25 0 100 16.5a8.25 8.25 0 000-16.5zM2.75 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.75 17.385 2.75 12zm12.104-2.338-3.068.997-1.236 3.15 3.067-.996 1.237-3.151zm.321-1.682c.892-.29 1.719.588 1.377 1.461l-1.605 4.091a1.11 1.11 0 01-.69.65l-4.029 1.31c-.892.289-1.719-.589-1.376-1.462l1.604-4.09a1.11 1.11 0 01.69-.651l4.03-1.309z",
});

export const SafariFilled = createIcon({
  displayName: "SafariFilledIcon",
  path: (
    <>
      <Path d="M2.3 12c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8s-4.4 9.8-9.8 9.8S2.3 17.4 2.3 12z" />
      <Path
        fill="white"
        d="M14.7 8c.9-.3 1.7.6 1.4 1.5l-1.6 4.1a1.1 1.1 0 01-.7.7l-4 1.3c-.9.3-1.7-.6-1.4-1.5l1.6-4.1a1.1 1.1 0 01.7-.7l4-1.3z"
      />
    </>
  ),
});

export const SafariColored = createIcon({
  displayName: "SafariColoredIcon",
  path: (
    <>
      <Path d="M12.5 3.75a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5zM2.75 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.75 17.385 2.75 12z" />
      <Path
        fill="#C2C2C2"
        d="M14.256 14.182l-4.028 1.31c-.892.289-1.719-.589-1.376-1.462l1.604-4.09c.055-.14.137-.266.24-.371L14.61 14c-.121.119-.188.129-.354.182z"
      />
      <Path
        fill="red"
        d="M15.175 7.98c.892-.29 1.719.588 1.376 1.461l-1.604 4.091c-.058.147-.227.36-.337.468l-3.914-4.431a1.11 1.11 0 01.45-.28l4.03-1.309z"
      />
    </>
  ),
});

Safari.Filled = SafariFilled;
Safari.Colored = SafariColored;
