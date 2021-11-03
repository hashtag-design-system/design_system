import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

// @ts-expect-error
export const Email: IconSVG<{ Filled: typeof EmailFilled }> = createIcon({
  displayName: "EmailIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M2.5 6.5a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2h-16a2 2 0 01-2-2v-12zM21 9.465V18.5a.5.5 0 01-.5.5h-16a.5.5 0 01-.5-.5V9.465l8.07 5.65a.75.75 0 00.86 0L21 9.464zm0-1.83V6.5a.5.5 0 00-.5-.5h-16a.5.5 0 00-.5.5v1.135l8.5 5.95 8.5-5.95z"
    />
  ),
});

export const EmailFilled = createIcon({
  displayName: "EmailFilledIcon",
  path: (
    <>
      <Path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
      <Path
        fill="white"
        d="M11.57 14.614L3.5 8.965 2 8V6l1.5 1.135 8.5 5.95 8.5-5.95L22 6v2l-1.5.965-8.07 5.65a.75.75 0 01-.86 0z"
      />
    </>
  ),
});

Email.Filled = EmailFilled;
