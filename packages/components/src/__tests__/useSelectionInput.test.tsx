import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { range } from "lodash";
import { useEffect } from "react";
import Checkbox, { CheckboxState } from "../components/Checkbox";
import RadioButton from "../components/RadioButton";
import { UserSelectionInputEventType, UserSelectionInputEventTypes } from "../typings";
import { checkSelectionInput, clickOrType } from "../utils";
import { useSelectionInput } from "../utils/hooks";
import { SelectionInputGroupObj, UseSelectionInputOptions } from "../utils/hooks/useSelectionInput";

const TEST_CHILDREN_LENGTH = 5;

const TestChildren: React.FC<Partial<UseSelectionInputOptions> & { onInput?: (inputs: SelectionInputGroupObj[]) => void }> = ({
  type = "checkbox",
  inputsLength = 5,
  onInput,
  ...options
}) => {
  const { ref: selectionInputRef, onClick, inputs } = useSelectionInput({ type, inputsLength, ...options });

  useEffect(() => {
    if (onInput) {
      onInput(inputs);
    }
  }, [inputs]);

  return (
    <div data-testid="container">
      {type === "checkbox" ? (
        <>
          <Checkbox
            state={inputs[0].state}
            checked={inputs[0].isChecked}
            onClick={onClick}
            ref={element => (selectionInputRef.current[0] = element)}
            label={{ value: "Label 1" }}
            name="header"
          />
          <Checkbox
            state={inputs[1].state}
            checked={inputs[1].isChecked}
            onClick={onClick}
            ref={element => (selectionInputRef.current[1] = element)}
            label={{ value: "Label 2" }}
          />
          <Checkbox
            state={inputs[2].state}
            checked={inputs[2].isChecked}
            onClick={onClick}
            ref={element => (selectionInputRef.current[2] = element)}
            label={{ value: "Label 3" }}
          />
          <Checkbox
            state={inputs[3].state}
            checked={inputs[3].isChecked}
            onClick={onClick}
            ref={element => (selectionInputRef.current[3] = element)}
            label={{ value: "Label 4" }}
          />
          <Checkbox
            state={inputs[4].state}
            checked={inputs[4].isChecked}
            onClick={onClick}
            ref={element => (selectionInputRef.current[4] = element)}
            label={{ value: "Label 5" }}
          />
        </>
      ) : (
        <>
          <RadioButton
            checked={inputs[0].isChecked}
            onClick={onClick}
            ref={element => (selectionInputRef.current[0] = element)}
            label={{ value: "Label 1" }}
            // name="header"
          />
          <RadioButton
            checked={inputs[1].isChecked}
            onClick={onClick}
            ref={element => (selectionInputRef.current[1] = element)}
            label={{ value: "Label 2" }}
          />
          <RadioButton
            checked={inputs[2].isChecked}
            onClick={onClick}
            ref={element => (selectionInputRef.current[2] = element)}
            label={{ value: "Label 3" }}
          />
          <RadioButton
            checked={inputs[3].isChecked}
            onClick={onClick}
            ref={element => (selectionInputRef.current[3] = element)}
            label={{ value: "Label 4" }}
          />
          <RadioButton
            checked={inputs[4].isChecked}
            onClick={onClick}
            ref={element => (selectionInputRef.current[4] = element)}
            label={{ value: "Label 5" }}
          />
        </>
      )}
    </div>
  );
};

