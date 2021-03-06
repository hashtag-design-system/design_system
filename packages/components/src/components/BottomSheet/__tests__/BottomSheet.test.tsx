import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DraggableProps } from "framer-motion";
import { useState } from "react";
import { CONFIG } from "../../../config";
import Button from "../../Button";
import Dialog from "../../Dialog";
import Input from "../../Input";
import BottomSheet, { BottomSheetChangeInfo, BottomSheetFProps, BottomSheetPosition } from "../index";

const portalIdSelector = CONFIG.DEFAULT_PORTAL_ID_SELECTOR;

const TestChildren: React.FC<Partial<BottomSheetFProps>> = ({ isShown: propsIsShown, ...props }) => {
  const [isShown, setIsShown] = useState(true);

  return (
    <BottomSheet isShown={isShown} onDismiss={() => setIsShown(false)} {...props}>
      {({ dismiss }) => (
        <Dialog.Content>
          <Button onClick={async () => await dismiss()}>Button</Button>
        </Dialog.Content>
      )}
    </BottomSheet>
  );
};

const checkNotShown = async () => {
  await waitFor(() => {
    const bottomSheet = screen.queryByTestId("bottom-sheet");
    const modalRoot = screen.getByTestId(portalIdSelector);

    expect(bottomSheet).toBeNull();
    expect(modalRoot.children).toHaveLength(0);
    expect(modalRoot).not.toContainElement(bottomSheet);
  }, { timeout: 2000 });
};

const checkY = async (y: number) => {
  const bottomSheet = screen.getByTestId("bottom-sheet");
  await waitFor(() => {
    expect(bottomSheet).toBeVisible();
  });

  await waitFor(
    () => {
      expect(bottomSheet.style.transform).toContain(y + "px");
    },
    { timeout: 2500 }
  );
};

