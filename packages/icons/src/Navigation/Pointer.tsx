import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

// @ts-expect-error
export const Pointer: IconSVG<{ Filled: typeof PointerFilled }> = createIcon({
  displayName: "PointerIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M12.5 6.3 7.8 17.7l3-2a3 3 0 013.3 0l3 2L12.5 6.3zm.9-3c-.3-.8-1.5-.8-1.9 0L4.7 20c-.4.9.7 1.8 1.5 1.2l5.7-3.8a1 1 0 011.1 0l5.7 3.8c.8.5 1.9-.3 1.5-1.2L13.4 3.3z"
    />
  ),
});

export const PointerFilled = createIcon({
  displayName: "PointerFilledIcon",
  d:
    "M12.9 3.3c-.3-.8-1.5-.8-1.9 0L4.2 20c-.4.9.7 1.8 1.5 1.2l5.7-3.8a1 1 0 011.1 0l5.7 3.8c.8.5 1.9-.3 1.5-1.2L12.9 3.3z",
});

Pointer.Filled = PointerFilled;
