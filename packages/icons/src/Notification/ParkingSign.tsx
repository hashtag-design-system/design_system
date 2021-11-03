import { createIcon } from "@chakra-ui/icons";
import { IconSVG, EllipseFilled, Path } from "../utils";

// @ts-expect-error
export const ParkingSign: IconSVG<{
  Filled: typeof ParkingSignFilled;
}> = createIcon({
  displayName: "ParkingSignIcon",
  path: (
    <>
      <Path d="M11.2 13.3V17h-1.7V7h3.8c1.1 0 2 .3 2.6.9c.7.6 1 1.3 1 2.3c0 1-.3 1.7-1 2.3c-.6.5-1.5.8-2.7.8H11.2zm0-1.4h2.1c.6 0 1.1-.1 1.4-.4c.3-.3.5-.7.5-1.3c0-.5-.2-1-.5-1.3c-.3-.3-.8-.5-1.4-.5h-2.1v3.5z" />
      <Path
        fillRule="evenodd"
        d="M12.5 20.5a8.5 8.5 0 100-17a8.5 8.5 0 000 17zm0 1.5c5.5 0 10-4.5 10-10s-4.5-10-10-10s-10 4.5-10 10s4.5 10 10 10z"
      />
    </>
  ),
});

export const ParkingSignFilled = createIcon({
  displayName: "ParkingSignFilledIcon",
  path: (
    <>
      <EllipseFilled />
      <Path
        fill="white"
        d="M10.7 13.3V17h-1.7V7h3.8c1.1 0 2 .3 2.6.9c.7.6 1 1.3 1 2.3c0 1-.3 1.7-1 2.3c-.6.5-1.5.8-2.7.8H10.7zm0-1.4h2.1c.6 0 1.1-.1 1.4-.4c.3-.3.5-.7.5-1.3c0-.5-.2-1-.5-1.3c-.3-.3-.8-.5-1.4-.5h-2.1v3.5z"
      />
    </>
  ),
});

ParkingSign.Filled = ParkingSignFilled;
