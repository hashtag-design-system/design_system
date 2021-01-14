import { screen, waitFor } from "@testing-library/react";
import Select from "../../index";
import { selectCustomRender } from "../utils";
import { ModalMobile } from "./ModalMobile";

describe("Select <ModalMobile />", () => {
  test("default behaviour", () => {
    selectCustomRender(<ModalMobile />);
    const modalMobile = screen.getByTestId("select-modal--desktop");

    expect(modalMobile).toBeVisible();
    expect(modalMobile.children).toHaveLength(0);
    expect(modalMobile).toHaveAttribute("class");
  });
  test("with children", async () => {
    selectCustomRender(<Select.Modal open />);
    const modalDekstop = screen.getByTestId("select-modal--desktop");

    await waitFor(() => {
      expect(modalDekstop).toBeVisible();
    });
    expect(modalDekstop.children[0].tagName.toLowerCase()).toBe("div");
    await waitFor(() => {
      expect(screen.getByTestId("select-modal")).toBeVisible();
    });
  });
  test("with isShown={true}", async () => {
    selectCustomRender(<ModalMobile isShown />, { providerProps: { isMobile: true } });
    const modal = screen.getByTestId("select-modal--mobile");

    await waitFor(() => {
      expect(modal).toBeVisible();
    });
    expect(modal.children).toHaveLength(0);
  });
  describe("with align", () => {
    test('align="left"', () => {
      selectCustomRender(<ModalMobile align="left" />);
      expect(screen.getByTestId("select-modal--desktop").className).toContain("flex-row-flex-start");
    });
    test('align="center"', () => {
      selectCustomRender(<ModalMobile align="center" />);
      expect(screen.getByTestId("select-modal--desktop").className).toContain("flex-row-center");
    });
    test('align="right"', () => {
      selectCustomRender(<ModalMobile align="right" />);
      expect(screen.getByTestId("select-modal--desktop").className).toContain("flex-row-flex-end");
    });
  });
});
