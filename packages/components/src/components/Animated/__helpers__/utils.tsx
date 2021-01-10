import { screen } from "@testing-library/react";

export const checkChildStyle = (element: string | HTMLElement, styleValue: { name: string; value: React.ReactText }) => {
  const { name, value } = styleValue;
  if (typeof element === "string") {
    // @ts-expect-error
    expect(screen.getByTestId(element).style["_values"][`--${name}`]).toBe(String(value));
  } else {
    // @ts-expect-error
    expect(element.style["_values"][`--${name}`]).toBe(String(value));
  }
};

export const checkStyleCustomProperties = (element: HTMLElement, arr: string[]) => {
  arr.map(item => `--${item}`).forEach((style, i) => {
    // @ts-expect-error
    expect(element.style[i.toString()]).toBe(style);
  });
}