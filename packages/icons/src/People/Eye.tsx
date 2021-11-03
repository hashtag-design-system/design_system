import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path, PathProps } from "../utils";

const Cornea: React.FC<PathProps> = (props) => (
  <Path
    d="M14.9 12c0 1.6-1.3 2.9-2.9 2.9c-1.6 0-2.9-1.3-2.9-2.9S10.4 9.1 12 9.1c1.6 0 2.9 1.3 2.9 2.9z"
    {...props}
  />
);

const EyeOutline: React.FC = () => (
  <Path d="M12 5C9.1 5 6.8 6.3 5.2 7.7a15.1 15.1 0 00-3 3.7c-.2.4-.2.9 0 1.3c.4.7 1.4 2.3 3 3.7C6.8 17.7 9.1 19 12 19c2.9 0 5.2-1.3 6.8-2.7a15.1 15.1 0 003-3.7c.2-.4.2-.9 0-1.3a15.1 15.1 0 00-3-3.7C17.2 6.3 14.9 5 12 5z" />
);

const CrossEye: React.FC = () => (
  <Path d="M2.384 5.572a.75.75 0 011.044-.188l18 12.5a.75.75 0 11-.856 1.232l-18-12.5a.75.75 0 01-.188-1.044z" />
);

/*
 * <Eye />
 */

// @ts-expect-error
export const Eye: IconSVG<{ Filled: typeof EyeFilled }> = createIcon({
  displayName: "EyeIcon",
  path: (
    <>
      <Cornea />
      <Path
        fillRule="evenodd"
        d="M12 5C9.1 5 6.8 6.3 5.2 7.7a15.1 15.1 0 00-3 3.7c-.2.4-.2.9 0 1.3c.4.7 1.4 2.3 3 3.7C6.8 17.7 9.1 19 12 19c2.9 0 5.2-1.3 6.8-2.7a15.1 15.1 0 003-3.7c.2-.4.2-.9 0-1.3a15.1 15.1 0 00-3-3.7C17.2 6.3 14.9 5 12 5zm-8.7 7a13.8 13.8 0 012.8-3.4C7.5 7.3 9.5 6.2 12 6.2c2.5 0 4.5 1.1 5.9 2.4a13.8 13.8 0 012.8 3.4a.1.1 0 010 0a.1.1 0 010 0a13.8 13.8 0 01-2.8 3.4c-1.5 1.3-3.5 2.4-5.9 2.4c-2.5 0-4.5-1.1-5.9-2.4a13.8 13.8 0 01-2.8-3.4a.1.1 0 010 0a.1.1 0 010 0z"
      />
    </>
  ),
});

export const EyeFilled = createIcon({
  displayName: "EyeFilledIcon",
  path: (
    <>
      <EyeOutline />
      <Cornea fill="white" />
    </>
  ),
});

Eye.Filled = EyeFilled;

/*
 * <EyeClosed />
 */

// @ts-expect-error
export const EyeClosed: IconSVG<{
  Filled: typeof EyeClosedFilled;
}> = createIcon({
  displayName: "EyeClosedIcon",
  path: (
    <>
      <CrossEye />
      <Cornea />
      <Path d="M3.276 11.954a13.815 13.815 0 012.783-3.36l-.836-.925a15.052 15.052 0 00-3.043 3.673c-.24.411-.24.905 0 1.316.408.7 1.422 2.27 3.043 3.673C6.846 17.737 9.113 19 12 19c2.888 0 5.154-1.264 6.777-2.669l.162-.142-.998-.783c-1.474 1.275-3.454 2.359-5.941 2.359-2.487 0-4.467-1.084-5.941-2.36a13.814 13.814 0 01-2.783-3.36.09.09 0 01-.014-.045.09.09 0 01.014-.046zM12 6.235c2.487 0 4.467 1.083 5.941 2.36a13.812 13.812 0 012.783 3.36.09.09 0 01.014.045.09.09 0 01-.014.046 13.963 13.963 0 01-2.103 2.725l1.034.729a15.196 15.196 0 002.165-2.842c.24-.411.24-.905 0-1.316a15.052 15.052 0 00-3.043-3.673C17.154 6.263 14.887 5 12 5c-2.08 0-3.836.655-5.263 1.546l1.138.771C9.046 6.672 10.421 6.235 12 6.235z" />
    </>
  ),
});

export const EyeClosedFilled = createIcon({
  displayName: "EyeClosedFilledIcon",
  path: (
    <>
      <EyeOutline />
      <Cornea fill="white" />
      <CrossEye />
    </>
  ),
});

EyeClosed.Filled = EyeClosedFilled;
