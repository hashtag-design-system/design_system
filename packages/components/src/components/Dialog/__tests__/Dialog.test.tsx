import { act, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import Dialog, { DialogFProps } from "../index";

const TestChildren: React.FC<Partial<DialogFProps> & { hasBtnGroup?: boolean }> = ({
  isShown = true,
  hasBtnGroup = false,
  onDismiss,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(isShown);

  return (
    <Dialog
      isShown={isOpen}
      onDismiss={() => {
        if (onDismiss) onDismiss();
        setIsOpen(false);
      }}
      {...props}
    >
      <Dialog.Btn.Close />
      <Dialog.Content>
        <Dialog.Title>
          Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content here.
          Dialog content here
        </Dialog.Title>
      </Dialog.Content>
      {hasBtnGroup && (
        <Dialog.Btn.Group>
          <Dialog.Btn variant="secondary">Cancel</Dialog.Btn>
          <Dialog.Btn>Confirm</Dialog.Btn>
        </Dialog.Btn.Group>
      )}
    </Dialog>
  );
};

describe("<Dialog />", () => {
  test("default behaviour", () => {
    render(<Dialog isShown={false}>Hey</Dialog>);

    expect(screen.queryByTestId("dialog")).toBeNull();

    const modalRoot = screen.getByTestId("modal-root");
    expect(modalRoot).toBeVisible();
    expect(modalRoot.children).toHaveLength(0);
  });
  test("with isShown={true}", async () => {
    render(<Dialog isShown>Hey</Dialog>);

    const dialog = screen.getByTestId("dialog");

    // Wait for animation to finish
    await waitFor(() => {
      expect(dialog).toBeVisible();
    });
    expect(dialog).toHaveAttribute("class");
    expect(dialog).toHaveTextContent("Hey");

    const modalRoot = screen.getByTestId("modal-root");
    expect(modalRoot.children).toHaveLength(1);
    expect(modalRoot).toContainElement(dialog);
  });
  describe("with sub-component children", () => {
    test("default behaviour", async () => {
      render(<TestChildren />);
      const dialog = screen.getByTestId("dialog");

      await waitFor(() => {
        expect(dialog).toBeVisible();
      });

      expect(dialog.children).toHaveLength(2);
      expect(dialog).toHaveTextContent(
        "Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content here"
      );
      expect(dialog).toContainElement(screen.getByTestId("dialog-btn-close"));
      expect(dialog).toContainElement(screen.getByTestId("dialog-content"));
    });
    test("with confirm={true}", async () => {
      render(<TestChildren confirm />);

      await waitFor(() => {
        expect(screen.getByTestId("dialog")).toBeVisible();
      });

      expect(screen.getByTestId("dialog-content")).toHaveClass("confirm");
    });
    test("with hasBtnGroup={true}", async () => {
      render(<TestChildren hasBtnGroup />);

      await waitFor(() => {
        expect(screen.getByTestId("dialog")).toBeVisible();
      });

      const content = screen.getByTestId("dialog-content");
      expect(content).not.toHaveClass("confirm");
      expect(content).toHaveAttribute("style");
      expect(content.style.padding).toBeDefined();
      expect(screen.getByTestId("dialog-btn-group").children).toHaveLength(2);
    });
  });
  describe("functionality", () => {
    test.each(["dialog-btn-close", "modal-root"])("onDismiss default functionality & click outside", testId => {
      const onDismiss = jest.fn();
      render(<TestChildren onDismiss={() => onDismiss()} />);

      act(() => {
        screen.getByTestId(testId).click();
      });

      expect(screen.queryByTestId("dialog")).toBeNull();
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
    test.each([0, 1])("click cancel / confirm button", i => {
      const onDismiss = jest.fn();
      render(<TestChildren hasBtnGroup onDismiss={() => onDismiss()} />);

      act(() => {
        screen.getAllByTestId("dialog-btn")[i].click();
      });

      expect(screen.queryByTestId("dialog")).toBeNull();
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });
});
