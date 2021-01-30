import { render, screen, waitFor } from "@testing-library/react";
import TimePicker from "../index";

describe("<TimePicker />", () => {
  test("default behaviour", async () => {
    render(<TimePicker />);
    const bottomSheet = screen.queryByTestId("bottom-sheet");

    expect(bottomSheet).toBeNull();
  });
  describe("with mobileView={true}", () => {
    test("with not bottomSheetProps", async () => {
      render(<TimePicker mobileView />);
      const bottomSheet = screen.queryByTestId("bottom-sheet");

      expect(bottomSheet).toBeNull();
    });
    test("with bottomSheetProps={{ isShown: true }}", async () => {
      render(<TimePicker mobileView bottomSheetProps={{ isShown: true }} />);
      const bottomSheet = screen.getByTestId("bottom-sheet");

      await waitFor(() => {
        expect(bottomSheet).toBeVisible();
      });
      expect(bottomSheet.children).toHaveLength(1);
      expect(bottomSheet).toContainElement(screen.getByTestId("dialog-content"));
    });
  });
});
