import { screen } from "@testing-library/react";
import Select from "../../index";
import { selectCustomRender } from "../utils";
import { ModalMobile } from "./ModalMobile";

describe("Select <ModalMobile />", () => {
  test("default behaviour", () => {
    selectCustomRender(<ModalMobile />);
    const modalMobile = screen.getByTestId("select-modal--mobile");

    expect(modalMobile).toBeVisible();
    expect(modalMobile.children).toHaveLength(0);
    expect(modalMobile).toHaveAttribute("class");
  });
  test("with children", () => {
    selectCustomRender(<Select.Modal />);

    expect(screen.getByTestId("select-modal")).toBeVisible();
    expect(screen.getByTestId("select-modal--mobile").children[0].tagName.toLowerCase()).toBe("div");
  });
  describe("with align", () => {
    test('align="left"', () => {
      selectCustomRender(<ModalMobile align="left" />);
      expect(screen.getByTestId("select-modal--mobile").className).toContain("flex-row-flex-start");
    });
    test('align="center"', () => {
      selectCustomRender(<ModalMobile align="center" />);
      expect(screen.getByTestId("select-modal--mobile").className).toContain("flex-row-center");
    });
    test('align="right"', () => {
      selectCustomRender(<ModalMobile align="right" />);
      expect(screen.getByTestId("select-modal--mobile").className).toContain("flex-row-flex-end");
    });
  });
});
