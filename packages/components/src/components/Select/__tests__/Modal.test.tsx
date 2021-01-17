import { screen, waitFor } from "@testing-library/react";
import Select from "../index";
import { selectCustomRender } from "../__helpers__/utils";

describe("<Select.Modal />", () => {
  test("default behaviour", async () => {
    selectCustomRender(<Select.Modal />, { providerProps: { isOpen: false } });
    const modal = screen.getByTestId("select-modal");

    expect(modal).not.toBeVisible();
    expect(modal).toMatchSnapshot();
    expect(modal).toHaveAttribute("class");
    expect(modal).toHaveAttribute("style");
    expect(modal.children).toHaveLength(0);
  });
  test.each([0, 1])("with open={true} || providerProps={ isOpen: true }", async idx => {
    if (idx === 0) {
      selectCustomRender(<Select.Modal />, { providerProps: { isOpen: true } });
    } else {
      selectCustomRender(<Select.Modal open />);
    }
    const modal = screen.getByTestId("select-modal");

    await waitFor(() => {
      expect(modal).toBeVisible();
    });
    expect(modal).toHaveAttribute("style");
  });
  test("with width & fullWidth={false}", () => {
    selectCustomRender(<Select.Modal />, { providerProps: { width: 100 } });

    expect(screen.getByTestId("select-modal")).not.toHaveStyle("width: 100px");
  });
  test("with width & fullWidth={true}", () => {
    selectCustomRender(<Select.Modal fullWidth />, { providerProps: { width: 100 } });

    expect(screen.getByTestId("select-modal")).toHaveStyle("width: 100px");
  });
  // test("with open={true}", async () => {
  //   const modal = screen.getByTestId("select-modal");

  //   await waitFor(() => {
  //     expect(modal).toBeVisible();
  //   });
  //   expect(modal).toMatchSnapshot();
  //   expect(modal).toHaveAttribute("style");
  // });
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
