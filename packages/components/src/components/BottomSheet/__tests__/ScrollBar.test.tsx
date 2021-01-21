import { render, screen } from "@testing-library/react";
import BottomSheet from "../index";

describe("<BottomSheet.ScrollBar>", () => {
  test("default behaviour", () => {
    render(<BottomSheet.ScrollBar />);
    const scrollBar = screen.getByTestId("bottom-sheet-scroll-bar");
    const scrollBarContainer = screen.getByTestId("bottom-sheet-scroll-bar-container");

    expect(scrollBarContainer).toBeVisible();
    expect(scrollBarContainer).toHaveAttribute("class");
    expect(scrollBarContainer.children).toHaveLength(1);
    expect(scrollBarContainer).toContainElement(scrollBar);

    expect(scrollBar).toBeVisible();
    expect(scrollBar).toHaveAttribute("class");
    expect(scrollBar.children).toHaveLength(0);
  });
});