describe("useSelectionInput(", () => {
  test.each<UseSelectionInputOptions["type"]>(["checkbox", "radio"])("default behaviour", type => {
    render(<TestChildren type={type} />);
    const container = screen.getByTestId("container");
    const inputs = screen.getAllByTestId(type === "radio" ? type + "-btn" : type);

    expect(container).toBeVisible();
    expect(container.children).toHaveLength(5);
    expect(inputs).toHaveLength(5);
    inputs.forEach((input, i) => {
      if (i === 0 && type === "checkbox") {
        expect(input).not.toBeChecked();
        expect(input).toHaveAttribute("name", "header");
      }
    });
  });
  test.each<UseSelectionInputOptions["type"]>(["checkbox", "radio"])("with defaultChecked", type => {
    const defaultChecked: boolean[] = [true, true];
    render(<TestChildren type={type} defaultChecked={defaultChecked} />);
    const inputs = screen.getAllByTestId(type === "radio" ? type + "-btn" : type);

    inputs.forEach((input, i) => {
      if (i < defaultChecked.length) {
        checkSelectionInput(input, true);
      } else {
        checkSelectionInput(input, false);
      }
    });
  });
  test("with defaultState", () => {
    const defaultState: CheckboxState[] = ["checked", "indeterminate", "focus-visible"];
    render(<TestChildren defaultState={defaultState} />);
    const checkboxes = screen.getAllByTestId("checkbox");

    expect(checkboxes).toHaveLength(TEST_CHILDREN_LENGTH);
    checkboxes.forEach((checkbox, i) => {
      const state = defaultState[i];
      if (i < defaultState.length) {
        if (state === "focus-visible") {
          expect(checkbox).toHaveClass(state);
        }
        if (state === "indeterminate") {
          expect(checkbox).toBePartiallyChecked();
        }
      } else {
        expect(checkbox).not.toHaveClass(defaultState[i - defaultState.length]);
      }
    });
  });
  describe('with type="checkbox" - <Checkbox />', () => {
    test.each<UserSelectionInputEventType>(UserSelectionInputEventTypes)(
      "<Checkbox /> | onClick basic functionality",
      userEventType => {
        const onInput = jest.fn((inputs: SelectionInputGroupObj[]) => inputs);
        render(<TestChildren onInput={onInput} />);

        // On initial render in userEffect()
        expect(onInput).toHaveBeenCalledTimes(2);
        const results = onInput.mock.results;
        expect(results).toHaveLength(2);
        expect(results[1].value).toStrictEqual<SelectionInputGroupObj[]>([
          { id: expect.any(String), state: "default", isChecked: false, header: true, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        ]);

        const checkboxes = Array.from(screen.getAllByTestId("checkbox"));
        // +1 in header
        expect(checkboxes).toHaveLength(5);
        checkboxes.forEach(checkbox => {
          expect(checkbox).not.toBeChecked();
        });

        const header = checkboxes[0];
        checkboxes.slice(1, checkboxes.length).forEach((checkbox, i) => {
          clickOrType(checkbox, userEventType);
          const called = 2 + 1 + i;
          const notHeaderIdx = i + 1;
          expect(onInput).toHaveBeenCalledTimes(called);
          expect(results[1 + notHeaderIdx].value[notHeaderIdx]).toStrictEqual<SelectionInputGroupObj>({
            id: expect.any(String),
            state: expect.any(String),
            isChecked: true,
            header: false,
            latestChange: expect.anything(),
          });

          if (i === checkboxes.length - 2) {
            checkSelectionInput(header, true);
          } else {
            checkSelectionInput(header, false, true);
          }
        });

        clickOrType(header, userEventType);

        checkboxes.forEach((checkbox, i) => {
          checkSelectionInput(checkbox, false);
          expect(results[onInput.mock.calls.length - 1].value[i]).toStrictEqual<SelectionInputGroupObj>({
            id: expect.any(String),
            state: "default",
            isChecked: false,
            header: i === 0 ? true : false,
            latestChange: expect.anything(),
          });
        });

        clickOrType(header, userEventType);

        checkboxes.forEach(checkbox => {
          checkSelectionInput(checkbox, true);
        });

        clickOrType(checkboxes[checkboxes.length - 1], userEventType);

        checkSelectionInput(header, false, true);

        clickOrType(header, userEventType);

        // Click checkoxes[0] (header), and it should "uncheck" all checkboxes if inteterminate
        checkSelectionInput(header, false, false);
      }
    );
    test.each([false, true])("<Checkbox /> | Shift + click & reverse", isReverse => {
      render(<TestChildren shift />);
      const checkboxes = Array.from(screen.getAllByTestId("checkbox"));

      // +1 in header
      expect(checkboxes).toHaveLength(5);
      checkboxes.forEach(checkbox => {
        expect(checkbox).not.toBeChecked();
      });

      let firstCheckboxIdx = 1;
      let lastCheckboxIdx = 3;
      if (isReverse) {
        firstCheckboxIdx = lastCheckboxIdx;
        lastCheckboxIdx = 1;
      }
      clickOrType(checkboxes[firstCheckboxIdx], "click");

      checkSelectionInput(checkboxes[firstCheckboxIdx], true);

      userEvent.click(checkboxes[lastCheckboxIdx], { shiftKey: true });

      checkboxes.forEach((checkbox, i) => {
        if (isReverse && i <= firstCheckboxIdx && i >= lastCheckboxIdx) {
          checkSelectionInput(checkbox, true);
        } else if (i >= firstCheckboxIdx && i <= lastCheckboxIdx) {
          checkSelectionInput(checkbox, true);
        } else {
          checkSelectionInput(checkbox, false, i === 0);
        }
      });
    });
    test.each([false, true])("<Checkbox /> | Shift + click to uncheck & reverse", isReverse => {
      let firstCheckboxIdx = 1;
      let lastCheckboxIdx = 3;
      if (isReverse) {
        firstCheckboxIdx = lastCheckboxIdx;
        lastCheckboxIdx = 1;
      }
      const defaultChecked: boolean[] = range(0, TEST_CHILDREN_LENGTH).map((_, i) => {
        if (!isReverse && i >= firstCheckboxIdx && i <= lastCheckboxIdx) {
          return true;
        } else if (isReverse && i <= firstCheckboxIdx && i >= lastCheckboxIdx) {
          return true;
        }
        return false
      })
      // [false, true, true, true, false];
      render(<TestChildren shift defaultChecked={defaultChecked} />);
      const checkboxes = Array.from(screen.getAllByTestId("checkbox"));

      expect(checkboxes).toHaveLength(5);
      checkboxes.forEach((checkbox, i) => {
        if (defaultChecked[i]) {
          checkSelectionInput(checkbox, true);
        } else {
          checkSelectionInput(checkbox, false);
        }
      });

      for (let i = 0; i < 2; i++) {
        clickOrType(checkboxes[firstCheckboxIdx], "click");

        checkSelectionInput(checkboxes[firstCheckboxIdx], i === 0 ? false : true);
      }

      userEvent.click(checkboxes[lastCheckboxIdx], { shiftKey: true });

      // Because the other where by default "unchecked", and they were not clicked,
      // they cannot be checked now too
      checkboxes.forEach((checkbox, i) => {
        checkSelectionInput(checkbox, false);
      });
    });
  });
  describe.each<UserSelectionInputEventType>(UserSelectionInputEventTypes)('with type="radio" - <RadioButton />', userEventType => {
    test("onClick basic functionality", () => {
      const onInput = jest.fn((inputs: SelectionInputGroupObj[]) => inputs);
      render(<TestChildren type="radio" onInput={onInput} />);

      // On initial render in userEffect()
      expect(onInput).toHaveBeenCalledTimes(2);
      const results = onInput.mock.results;
      expect(results).toHaveLength(2);
      expect(results[1].value).toStrictEqual<SelectionInputGroupObj[]>([
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
      ]);

      const radioBtns = Array.from(screen.getAllByTestId("radio-btn"));
      const totalRadioBtns = 5;
      const timesCalled = 2 + totalRadioBtns;

      // +1 in header but with `display: none`
      expect(radioBtns).toHaveLength(totalRadioBtns);
      radioBtns.forEach(radioBtn => {
        expect(radioBtn).not.toBeChecked();
        expect(radioBtn).not.toHaveAttribute("name");
      });

      radioBtns.forEach((radioBtn, i) => {
        clickOrType(radioBtn, userEventType);
        if (i !== 0) {
          checkSelectionInput(radioBtn, true);
        }
        const called = 2 + 1 + i;
        expect(onInput).toHaveBeenCalledTimes(called);
        expect(results[onInput.mock.calls.length - 1].value[i]).toStrictEqual<SelectionInputGroupObj>({
          id: expect.any(String),
          state: expect.any(String),
          isChecked: true,
          header: false,
          latestChange: expect.anything(),
        });
        radioBtns
          .filter(btn => btn.id !== radioBtn.id)
          .forEach(uncheckedBtn => {
            checkSelectionInput(uncheckedBtn, false);
          });
      });

      expect(onInput).toHaveBeenCalledTimes(timesCalled);
      expect(results).toHaveLength(timesCalled);
      expect(results[results.length - 1].value).toStrictEqual<SelectionInputGroupObj[]>([
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: true, header: false, latestChange: expect.anything() },
      ]);

      expect(radioBtns.filter(btn => btn.getAttribute("value")?.includes("true"))).toHaveLength(1);
    });
    test("double click", () => {
      render(<TestChildren type="radio" />);

      const radioBtns = Array.from(screen.getAllByTestId("radio-btn"));

      userEvent.click(radioBtns[1]);

      radioBtns.forEach((radioBtn, i) => {
        if (i !== 1) {
          checkSelectionInput(radioBtn, false);
        } else {
          checkSelectionInput(radioBtn, true);
        }
      });

      expect(radioBtns.filter(btn => btn.getAttribute("value")?.includes("true"))).toHaveLength(1);

      userEvent.click(radioBtns[1]);

      radioBtns.forEach(radioBtn => {
        checkSelectionInput(radioBtn, false);
      });

      expect(radioBtns.filter(btn => btn.getAttribute("value")?.includes("true"))).toHaveLength(0);

      userEvent.dblClick(radioBtns[1]);

      radioBtns.forEach(radioBtn => {
        checkSelectionInput(radioBtn, false);
      });

      expect(radioBtns.filter(btn => btn.getAttribute("value")?.includes("true"))).toHaveLength(0);
    });
  });
});
