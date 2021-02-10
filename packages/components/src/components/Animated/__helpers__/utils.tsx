import { screen } from "@testing-library/react";

export const checkChildStyle = (element: string | HTMLElement, styleValue: { name: string; value: React.ReactText }) => {
  const { name, value } = styleValue;
  if (typeof element === "string") {
    expect(screen.getByTestId(element).style["_values"][`--${name}`]).toBe(String(value));
  } else {
    expect(element.style["_values"][`--${name}`]).toBe(String(value));
  }
};

export const checkStyleCustomProperties = (element: HTMLElement, arr: string[]) => {
  arr
    .map(item => `--${item}`)
    .forEach((style, i) => {
      expect(element.style[i.toString()]).toBe(style);
    });
};
