import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

// @ts-expect-error
export const NotFound: IconSVG<{ Filled: typeof NotFoundFilled }> = createIcon({
  displayName: "NotFoundIcon",
  path: (
    <>
      <Path
        fillRule="evenodd"
        d="M15.898 16.448a8.5 8.5 0 111.143-.968l4.99 4.99a.75.75 0 11-1.061 1.06l-5-5a.759.759 0 01-.072-.082zM18 9.5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
      <Path d="M14.547 6.208a.7.7 0 01-.005.99L12.218 9.5l2.325 2.303a.7.7 0 01-.985.994l-2.335-2.312-2.28 2.257a.7.7 0 11-.984-.995L10.227 9.5l-2.27-2.247a.7.7 0 01.985-.995l2.28 2.257 2.335-2.312a.7.7 0 01.99.005z" />
    </>
  ),
});

export const NotFoundFilled = createIcon({
  displayName: "NotFoundFilledIcon",
  path: (
    <>
      <Path d="M15.4 16.4a8.5 8.5 0 111.1-1l5 5a.8.8 0 11-1.1 1.1l-5-5a.8.8 0 01-.1-.1z" />
      <Path
        fill="white"
        d="M13.797 6.208a.7.7 0 01-.005.99L11.468 9.5l2.325 2.303a.7.7 0 01-.985.994l-2.335-2.312-2.28 2.257a.7.7 0 11-.984-.995L9.477 9.5l-2.27-2.247a.7.7 0 01.985-.995l2.28 2.257 2.335-2.312a.7.7 0 01.99.005z"
      />
    </>
  ),
});

NotFound.Filled = NotFoundFilled;
