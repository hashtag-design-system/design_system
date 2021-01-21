import { render, screen, waitFor } from "@testing-library/react";
import { Modal } from "../Modal";
import { overlayCheckStyle } from "../__helpers__";

describe("<Modal.Overlay />", () => {
  test("default behaviour", () => {
    render(<Modal.Overlay isShown={false}>Test</Modal.Overlay>);
    const modalRoot = screen.getByTestId("modal-root");

    expect(modalRoot).toBeInTheDocument();
    expect(modalRoot).toBeVisible();
    expect(modalRoot.children).toHaveLength(0);
  });
  test("with isShown={true}", async () => {
    render(
      <Modal.Overlay isShown>
        <div>Test</div>
      </Modal.Overlay>
    );
    const modalRoot = screen.getByTestId("modal-root");
    const modal = screen.getByTestId("modal");

    expect(modalRoot).toBeInTheDocument();
    expect(modalRoot).toBeVisible();
    // Only inside a HTMLElement it is considered a children
    expect(modalRoot.children).toHaveLength(1);

    await waitFor(() => {
      expect(modal).toBeVisible();
    });
    expect(modal).toHaveAttribute("style");
    expect(modal.style.backgroundColor).toBeDefined();
    expect(modal.children).toHaveLength(1);
    expect(modal).toHaveTextContent("Test");

    const firstChild = modalRoot.children[0];
    expect(firstChild).toHaveTextContent("Test");
    expect(firstChild.tagName.toLowerCase()).toBe("div");
  });
  test("with opacity={0.5}", async () => {
    render(
      <Modal.Overlay isShown opacity={0.5}>
        Test
      </Modal.Overlay>
    );

    await overlayCheckStyle("opacity(0.5)");
  });
  describe("with blur", () => {
    test("with blur={true}", async () => {
      render(
        <Modal.Overlay isShown blur>
          Test
        </Modal.Overlay>
      );

      await overlayCheckStyle("blur");
    });
    test('with blur="5px"', async () => {
      render(
        <Modal.Overlay isShown blur="5px">
          Test
        </Modal.Overlay>
      );

      await overlayCheckStyle("blur(5px)");
    });
  });
  describe("with grayscale", () => {
    test("with grayscale={true}", async () => {
      render(
        <Modal.Overlay isShown grayscale>
          Test
        </Modal.Overlay>
      );

      await overlayCheckStyle("grayscale");
    });
    test('with grayscale="50%"', async () => {
      render(
        <Modal.Overlay isShown grayscale="50%">
          Test
        </Modal.Overlay>
      );

      await overlayCheckStyle("grayscale(50%)");
    });
  });
  describe("with background", () => {
    test('with background={{ color: "light" }}', async () => {
      render(
        <Modal.Overlay isShown background={{ color: "light" }}>
          Test
        </Modal.Overlay>
      );

      await overlayCheckStyle("rgba(255, 255, 255, 0.85)");
    });
    test('with background={{ color: "dark" }}', async () => {
      render(
        <Modal.Overlay isShown background={{ color: "dark" }}>
          Test
        </Modal.Overlay>
      );

      await overlayCheckStyle("rgba(0, 0, 0, 0.5)");
    });
    test("with background={{ alpha: 0.7 }}", async () => {
      const alpha = 0.7;
      render(
        <Modal.Overlay isShown background={{ alpha }}>
          Test
        </Modal.Overlay>
      );

      await overlayCheckStyle(`rgba(0, 0, 0, ${alpha})`);
    });
  });
});
