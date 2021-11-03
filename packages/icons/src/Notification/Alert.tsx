import { createIcon } from "@chakra-ui/icons";
import { EllipseFilled, IconSVG, Path } from "../utils";

/*
 * <AlertCircle />
 */

// @ts-expect-error
export const AlertCircle: IconSVG<{
  Filled: typeof AlertCircleFilled;
}> = createIcon({
  displayName: "AlertCircleIcon",
  path: (
    <>
      <Path d="M11.8 7.3c0-.1.1-.3.3-.3h.8c.1 0 .3.1.3.3V13.4c0 .1-.1.3-.3.3h-.8a.3.3 0 01-.3-.3V7.3zM13.5 16a1 1 0 11-2 0a1 1 0 012 0z" />
      <Path
        fillRule="evenodd"
        d="M12.5 20.5a8.5 8.5 0 100-17a8.5 8.5 0 000 17zm0 1.5c5.5 0 10-4.5 10-10s-4.5-10-10-10s-10 4.5-10 10s4.5 10 10 10z"
      />
    </>
  ),
});

export const AlertCircleFilled = createIcon({
  displayName: "AlertCircleFilledIcon",
  path: (
    <>
      <EllipseFilled />
      <Path
        fill="white"
        d="M11.3 7.3c0-.1.1-.3.3-.3h.8c.1 0 .3.1.3.3V13.4c0 .1-.1.3-.3.3h-.8a.3.3 0 01-.3-.3V7.3zM13 16a1 1 0 11-2 0a1 1 0 012 0z"
      />
    </>
  ),
});

AlertCircle.Filled = AlertCircleFilled;

/*
 * <AlertTriangle />
 */

// @ts-expect-error
export const AlertTriangle: IconSVG<{
  Filled: typeof AlertTriangleFilled;
}> = createIcon({
  displayName: "AlertTriangleIcon",
  path: (
    <>
      <Path d="M11.8 8.3c0-.1.1-.3.3-.3h.8c.1 0 .3.1.3.3V14.4c0 .1-.1.3-.3.3h-.8a.3.3 0 01-.3-.3V8.3zM13.5 17a1 1 0 11-2 0a1 1 0 012 0z" />
      <Path
        fillRule="evenodd"
        d="M10.26 4.544c.995-1.725 3.485-1.725 4.48 0l7.16 12.401c.997 1.725-.248 3.881-2.24 3.881H5.34c-1.992 0-3.236-2.156-2.24-3.88l7.16-12.402zm3.182.75a1.087 1.087 0 00-1.884 0l-7.16 12.401c-.418.725.105 1.631.942 1.631h14.32c.837 0 1.36-.906.942-1.63l-7.16-12.402z"
      />
    </>
  ),
});

export const AlertTriangleFilled = createIcon({
  displayName: "AlertTriangleFilledIcon",
  path: (
    <>
      <Path d="M9.8 4.5c1-1.7 3.5-1.7 4.5 0l7.2 12.4c1 1.7-.2 3.9-2.2 3.9H4.8c-2 0-3.2-2.2-2.2-3.9L9.8 4.5z" />
      <Path fill="white" d="M11.3 8.3c0-.1.1-.3.3-.3h.8c.1 0 .3.1.3.3V14.4c0 .1-.1.3-.3.3h-.8a.3.3 0 01-.3-.3V8.3zM13 17a1 1 0 11-2 0a1 1 0 012 0z" />
    </>
  ),
});

AlertTriangle.Filled = AlertTriangleFilled;
