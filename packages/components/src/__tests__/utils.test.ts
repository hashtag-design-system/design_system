import { calculatePercentage, calculateValue, round, snakeCase } from "..";
import { kebabCase } from "../utils";

describe("calculate.ts", () => {
  test("calculateValue", () => {
    const value = calculateValue(20, 200);

    expect(value).toBe(40);
  });
  test("calculatePercentage", () => {
    const percentage = calculatePercentage(5, 0, 50);

    expect(percentage).toBe(10);
  });
  test("calculatePercentage, with returnRounded=false", () => {
    const percentage = calculatePercentage(5, 0, 50.5, { returnRounded: false });

    expect(percentage).toBeCloseTo(10, 0);
  });
});
describe("round.ts", () => {
  test("round decimal number to 2 number digits precision", () => {
    expect(round(55.89855)).toBe(55.9);
    expect(round(55.425)).toBe(55.43);
    expect(round(55.405)).toBe(55.41);
    expect(round(55.402)).toBe(55.4);
  });
});
describe("caseStyles.ts", () => {
  describe("snakeCase", () => {
    test("default functionality", () => {
      const res = snakeCase("itemName");

      expect(res).toBe("item_name");
    });
    test("input string that is not camelCase", () => {
      const res = snakeCase("item");

      expect(res).toBe("item");
    });
    test("input string with camelCase and snakeCase", () => {
      const res = snakeCase("itemName_hey");

      expect(res).toBe("item_name_hey");
    });
  });
  describe("kebabCase", () => {
    test("default functionality", () => {
      const res = kebabCase("itemName");

      expect(res).toBe("item-name");
    });
    test("input string that is not camelCase", () => {
      const res = kebabCase("item");

      expect(res).toBe("item");
    });
    test("input string with camelCase and kebabCase", () => {
      const res = kebabCase("itemName_hey");

      expect(res).toBe("item-name_hey");
    });
  });
});
