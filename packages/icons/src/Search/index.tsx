import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";
import { Filters } from "./Filters";
import { NotFound } from "./NotFound";

type SubComponents = { Filled: typeof SearchFilled } & {
  NotFound: typeof NotFound;
  Filters: typeof Filters;
};

// @ts-expect-error
const Search: IconSVG<SubComponents> = createIcon({
  displayName: "SearchIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M15.898 16.448a8.5 8.5 0 111.143-.968l4.99 4.99a.75.75 0 11-1.061 1.06l-5-5a.759.759 0 01-.072-.082zM18 9.5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  ),
});

const SearchFilled = createIcon({
  displayName: "SearchFilledIcon",
  d:
    "M15.398 16.448a8.5 8.5 0 111.143-.968l4.99 4.99a.75.75 0 11-1.061 1.06l-5-5a.759.759 0 01-.072-.082z",
});

Search.Filled = SearchFilled;

Search.NotFound = NotFound;
Search.Filters = Filters;

Search.displayName = "SearchIcon";

export default Search;
