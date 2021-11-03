import { createIcon } from "@chakra-ui/icons";
import { Path } from "./utils";

export const Forbidden = createIcon({
  displayName: "ForbiddenIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M6 6.5a8.5 8.5 0 0012 12L6 6.5zm13 10.9L7 5.5a8.5 8.5 0 0112 12zm1.1 1.1A10 10 0 0022.5 12c0-5.5-4.5-10-10-10s-10 4.5-10 10s4.5 10 10 10a10 10 0 006.5-2.4c.4-.3.7-.7 1.1-1.1z"
    />
  ),
});
