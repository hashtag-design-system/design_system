import { createIcon } from "@chakra-ui/icons";
import { EllipseFilled, IconSVG, Path } from "./utils";

/*
 * <CheckMark />
 */

export const CheckMark = createIcon({
  displayName: "CheckMarkIcon",
  d:
    "M22.835 4.454a.75.75 0 01.033 1.06L10.13 19.052a.75.75 0 01-1.085.008l-6.084-6.27a.75.75 0 111.076-1.044l5.538 5.706 12.2-12.966a.75.75 0 011.06-.032z",
});

/*
 * <CheckMarkCircle />
 */

// @ts-expect-error
export const CheckMarkCircle: IconSVG<{
  Filled: typeof CheckMarkCircleFilled;
}> = createIcon({
  displayName: "CheckMarkCircleIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M12.5 2.75a9.25 9.25 0 100 18.5 9.25 9.25 0 000-18.5zM1.75 12c0-5.937 4.813-10.75 10.75-10.75S23.25 6.063 23.25 12 18.437 22.75 12.5 22.75 1.75 17.937 1.75 12zm15.606-3.546a.75.75 0 01.032 1.06l-5.307 5.64a.75.75 0 01-1.084.01L8.462 12.55a.75.75 0 011.076-1.045l1.989 2.05 4.769-5.07a.75.75 0 011.06-.032z"
    />
  ),
});

export const CheckMarkCircleFilled = createIcon({
  displayName: "CheckMarkCircleFilledIcon",
  path: (
    <>
      <EllipseFilled />
      <Path
        fill="white"
        d="M16.856 8.454a.75.75 0 01.032 1.06l-5.307 5.64a.75.75 0 01-1.084.01L7.962 12.55a.75.75 0 011.076-1.045l1.989 2.05 4.769-5.07a.75.75 0 011.06-.032z"
      />
    </>
  ),
});

CheckMarkCircle.Filled = CheckMarkCircleFilled;
