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
    expect(modal.children).toHaveLength(0);
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
