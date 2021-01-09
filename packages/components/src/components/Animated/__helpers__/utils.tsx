import { screen } from "@testing-library/react";

export const checkChildStyle = (testId: string, styleValue: { name: string; value: React.ReactText }) => {
  const { name, value } = styleValue;
  // @ts-expect-error
  expect(screen.getByTestId(testId).style["_values"][`--${name}`]).toBe(String(value));
};
