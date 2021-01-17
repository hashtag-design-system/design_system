import { COUNTRIES_ARR } from "@georgekrax-hashtag/common";
import { render, screen, waitFor } from "@testing-library/react";
import Select from "../index";

describe("Select <CountryItem />", () => {
  test.each([true, false])("default behaviour & withFlags={bool}", async bool => {
    const country = COUNTRIES_ARR[0];
    render(
      <Select defaultOpen>
        <Select.Country {...country} withFlags={bool} />
      </Select>
    );
    const countryItem = screen.getByTestId("select-item");
    const name = country.name;
    const lowerCaseName = name.toLowerCase();
    const label = countryItem.children[1];

    await waitFor(() => {
      expect(countryItem).toBeVisible();
    });
    expect(countryItem.children[0].id).toBe(lowerCaseName);
    if (bool) {
      const img = label.children[0];
      expect(img.tagName.toLowerCase()).toBe("img");
      expect(img).toHaveAttribute("src", expect.stringContaining("https://d32454kkzii6gk.cloudfront.net/"));
    }
    // Due to withFlags={true} by default, and an <img /> is first
    expect(label.children[bool ? 1 : 0]).toHaveTextContent(name);
    expect(label).toHaveAttribute("for", lowerCaseName);
  });
});
