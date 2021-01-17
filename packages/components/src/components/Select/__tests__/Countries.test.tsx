import { render, screen } from "@testing-library/react";
import { CountriesArrType } from "../Countries";
import Select, { countriesArr } from "../index";

describe("<Select.Countries />", () => {
  test.each([true, false])("default behaviour & withFlags={bool}", bool => {
    render(
      <Select defaultOpen>
        <Select.Countries withFlags={bool} />
      </Select>
    );
    const countries = screen.getAllByTestId("select-item");

    expect(countries).toHaveLength(countriesArr.length);
    countries.forEach((country, i) => {
      const name = countriesArr[i].name;
      const lowerCaseName = name.toLowerCase();
      const label = country.children[1];
      expect(country.children[0].id).toBe(lowerCaseName);
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
  test("with custom arr", () => {
    const totalCountries = 50;
    const arr = jest.fn((countries: CountriesArrType) => countries.filter((_, i) => i < totalCountries));
    render(
      <Select defaultOpen>
        <Select.Countries arr={countries => arr(countries)} />
      </Select>
    );

    expect(screen.getAllByTestId("select-item")).toHaveLength(totalCountries);
    expect(arr).toHaveBeenCalledTimes(1);
    expect(arr.mock.results[0].value).toStrictEqual(countriesArr.slice(0, 50));
  });
});
