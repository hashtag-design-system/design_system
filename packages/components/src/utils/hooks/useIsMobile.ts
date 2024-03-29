import { useEffect, useMemo, useState } from "react";
import { isMobile as isMobileByDetect } from "react-device-detect";
import UAParser from "ua-parser-js";
import { useWindowDimensions } from "../index";

export const useIsMobile = (overideValue?: boolean): { isMobile: boolean; parser: UAParser } => {
  const [isMobile, setIsMobile] = useState(isMobileByDetect);
  const windowDimensions = useWindowDimensions();
  // eslint-disable-next-line
  let parser: UAParser = useMemo(() => new UAParser(), [windowDimensions.width, windowDimensions.height]);

  useEffect(() => {
    if (overideValue === undefined) {
      setIsMobile(["mobile", "tablet", "wearable", "smarttv"].includes(parser.getDevice().type || "") || isMobileByDetect);
    } else setIsMobile(overideValue);
  }, [overideValue, parser, windowDimensions.width, windowDimensions.height]);

  return { isMobile, parser };
};

export default useIsMobile;
