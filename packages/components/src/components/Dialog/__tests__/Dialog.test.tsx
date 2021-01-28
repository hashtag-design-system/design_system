import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { overlayCheckStyle } from "../../__helpers__";
import Dialog, { DialogBtnCloseFProps, DialogFProps } from "../index";

const TEST_CHILDREN_HEIGHT = 300;
const TEST_WIDTH = 270;

const TestChildren: React.FC<
  Omit<Partial<DialogFProps>, "onClick"> & Pick<DialogBtnCloseFProps, "onClick"> & { hasBtnGroup?: boolean }
> = ({ isShown = true, hasBtnGroup = false, loading, allowDismissOnLoading = true, onDismiss, onClick, ...props }) => {
  const [isOpen, setIsOpen] = useState(isShown);
  const [isLoading, setIsLoading] = useState(loading || false);

  return (
    <Dialog
      isShown={isOpen}
      loading={isLoading}
      allowDismissOnLoading={allowDismissOnLoading}
      onDismiss={(e, { cancel }) => {
        if (loading !== undefined) {
          if (!cancel) {
            setIsLoading(true);
            setTimeout(() => {
              setIsOpen(false);
              setIsLoading(false);
            }, 2000);
          } else {
            if (allowDismissOnLoading) {
              setIsOpen(false);
            }
          }
        } else {
          if (onDismiss) onDismiss(e, { cancel });
          setIsOpen(false);
        }
      }}
      {...props}
    >
      <div style={{ height: TEST_CHILDREN_HEIGHT, width: TEST_WIDTH }}>
        <Dialog.Btn.Close onClick={onClick} />
        <Dialog.Content>
          <Dialog.Title>
            Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content
            here. Dialog content here
          </Dialog.Title>
        </Dialog.Content>
        {hasBtnGroup && (
          <Dialog.Btn.Group>
            <Dialog.Btn>Cancel</Dialog.Btn>
            <Dialog.Btn confirm>Confirm</Dialog.Btn>
          </Dialog.Btn.Group>
        )}
      </div>
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
    expect(dialog).not.toHaveStyle("transform: translateY(-50%)");

    const modalRoot = screen.getByTestId("modal-root");
    expect(modalRoot.children).toHaveLength(1);
    expect(modalRoot).toContainElement(dialog);
  });
  test("with overlayProps", async () => {
    render(
      <Dialog isShown overlayProps={{ background: { color: "light" } }}>
        Hey
      </Dialog>
    );

    // Wait for animation to finish
    await waitFor(() => {
      expect(screen.getByTestId("dialog")).toBeVisible();
    });

    await overlayCheckStyle("rgba(255, 255, 255, 0.75)");
  });
  test("with onChildrenHeight and onWidth", async () => {
    const onChildrenHeight = jest.fn(height => height);
    const onWidth = jest.fn(width => width);
    render(<TestChildren onChildrenHeight={height => onChildrenHeight(height)} onWidth={width => onWidth(width)} />);
    const dialog = screen.getByTestId("dialog");

    await waitFor(() => {
      expect(dialog).toBeVisible();
    });

    expect(onChildrenHeight).toHaveBeenCalled();
    expect(onWidth).toHaveBeenCalled();
    expect(dialog.children[0]).toHaveStyle(`height: ${TEST_CHILDREN_HEIGHT}px; width: ${TEST_WIDTH}px`)
  });
  describe("with sub-component children", () => {
    test("default behaviour", async () => {
      render(<TestChildren />);
      const dialog = screen.getByTestId("dialog");

      await waitFor(() => {
        expect(dialog).toBeVisible();
      });

      expect(dialog.children).toHaveLength(1);
      expect(dialog.children[0].children).toHaveLength(2);
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
      expect(screen.getByTestId("dialog-btn-group").children).toHaveLength(2);
    });
  });
  describe("basic functionality", () => {
    test.each(["dialog-btn-close", "modal-root"])("onDismiss default functionality & click outside", testId => {
      const onClick = jest.fn();
      const onDismiss = jest.fn((_, { cancel }) => cancel);
      render(<TestChildren onDismiss={(_, { cancel }) => onDismiss(_, { cancel })} onClick={onClick} />);

      act(() => {
        screen.getByTestId(testId).click();
      });

      expect(screen.queryByTestId("dialog")).toBeNull();
      if (testId === "dialog-btn-close") {
        expect(onClick).toHaveBeenCalledTimes(1);
      }
      expect(onDismiss).toHaveBeenCalledTimes(1);
      expect(onDismiss).toHaveReturnedWith(true);
    });
    test.each([0, 1])("click cancel / confirm button", i => {
      const onDismiss = jest.fn((_, { cancel }) => cancel);
      render(<TestChildren hasBtnGroup onDismiss={(_, { cancel }) => onDismiss(_, { cancel })} />);

      act(() => {
        screen.getAllByTestId("dialog-btn")[i].click();
      });

      expect(screen.queryByTestId("dialog")).toBeNull();
      expect(onDismiss).toHaveBeenCalledTimes(1);
      const results = onDismiss.mock.results;
      expect(results).toHaveLength(1);
      if (i === 0) {
        expect(results[0].value).toBeTruthy();
      } else {
        expect(results[0].value).toBeFalsy();
      }
    });
    test("escape (esc) key down", () => {
      const onDismiss = jest.fn((_, { cancel }) => cancel);
      render(<TestChildren hasBtnGroup onDismiss={(_, { cancel }) => onDismiss(_, { cancel })} />);

      act(() => {
        fireEvent.keyDown(screen.getByTestId("dialog"), {
          key: "Escape",
          code: "Escape",
          keyCode: 27,
          charCode: 27,
        });
      });

      expect(screen.queryByTestId("dialog")).toBeNull();
      expect(onDismiss).toHaveBeenCalledTimes(1);
      expect(onDismiss).toHaveReturnedWith(true);
    });
  });
  describe("with loading", () => {
    describe("with loading={true}", () => {
      beforeEach(() => {
        render(<TestChildren loading hasBtnGroup />);
      });
      test("basic functionality", async () => {
        const btnGroup = screen.getByTestId("dialog-btn-group");
        const children = btnGroup.children;
        expect(children).toHaveLength(2);
        // Confirm btn
        expect(children[1]).toHaveClass("dismiss-onloading");
        expect(children[0]).not.toHaveClass("dismiss-onloading");
        expect(screen.getByTestId("dialog-btn-close")).not.toHaveClass("dismiss-onloading");

        act(() => {
          userEvent.click(children[1]);
        });

        expect(screen.queryByTestId("dialog")).not.toBeNull();

        await waitFor(
          () => {
            expect(screen.queryByTestId("dialog")).toBeNull();
          },
          { timeout: 2000 }
        );
      });
      test.each(["cancel btn", "close btn", "modal-root"])("and dismiss", btn => {
        const btnGroup = screen.getByTestId("dialog-btn-group");
        const children = btnGroup.children;
        expect(children).toHaveLength(2);
        expect(children[0]).toHaveClass("loading");
        expect(children[1]).toHaveClass("dismiss-onloading");

        act(() => {
          userEvent.click(children[1]);
        });

        expect(screen.queryByTestId("dialog")).not.toBeNull();

        if (btn === "cancel btn") {
          act(() => {
            userEvent.click(children[0]);
          });
        } else if (btn === "modal-root") {
          act(() => {
            userEvent.click(screen.getByTestId(btn));
          });
        } else {
          act(() => {
            userEvent.click(screen.getByTestId("dialog-btn-close"));
          });
        }

        expect(screen.queryByTestId("dialog")).toBeNull();
      });
    });
    describe("with loading={true} & allowDismissOnLoading={false}", () => {
      beforeEach(() => {
        render(<TestChildren loading allowDismissOnLoading={false} hasBtnGroup />);
      });
      test("basic functionality", async () => {
        const btnGroup = screen.getByTestId("dialog-btn-group");
        const children = btnGroup.children;
        expect(children).toHaveLength(2);
        // Confirm btn
        expect(children[1]).toHaveClass("dismiss-onloading");
        expect(children[0]).toHaveClass("dismiss-onloading");
        expect(screen.getByTestId("dialog-btn-close")).toHaveClass("dismiss-onloading");

        act(() => {
          userEvent.click(children[1]);
        });

        expect(screen.queryByTestId("dialog")).not.toBeNull();

        await waitFor(
          () => {
            expect(screen.queryByTestId("dialog")).not.toBeNull();
          },
          { timeout: 2000 }
        );
      });
      test.each(["cancel btn", "close btn", "modal-root"])("and dismiss", btn => {
        const btnGroup = screen.getByTestId("dialog-btn-group");
        const children = btnGroup.children;
        expect(children).toHaveLength(2);
        expect(children[0]).toHaveClass("loading");
        expect(children[1]).toHaveClass("dismiss-onloading");

        act(() => {
          userEvent.click(children[1]);
        });

        expect(screen.queryByTestId("dialog")).not.toBeNull();

        if (btn === "cancel btn") {
          act(() => {
            userEvent.click(children[0]);
          });
        } else if (btn === "modal-root") {
          act(() => {
            userEvent.click(screen.getByTestId(btn));
          });
        } else {
          act(() => {
            userEvent.click(screen.getByTestId("dialog-btn-close"));
          });
        }

        expect(screen.queryByTestId("dialog")).not.toBeNull();
      });
    });
  });
});
