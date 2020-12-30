import { screen } from "@testing-library/react";
import Select from "../index";
import { selectCustomRender } from "../__helpers__/utils";

describe("<Select.Modal />", () => {
  test("default behaviour", () => {
    selectCustomRender(<Select.Modal />);
    const modal = screen.getByTestId("select-modal");

    expect(modal).toBeVisible();
    expect(modal).toMatchSnapshot();
    expect(modal).toHaveAttribute("class");
    expect(modal).toHaveAttribute("style");
    expect(modal).toHaveAttribute("role", "listbox");
    expect(modal).toHaveAttribute("aria-multiselectable", "false");
    expect(modal.children).toHaveLength(0);
  });
  test("with multiSelectable={true}", () => {
    selectCustomRender(<Select.Modal />, { providerProps: { multiSelectable: true } });

    expect(screen.getByTestId("select-modal")).toHaveAttribute("aria-multiselectable", "true");
  });
  test("with children", () => {
    selectCustomRender(
      <Select.Modal>
        <Select.Item id="test_id0">Test 1</Select.Item>
        <Select.Item id="test_id1">Test 2</Select.Item>
      </Select.Modal>
    );
    const children = screen.getByTestId("select-modal").children;

    expect(children).toHaveLength(2);
    Array.from(children).forEach((child, i) => {
      expect(child).toBeVisible();
      expect(child.children[0].id).toBe(`test_id${i}`);
      expect(child.children[1].textContent).toBe(child.textContent);
    });
  });
  // test("overflow viewport", () => {
  //   selectCustomRender(
  //     <Select.Modal style={{ position: "absolute", left: "-500px" }}>
  //       <Select.Item id="test_id0">Test 1</Select.Item>
  //       <Select.Item id="test_id1">Test 2</Select.Item>
  //     </Select.Modal>
  //   );
  //   const modal = screen.getByTestId("select-modal");

  //   screen.debug();

  //   expect(modal).toHaveAttribute("style");
  //   expect(modal.style.position).toBe("absolute");
  //   expect(modal.style.left).toBe("-500px");
  //   expect(isInViewport(modal)).toBeFalsy();
  // });
});
