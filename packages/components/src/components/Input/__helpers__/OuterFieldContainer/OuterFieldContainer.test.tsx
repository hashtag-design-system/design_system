import { screen } from "@testing-library/react";
import { inputCustomRender } from "../utils";
import { OuterFieldContainer } from "./OuterFieldContainer";

describe("Input <OuterFieldContainer />", () => {
  test("default behaviour", () => {
    inputCustomRender(<OuterFieldContainer />);
    const element = screen.getByTestId("outer-field-container");

    expect(element.getAttribute("data-isfloated")).toBe("false");
  });
  test("with defaultValue, and floatingplaceholder={true}", () => {
    inputCustomRender(<OuterFieldContainer />, { providerProps: { defaultValue: "test" } });
    const element = screen.getByTestId("outer-field-container");

    expect(element.getAttribute("data-isfloated")).toBeTruthy();
  });
  test("with defaultValue, and floatingplaceholder={false}", () => {
    inputCustomRender(<OuterFieldContainer />, { providerProps: { floatingplaceholder: false, defaultValue: "test" } });
    const element = screen.getByTestId("outer-field-container");

    expect(element.getAttribute("data-isfloated")).toBe("false");
  });
  test("with defaultValue, with length > maxLenght", () => {
    // https://stackoverflow.com/questions/41223963/jest-how-to-mock-console-when-it-is-used-by-a-third-party-library
    global.console = { ...global.console, error: jest.fn() };
    inputCustomRender(<OuterFieldContainer />, { providerProps: { defaultValue: "test", maxLength: 3 } });
    expect(console.error).toBeCalled();
  });
  // test("with neither placeholder nor label", () => {
  //   global.console = { ...global.console, error: jest.fn() };
  //   inputCustomRender(<OuterFieldContainer />, { providerProps: { placeholder: "", label: "" } });
  //   expect(console.error).toBeCalled();
  // });
});
