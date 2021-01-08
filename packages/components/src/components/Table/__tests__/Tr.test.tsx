import { render, screen } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import Table from "../index";
import { TableSelectionInputs } from "../Table";
import { TableTestWrapper } from "./Table.test";

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
        <Table.Tr />
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
        <Table.Tr>
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
        <Table.Tr state="hover" />
      </Wrapper>
    );

    expect(screen.getByTestId("table-tr")).toHaveClass("hover");
  });
  describe("with extraColumn", () => {
    test.each(TableSelectionInputs)("default behaviour", component => {
      render(<TableTestWrapper extraColumn={{ component }} />);
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
    test.each(TableSelectionInputs)("with withBorderRight={true}", component => {
      render(<TableTestWrapper extraColumn={{ component, withBorderRight: true }} />);

      expect(screen.getAllByTestId("table-tr")[0]).toHaveClass("border-right");
    });
    test.each<UserEventType>(UserEventTypes)("<Checkbox /> | onClick basic functionality", userEventType => {
      const selectedRows = jest.fn(row => row);
      render(<TableTestWrapper extraColumn={{ component: "checkbox", selectedRows: row => selectedRows(row) }} />);
      const checkboxes = Array.from(screen.getAllByTestId("checkbox"));

      // On initial render in userEffect()
      expect(selectedRows).toHaveBeenCalledTimes(2);
      const results = selectedRows.mock.results;
      expect(results).toHaveLength(2);
      expect(results[1].value).toStrictEqual([
        { id: expect.any(String), isChecked: false, header: true },
        { id: expect.any(String), isChecked: false, header: false },
        { id: expect.any(String), isChecked: false, header: false },
        { id: expect.any(String), isChecked: false, header: false },
        { id: expect.any(String), isChecked: false, header: false },
        { id: expect.any(String), isChecked: false, header: false },
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
        expect(results[1 + notHeaderIdx].value[notHeaderIdx]).toStrictEqual({
          id: expect.any(String),
          isChecked: true,
          header: false,
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
        expect(results[selectedRows.mock.calls.length - 1].value[i]).toStrictEqual({
          id: expect.any(String),
          isChecked: false,
          header: i === 0 ? true : false,
        });
      });

      clickOrType(header, userEventType);

      checkboxes.forEach(checkbox => {
        checkSelectionInput(checkbox, true);
      });

      clickOrType(checkboxes[checkboxes.length - 1], userEventType);

      checkSelectionInput(header, false, true);
    });
    describe.each<UserEventType>(UserEventTypes)("<RadioButton />", userEventType => {
      test("onClick basic functionality", () => {
        const selectedRows = jest.fn(row => row);
        render(<TableTestWrapper extraColumn={{ component: "radio", selectedRows: row => selectedRows(row) }} />);

        const radioBtns = Array.from(screen.getAllByTestId("radio-btn"));

        // On initial render in userEffect()
        expect(selectedRows).toHaveBeenCalledTimes(2);
        const results = selectedRows.mock.results;
        expect(results).toHaveLength(2);
        expect(results[1].value).toStrictEqual([
          { id: expect.any(String), isChecked: false, header: true },
          { id: expect.any(String), isChecked: false, header: false },
          { id: expect.any(String), isChecked: false, header: false },
          { id: expect.any(String), isChecked: false, header: false },
          { id: expect.any(String), isChecked: false, header: false },
          { id: expect.any(String), isChecked: false, header: false },
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
          expect(results[selectedRows.mock.calls.length - 1].value[i]).toStrictEqual({
            id: expect.any(String),
            isChecked: true,
            header: i === 0,
          });
          radioBtns
            .filter(btn => btn.id !== radioBtn.id)
            .forEach(uncheckedBtn => {
              checkSelectionInput(uncheckedBtn, false);
            });
        });

        expect(selectedRows).toHaveBeenCalledTimes(2 + 6);
        expect(results).toHaveLength(2 + 6);
        expect(results[results.length - 1].value).toStrictEqual([
          { id: expect.any(String), isChecked: false, header: true },
          { id: expect.any(String), isChecked: false, header: false },
          { id: expect.any(String), isChecked: false, header: false },
          { id: expect.any(String), isChecked: false, header: false },
          { id: expect.any(String), isChecked: false, header: false },
          { id: expect.any(String), isChecked: true, header: false },
        ]);

        expect(radioBtns.filter(btn => btn.getAttribute("value")?.includes("true"))).toHaveLength(1);
      });
      test("double click", () => {
        render(<TableTestWrapper extraColumn={{ component: "radio" }} />);

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
