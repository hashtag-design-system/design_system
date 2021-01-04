import { render, screen, waitFor } from "@testing-library/react";
import { Modal } from "../Modal";

const checkStyle = async (toContain: string): Promise<void> => {
  const modal = screen.getByTestId("modal");

  // Wait due to animation from `opacity: 0` to `opacity: 1`
  await waitFor(() => {
    expect(modal).toBeVisible();
  });

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

    await checkStyle("opacity(0.5)");
  });
  describe("with blur", () => {
    test("with blur={true}", async () => {
      render(
        <Modal.Overlay isShown blur>
          Test
        </Modal.Overlay>
      );

      await checkStyle("blur");
    });
    test('with blur="5px"', async () => {
      render(
        <Modal.Overlay isShown blur="5px">
          Test
        </Modal.Overlay>
      );

      await checkStyle("blur(5px)");
    });
  });
  describe("with grayscale", () => {
    test("with grayscale={true}", async () => {
      render(
        <Modal.Overlay isShown grayscale>
          Test
        </Modal.Overlay>
      );

      await checkStyle("grayscale");
    });
    test('with grayscale="50%"', async () => {
      render(
        <Modal.Overlay isShown grayscale="50%">
          Test
        </Modal.Overlay>
      );

      await checkStyle("grayscale(50%)");
    });
  });
  describe("with bgColor", () => {
    test('with bgColor="light"', async () => {
      render(
        <Modal.Overlay isShown bgColor="light">
          Test
        </Modal.Overlay>
      );

      await checkStyle("rgba(255, 255, 255, 0.85)");
    });
    test('with bgColor="dark"', async () => {
      render(
        <Modal.Overlay isShown bgColor="dark">
          Test
        </Modal.Overlay>
      );

      await checkStyle("rgba(0, 0, 0, 0.5)");
    });
  });
});