describe("<BottomSheet />", () => {
  test("default behaviour", async () => {
    render(<BottomSheet isShown />);
    const bottomSheet = screen.getByTestId("bottom-sheet");

    await waitFor(() => {
      expect(bottomSheet).toBeVisible();
    });

    expect(bottomSheet).toHaveAttribute("style");
    expect(bottomSheet.children).toHaveLength(0);
    expect(bottomSheet.ondrag).toBeDefined();
    expect(bottomSheet.ondragend).toBeDefined();
    expect(screen.getByTestId("modal")).toContainElement(bottomSheet);
  });
  test("with isShown={false}", async () => {
    render(<BottomSheet isShown={false} />);

    await checkNotShown();
  });
  test("with defaultY", async () => {
    const testDefaultY = 200;
    render(<BottomSheet hugContentsHeight={false} isShown defaultY={testDefaultY} />);

    await checkY(testDefaultY);
  });
  test('with state="expanded"', async () => {
    render(<BottomSheet isShown state="expanded" />);

    await checkY(0);
  });
  test('with state="middle"', async () => {
    render(<BottomSheet isShown hugContentsHeight={false} state="middle" />);

    await checkY(400);
  });
  test('with state="input-focused"', async () => {
    render(<BottomSheet isShown hugContentsHeight={false} state="input-focused" />);

    await checkY(400 - 75);
  });
  test("with hugContents={false}", async () => {
    const onChange = jest.fn((y: number) => y);
    render(<BottomSheet isShown hugContentsHeight={false} state="middle" onChange={y => onChange(y)} />);

    const bottomSheet = screen.getByTestId("bottom-sheet");

    await waitFor(() => {
      expect(bottomSheet).toBeVisible();
      expect(bottomSheet.style.transform).toContain("400px");
    }, { timeout: 5000 });
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveLastReturnedWith(400);
  }, 7500);
  test("click outside", async () => {
    render(<TestChildren />);

    userEvent.click(screen.getByTestId(portalIdSelector));

    await checkNotShown();
  });
  test("onAnimationComplete", async () => {
    const onAnimationComplete = jest.fn(() => true);
    render(<BottomSheet isShown onAnimationComplete={() => onAnimationComplete()} />);
    const bottomSheet = screen.getByTestId("bottom-sheet");

    await waitFor(() => {
      expect(bottomSheet).toBeVisible();
    });

    await waitFor(() => {
      expect(onAnimationComplete).toHaveBeenCalledTimes(1);
    });
    expect(onAnimationComplete.mock.results[0].value).toBeTruthy();
  });
  test("onChange", async () => {
    type OnChangeType = { y: number; info: BottomSheetChangeInfo };
    const onChange = jest.fn((y: number, info: BottomSheetChangeInfo): OnChangeType => ({ y, info }));
    render(<TestChildren onChange={(y, info) => onChange(y, info)} hugContentsHeight={false} />);
    const bottomSheet = screen.getByTestId("bottom-sheet");
    const btn = screen.getByTestId("btn");

    function checkOnChangeResults(position: BottomSheetPosition, dragConstraints: DraggableProps["dragConstraints"]) {
      expect(onChange.mock.results.slice(-1).pop()?.value).toStrictEqual<OnChangeType>({
        y: defaultY,
        info: {
          position,
          dragConstraints,
        },
      });
    }

    await waitFor(() => {
      expect(bottomSheet).toBeVisible();
    });

    expect(onChange).toHaveBeenCalled();

    const defaultY = 400;
    await waitFor(() => {
      checkOnChangeResults("middle", { top: expect.any(Number), bottom: expect.any(Number) });
    }, { timeout: 5000 });

    act(() => {
      btn.click();
    });

    await waitFor(() => {
      checkOnChangeResults("hidden", { top: 0, bottom: expect.any(Number) });
    }, { timeout: 5000 });
  }, 12500);
  test("with onChildrenHeight and onWidth", async () => {
    const onChildrenHeight = jest.fn(height => height);
    const onWidth = jest.fn(width => width);
    render(<TestChildren onChildrenHeight={height => onChildrenHeight(height)} onWidth={width => onWidth(width)} />);
    const bottomSheet = screen.getByTestId("bottom-sheet");

    await waitFor(() => {
      expect(bottomSheet).toBeVisible();
    });

    expect(onWidth).toHaveBeenCalled();
    expect(onChildrenHeight).toHaveBeenCalled();
    expect(onChildrenHeight).toHaveLastReturnedWith(expect.any(Number));

    // expect(dialog.children[0]).toHaveStyle(`height: ${TEST_CHILDREN_HEIGHT}px; width: ${TEST_WIDTH}px`)
  });
  test.each([75, 125, 425])(
    "input focus / default functioncality | with inputFocusedMove | inputFocusedMove > defaultY",
    async inputFocusedMove => {
      render(
        <BottomSheet isShown hugContentsHeight={false} inputFocusedMove={inputFocusedMove === 75 ? undefined : inputFocusedMove}>
          <Input placeholder="Placeholder" />
        </BottomSheet>
      );
      let bottomSheet = screen.getByTestId("bottom-sheet");
      const input = screen.getByTestId("input");

      const defaultY = 400;
      const inputFocusedYString = `, ${inputFocusedMove <= defaultY ? defaultY - inputFocusedMove : 0}px,`;
      const defaultYString = defaultY + "px";
      await waitFor(() => {
        bottomSheet = screen.getByTestId("bottom-sheet");
        expect(bottomSheet).toBeVisible();
      });

      await waitFor(() => {
        expect(bottomSheet.style.transform).toContain(defaultYString);
      }, { timeout: 5000 });

      userEvent.tab();

      expect(input).toHaveFocus();

      await waitFor(() => {
        bottomSheet = screen.getByTestId("bottom-sheet");
        expect(bottomSheet.style.transform).toContain(inputFocusedYString);
        expect(bottomSheet.style.transform).not.toContain(defaultYString);
      });

      act(() => {
        input.blur();
      });

      await waitFor(() => {
        bottomSheet = screen.getByTestId("bottom-sheet");
        expect(bottomSheet.style.transform).toContain(defaultYString);
        expect(bottomSheet.style.transform).not.toContain(inputFocusedYString);
      });
    },
    7500
  );
  describe("with children", () => {
    test("<React.Fragment />", async () => {
      render(
        <BottomSheet isShown>
          <BottomSheet.ScrollBar />
          <Dialog.Content>
            <div>
              <p>Test 1</p>
              <p>Test 2</p>
              <p>Test 3</p>
            </div>
          </Dialog.Content>
        </BottomSheet>
      );
      const bottomSheet = screen.getByTestId("bottom-sheet");
      const scrollBar = screen.getByTestId("bottom-sheet-scroll-bar");

      await waitFor(() => {
        expect(bottomSheet).toBeVisible();
      });

      expect(bottomSheet.children).toHaveLength(2);
      expect(bottomSheet).toContainElement(scrollBar);
    });
    test("dismiss() function", async () => {
      render(<TestChildren />);
      const bottomSheet = screen.getByTestId("bottom-sheet");
      const btn = screen.getByText("Button");

      await waitFor(() => {
        expect(bottomSheet).toBeVisible();
      });

      expect(bottomSheet.children).toHaveLength(1);
      expect(bottomSheet).toContainElement(btn);
      expect(btn.onclick).toBeDefined();

      userEvent.click(btn);

      await checkNotShown();
    });
  });
});
