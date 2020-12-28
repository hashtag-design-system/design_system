// https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/

export const isInViewport = <T extends HTMLElement>(elem: T): boolean => {
  const rect = elem.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= document.documentElement.offsetWidth &&
    rect.right <= document.documentElement.offsetWidth
  );
};
