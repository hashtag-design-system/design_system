import { render, screen } from "@testing-library/react";
import { Modal } from "../Modal";

const checkStyle = (toContain: string): void => {
  const modal = screen.getByTestId("modal");

  expect(modal).toBeVisible();
  expect(modal).toHaveAttribute("style");
  if (toContain.includes("rgba")) {
    expect(modal.style.backgroundColor).toContain(toContain);
  } else {
    // @ts-expect-error
    expect(modal.style["backdropFilter"]).toContain(toContain);
  }
};

describe("<Modal.Overlay />", () => {
  test("default behaviour", () => {
    render(<Modal.Overlay isShown={false}>Test</Modal.Overlay>);
    const modalRoot = screen.getByTestId("modal-root");

    expect(modalRoot).toBeInTheDocument();
    expect(modalRoot).toBeVisible();
    expect(modalRoot.children).toHaveLength(0);
  });
  test("with isShown={true}", () => {
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

    expect(modal).toBeVisible();
    expect(modal).toHaveAttribute("style");
    expect(modal.style.backgroundColor).toBeDefined();
    expect(modal.children).toHaveLength(1);
    expect(modal).toHaveTextContent("Test");

    const firstChild = modalRoot.children[0];
    expect(firstChild).toHaveTextContent("Test");
    expect(firstChild.tagName.toLowerCase()).toBe("div");
  });
  test("with opacity={0.5}", () => {
    render(
      <Modal.Overlay isShown opacity={0.5}>
        Test
      </Modal.Overlay>
    );

    checkStyle("opacity(0.5)");
  });
  describe("with blur", () => {
    test("with blur={true}", () => {
      render(
        <Modal.Overlay isShown blur>
          Test
        </Modal.Overlay>
      );

      checkStyle("blur");
    });
    test('with blur="5px"', () => {
      render(
        <Modal.Overlay isShown blur="5px">
          Test
        </Modal.Overlay>
      );

      checkStyle("blur(5px)");
    });
  });
  describe("with grayscale", () => {
    test("with grayscale={true}", () => {
      render(
        <Modal.Overlay isShown grayscale>
          Test
        </Modal.Overlay>
      );

      checkStyle("grayscale");
    });
    test('with grayscale="50%"', () => {
      render(
        <Modal.Overlay isShown grayscale="50%">
          Test
        </Modal.Overlay>
      );

      checkStyle("grayscale(50%)");
    });
  });
  describe("with bgColor", () => {
    test('with bgColor="light"', () => {
      render(
        <Modal.Overlay isShown bgColor="light">
          Test
        </Modal.Overlay>
      );

      checkStyle("rgba(255, 255, 255, 0.85)");
    });
    test('with bgColor="dark"', () => {
      render(
        <Modal.Overlay isShown bgColor="dark">
          Test
        </Modal.Overlay>
      );

      checkStyle("rgba(0, 0, 0, 0.5)");
    });
  });
});
