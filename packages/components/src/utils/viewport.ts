// https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/

export const isInViewport = <T extends HTMLElement>(elem: T): boolean => {
  const rect = elem.getBoundingClientRect();
  return (
    rect.top > 0 &&
    rect.left > 0 &&
    rect.bottom < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right < (window.innerWidth || document.documentElement.clientWidth)
  );
};
