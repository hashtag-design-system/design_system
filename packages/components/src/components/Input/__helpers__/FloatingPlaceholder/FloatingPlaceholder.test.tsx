import { screen } from "@testing-library/react";
import { OpenEye } from "../../__icons__/OpenEye";
import { inputCustomRender } from "../utils";
import { FloatingPlaceholder } from "./FloatingPlaceholder";

const testPlaceholder = "Test placeholder";

describe("Input <FloatingPlaceholder />", () => {
  test("default behaviour", () => {
    inputCustomRender(<FloatingPlaceholder />, { providerProps: { placeholder: testPlaceholder } });
    const element = screen.getByTestId("floating-placeholder");

    expect(element).toHaveAttribute("for");
    expect(element.getAttribute("for")).toHaveLength(5);
    expect(element).toHaveTextContent(testPlaceholder);
    expect(element.style.left).toBe("");
  });
  test("with prefix<string>", () => {
    inputCustomRender(<FloatingPlaceholder />, { providerProps: { placeholder: testPlaceholder, prefix: "$" } });
    const element = screen.getByTestId("floating-placeholder");

    expect(element.style.left).toBe("");
  });
  test("with prefix<React.ReactNode>", () => {
    inputCustomRender(<FloatingPlaceholder />, { providerProps: { placeholder: testPlaceholder, prefix: <OpenEye /> } });
    const element = screen.getByTestId("floating-placeholder");
    const left = element.style.left;

    expect(left).toBeDefined();
    expect(left).toContain("rem");
  });
});
