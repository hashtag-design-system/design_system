// https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
import { getWindowDimensions } from "./index";

export const isInViewport = <T extends HTMLElement>(elem: T): boolean => {
  const rect = elem.getBoundingClientRect();
  const { width, height } = getWindowDimensions();
  return rect.top > 0 && rect.left > 0 && rect.bottom < height && rect.right < width;
};
