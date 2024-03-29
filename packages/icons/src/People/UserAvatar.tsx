import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

// @ts-expect-error
export const UserAvatar: IconSVG<{
  Filled: typeof UserAvatarFilled;
}> = createIcon({
  displayName: "UserAvatarIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M11.9 10.4c1.9 0 3.5-1.6 3.5-3.4c0-1.9-1.6-3.4-3.5-3.4C10 3.5 8.4 5.1 8.4 6.9c0 1.9 1.5 3.4 3.5 3.4zM5.5 20.5h12.6c1.1 0 2-1 1.8-2c-.2-1.3-.4-2.4-.8-3.2c-.4-.8-.9-1.3-1.8-1.5a.4.4 0 00-.2 0c-.1 0-.2.1-.4.2c-.6.3-1.4.7-2.3 1c-.8.3-1.8.6-2.6.6c-.8 0-1.7-.3-2.5-.5a20.7 20.7 0 01-2.2-.9a1.5 1.5 0 00-.5-.2a.3.3 0 00-.1 0c-.8.5-1.8 1.7-2.6 5c-.2.8.4 1.6 1.5 1.6zm1.1-6.6 0 0a0 0 0 010 0zm5.3-2c2.8 0 5-2.2 5-4.9C16.9 4.2 14.7 2 11.9 2C9.2 2 6.9 4.2 6.9 6.9c0 2.7 2.2 4.9 5 4.9zM5.5 22h12.6c2 0 3.6-1.8 3.3-3.7c-.3-2.6-1-5.3-3.7-6c-.6-.1-1.1 0-1.7.3c-1.1.6-3.1 1.4-4.2 1.4c-1.1 0-2.9-.7-4-1.3c-.6-.3-1.4-.5-2-.1c-1.4.8-2.5 2.5-3.3 5.9c-.4 1.8 1 3.5 2.9 3.5z"
    />
  ),
});

export const UserAvatarFilled = createIcon({
  displayName: "UserAvatarFilledIcon",
  d:
    "M11.9 11.9c2.7 0 5-2.2 5-4.9C16.8 4.2 14.6 2 11.9 2C9.1 2 6.9 4.2 6.9 6.9c0 2.7 2.2 4.9 5 4.9zM5.5 22h12.6c1.9 0 3.5-1.8 3.3-3.7c-.3-2.6-1-5.3-3.7-6c-.6-.1-1.1 0-1.6.3c-1.1.6-3.1 1.4-4.2 1.4c-1.1 0-2.8-.7-4-1.3c-.6-.3-1.4-.5-2-.1c-1.4.8-2.5 2.5-3.3 5.9c-.4 1.8 1 3.5 2.9 3.5z",
});

UserAvatar.Filled = UserAvatarFilled;