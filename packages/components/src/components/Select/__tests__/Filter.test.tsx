import { screen } from "@testing-library/react";
import Select from "../index";
import { selectCustomRender } from "../__helpers__/utils";

describe("<Select.Filter />", () => {
  // More tests of filter functionality in the "./Select.test.tsx" file
  test("default behaviour", async () => {
    selectCustomRender(<Select.Filter placeholder="Filter" floatingplaceholder={false} />);
    const input = screen.getByTestId("input");

    expect(input).toBeVisible();
    expect(input).toHaveAttribute("class");
    expect(input.onchange).toBeDefined();
    expect(input).toHaveAttribute("placeholder", "Filter");
  });
});
