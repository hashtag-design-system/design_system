import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

// @ts-expect-error
export const CreditCard: IconSVG<{
  Filled: typeof CreditCardFilled;
}> = createIcon({
  displayName: "CreditCardIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M2.6 6.3c-.1.2-.1.5-.1.7v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2h-16a2 2 0 00-1.9 1.3zM21 8.3V7a.5.5 0 00-.5-.5h-16A.5.5 0 004 7v1.3h17zM4 9.8h17V17a.5.5 0 01-.5.5h-16A.5.5 0 014 17V9.8zm1.8 4.8a.8.8 0 01.8-.8H10a.8.8 0 010 1.5H6.5a.8.8 0 01-.8-.8z"
    />
  ),
});

export const CreditCardFilled = createIcon({
  displayName: "CreditCardFilledIcon",
  path: (
    <>
      <Path d="M2.1 6.3C2 6.5 2 6.7 2 7v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-1.9 1.3z" />
      <Path
        fill="white"
        d="M5.25 14.5a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM22 8.25v1.5H2v-1.5h20z"
      />
    </>
  ),
});

CreditCard.Filled = CreditCardFilled;
