import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";

// @ts-expect-error
export const CreditCardChip: IconSVG<{
  Filled: typeof CreditCardChipFilled;
}> = createIcon({
  displayName: "CreditCardChipIcon",
  d:
    "M6.972 4C4.536 4 2.5 6.037 2.5 8.472v7.98c0 2.434 2.037 4.471 4.472 4.471h11.057c2.434 0 4.471-2.037 4.471-4.471v-7.98C22.5 6.038 20.463 4 18.029 4H6.972zm0 1.538h11.057c1.566 0 2.933 1.367 2.933 2.934v.913h-4.616a.767.767 0 01-.77-.77c0-.427.343-.769.77-.769a.77.77 0 000-1.538 2.32 2.32 0 00-2.307 2.307c0 .994.649 1.842 1.538 2.164v3.822c-.922.626-1.538 1.677-1.538 2.86 0 .71.225 1.37.6 1.924h-4.277a3.414 3.414 0 00.6-1.924c0-1.182-.617-2.234-1.539-2.86v-3.823c.89-.321 1.538-1.169 1.538-2.163a2.32 2.32 0 00-2.307-2.307H7.115a.771.771 0 00-.072 0 .769.769 0 00-.071 0 .773.773 0 00.143 1.538h1.539c.427 0 .77.342.77.77 0 .426-.343.769-.77.769H4.038V8.47c0-1.566 1.367-2.933 2.934-2.933zm-2.934 5.385h3.847V14H4.038v-3.077zm13.077 0h3.847V14h-3.847v-3.077zM4.038 15.54H7.5c1.03 0 1.923.893 1.923 1.923S8.53 19.385 7.5 19.385h-.53c-1.565 0-2.932-1.367-2.932-2.934v-.912zm13.462 0h3.462v.913c0 1.566-1.367 2.933-2.933 2.933H17.5c-1.03 0-1.923-.894-1.923-1.924 0-1.03.893-1.922 1.923-1.922z",
});

export const CreditCardChipFilled = createIcon({
  displayName: "CreditCardChipFilledIcon",
  path: (
    <>
      <Path d="M6.5 3.8C4 3.8 2 5.8 2 8.1v7.7c0 2.3 2 4.3 4.5 4.3h11.1c2.4 0 4.5-2 4.5-4.3v-7.7c0-2.3-2-4.3-4.5-4.3H6.5z" />
      <Path
        fill="white"
        d="M15.8 9h4.6v1.5h-3.8v3h3.8v1.5H17c-1 0-1.9.9-1.9 1.8c0 1 .9 1.8 1.9 1.8h-2.9a3.2 3.2 0 01-.6-1.8c0-1.1.6-2.1 1.5-2.7v-3.7c-.9-.3-1.5-1.1-1.5-2.1c0-1.2 1-2.2 2.3-2.2c.2 0 .4.1.5.2a.7.7 0 01.2.5a.7.7 0 01-.2.5a.8.8 0 01-.5.2c-.4 0-.8.3-.8.7s.3.7.8.7zM10.5 16.8a3.2 3.2 0 01-.6 1.8H7c1 0 1.9-.9 1.9-1.8c0-1-.9-1.8-1.9-1.8H3.5V13.4h3.8v-3H3.5V9h4.6c.4 0 .8-.3.8-.7s-.3-.7-.8-.7H6.6a.8.8 0 01-.6-.2a.7.7 0 01-.1-1a.8.8 0 01.5-.3a.8.8 0 01.1 0a.8.8 0 01.1 0h1.5c1.3 0 2.3 1 2.3 2.2c0 1-.6 1.8-1.5 2.1v3.7c.9.6 1.5 1.6 1.5 2.7z"
      />
    </>
  ),
});

CreditCardChip.Filled = CreditCardChipFilled;