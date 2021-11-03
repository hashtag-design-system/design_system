import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "./utils";

/*
 * <Pencil />
 */

// @ts-expect-error
export const Pencil: IconSVG<{ Filled: typeof PencilFilled }> = createIcon({
  displayName: "PencilIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M13.79 6.645L5.553 14.89l-1.585 4.717a.8.8 0 00.956 1.03l4.43-1.129 8.542-8.667 2.288-2.45a2 2 0 00-.042-2.775l-1.206-1.213a2 2 0 00-2.812-.025L13.79 6.645zm1.587.55l1.792-1.741a.5.5 0 01.703.006l1.206 1.213a.5.5 0 01.01.694l-1.73 1.852-1.98-2.024zM14.31 8.248L6.863 15.7l-1.064 3.165 2.78-.708 7.74-7.855-2.01-2.055z"
    />
  ),
});

export const PencilFilled = createIcon({
  displayName: "PencilFilledIcon",
  path: (
    <>
      <Path d="M13.29 6.645L5.053 14.89l-1.585 4.717a.8.8 0 00.956 1.03l4.43-1.129 8.542-8.667 2.288-2.45a2 2 0 00-.042-2.775l-1.206-1.213a2 2 0 00-2.812-.025L13.29 6.645z" />
      <Path
        fill="white"
        d="M13.81 6.141l-1.054 1.054 4.102 4.146 1.061-1.06-4.11-4.14z"
      />
    </>
  ),
});

Pencil.Filled = PencilFilled;

/*
 * <Edit />
 */

export const Edit = createIcon({
  displayName: "EditIcon",
  path: (
    <>
      <Path
        fillRule="evenodd"
        d="M16.6 4.2 9.3 11.6l-1.4 4a.8.8 0 001 1l3.8-1 7.6-7.7 1.9-2a2 2 0 000-2.8l-.8-.8a2 2 0 00-2.8 0L16.6 4.2zm1.6.6 1.4-1.3a.5.5 0 01.7 0l.8.8a.5.5 0 010 .7l-1.3 1.4-1.5-1.6zm-1.1 1.1-6.5 6.5-.8 2.5 2.1-.5 6.8-6.9-1.6-1.6z"
      />
      <Path d="M1.8 6A4.8 4.8 0 016.5 1.3h6a.8.8 0 010 1.5h-6A3.3 3.3 0 003.3 6v12a3.3 3.3 0 003.3 3.3h12A3.3 3.3 0 0021.8 18v-6a.8.8 0 011.5 0v6a4.8 4.8 0 01-4.8 4.8h-12A4.8 4.8 0 011.8 18V6z" />
    </>
  ),
});
