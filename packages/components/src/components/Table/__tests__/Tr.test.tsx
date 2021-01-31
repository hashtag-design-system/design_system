import { render, screen } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import { SelectionInputGroupObj, SelectionInputGroupTypes } from "../../../utils/hooks";
import Table from "../index";
import { TableTestWrapper, TEST_TABLE_TOTAL_ROWS } from "./Table.test";

const Wrapper: React.FC = ({ children }) => {
  return (
    <Table>
      <Table.TBody>{children}</Table.TBody>
    </Table>
  );
};

const UserEventTypes = ["click", "space"] as const;
type UserEventType = typeof UserEventTypes[number];

const clickOrType = (element: HTMLElement, userEventType: UserEventType) => {
  if (userEventType === "click") {
    userEvent.click(element);
  } else {
    userEvent.type(element, specialChars.space);
  }
};

const checkSelectionInput = (element: HTMLElement, bool: boolean, mixed = false) => {
  const strBool = String(bool);
  expect(element).toHaveAttribute("value", expect.stringContaining(strBool));
  expect(element).toHaveAttribute("aria-checked", mixed ? "mixed" : strBool);
};

describe("<Table.Tr />", () => {
  test("default behaviour", () => {
    render(
      <Wrapper>
        <Table.Tr idx={0} />
      </Wrapper>
    );
    const tr = screen.getByTestId("table-tr");

    expect(tr).toBeVisible();
    expect(tr).toHaveAttribute("class");
    expect(tr.tagName.toLowerCase()).toBe("tr");
    expect(tr.children).toHaveLength(0);
  });
  test("with children", () => {
    render(
      <Wrapper>
        <Table.Tr idx={0}>
          <Table.Td />
        </Table.Tr>
      </Wrapper>
    );
    const tr = screen.getByTestId("table-tr");

    expect(tr.children).toHaveLength(1);
    expect(tr).toContainElement(screen.getByTestId("table-td"));
  });
  test('with state="hover"', () => {
    render(
      <Wrapper>
        <Table.Tr idx={0} state="hover" />
      </Wrapper>
    );

    expect(screen.getByTestId("table-tr")).toHaveClass("hover");
  });
  describe("with extraColumn", () => {
    test.each(SelectionInputGroupTypes)("default behaviour", component => {
      render(<TableTestWrapper extraColumn={{ component, totalRows: TEST_TABLE_TOTAL_ROWS }} />);
      const tr = screen.getAllByTestId("table-tr")[0];

      // Although the first <RadioButton /> is not being displayed, its is hidden via CSS
      // and is still in the DOM
      expect(tr.children).toHaveLength(5);

      const td = tr.children[0];
      const tdChildren = td.children;
      expect(tdChildren).toHaveLength(1);
      expect(tdChildren[0].children).toHaveLength(1);
      if (component === "checkbox") {
        expect(tdChildren[0].children[0].children[0].children).toHaveLength(2);
      }
      expect(td).toContainElement(screen.getAllByTestId("selection-input__container")[0]);
    });
    test.each(SelectionInputGroupTypes)("with withBorderRight={true}", component => {
      render(<TableTestWrapper extraColumn={{ component, withBorderRight: true, totalRows: TEST_TABLE_TOTAL_ROWS }} />);

      expect(screen.getAllByTestId("table-tr")[0]).toHaveClass("border-right");
    });
    test.each<UserEventType>(UserEventTypes)("<Checkbox /> | onClick basic functionality", userEventType => {
      const selectedRows = jest.fn(row => row);
      render(
        <TableTestWrapper
          extraColumn={{ component: "checkbox", selectedRows: row => selectedRows(row), totalRows: TEST_TABLE_TOTAL_ROWS }}
        />
      );
      const checkboxes = Array.from(screen.getAllByTestId("checkbox"));

      // On initial render in userEffect()
      expect(selectedRows).toHaveBeenCalledTimes(2);
      const results = selectedRows.mock.results;
      expect(results).toHaveLength(2);
      expect(results[1].value).toStrictEqual<SelectionInputGroupObj[]>([
        { id: expect.any(String), state: "default", isChecked: false, header: true, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
      ]);

      // +1 in header
      expect(checkboxes).toHaveLength(6);
      checkboxes.forEach(checkbox => {
        expect(checkbox).not.toBeChecked();
      });

      const header = checkboxes[0];
      checkboxes.slice(1, checkboxes.length).forEach((checkbox, i) => {
        clickOrType(checkbox, userEventType);
        const called = 2 + 1 + i;
        const notHeaderIdx = i + 1;
        expect(selectedRows).toHaveBeenCalledTimes(called);
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
        expect(results[selectedRows.mock.calls.length - 1].value[i]).toStrictEqual<SelectionInputGroupObj>({
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
    });
    test.each([false, true])("<Checkbox /> | Shift + onClick & reverse", isReverse => {
      render(<TableTestWrapper extraColumn={{ component: "checkbox", totalRows: TEST_TABLE_TOTAL_ROWS }} />);
      const checkboxes = Array.from(screen.getAllByTestId("checkbox"));

      // +1 in header
      expect(checkboxes).toHaveLength(6);
      checkboxes.forEach(checkbox => {
        expect(checkbox).not.toBeChecked();
      });

      let firstCheckboxIdx = 2;
      let lastCheckboxIdx = 4;
      if (isReverse) {
        firstCheckboxIdx = lastCheckboxIdx;
        lastCheckboxIdx = 2;
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
    describe.each<UserEventType>(UserEventTypes)("<RadioButton />", userEventType => {
      test("onClick basic functionality", () => {
        const selectedRows = jest.fn(row => row);
        render(
          <TableTestWrapper
            extraColumn={{ component: "radio", selectedRows: row => selectedRows(row), totalRows: TEST_TABLE_TOTAL_ROWS }}
          />
        );

        const radioBtns = Array.from(screen.getAllByTestId("radio-btn"));

        // On initial render in userEffect()
        expect(selectedRows).toHaveBeenCalledTimes(2);
        const results = selectedRows.mock.results;
        expect(results).toHaveLength(2);
        expect(results[1].value).toStrictEqual<SelectionInputGroupObj[]>([
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
        ]);

        // +1 in header but with `display: none`
        expect(radioBtns).toHaveLength(6);
        radioBtns.forEach((radioBtn, i) => {
          expect(radioBtn).not.toBeChecked();

          if (i === 0) {
            expect(radioBtn).not.toBeVisible();
          }
        });

        radioBtns.forEach((radioBtn, i) => {
          clickOrType(radioBtn, userEventType);
          if (i !== 0) {
            checkSelectionInput(radioBtn, true);
          }
          const called = 2 + 1 + i;
          expect(selectedRows).toHaveBeenCalledTimes(called);
          expect(results[selectedRows.mock.calls.length - 1].value[i]).toStrictEqual<SelectionInputGroupObj>({
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

        expect(selectedRows).toHaveBeenCalledTimes(2 + 6);
        expect(results).toHaveLength(2 + 6);
        expect(results[results.length - 1].value).toStrictEqual<SelectionInputGroupObj[]>([
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: false, header: false, latestChange: expect.anything() },
          { id: expect.any(String), state: "default", isChecked: true, header: false, latestChange: expect.anything() },
        ]);

        expect(radioBtns.filter(btn => btn.getAttribute("value")?.includes("true"))).toHaveLength(1);
      });
      test("double click", () => {
        render(<TableTestWrapper extraColumn={{ component: "radio", totalRows: TEST_TABLE_TOTAL_ROWS }} />);

        const radioBtns = Array.from(screen.getAllByTestId("radio-btn"));

        // Not radioBtns[0], because header is not visible
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
});
