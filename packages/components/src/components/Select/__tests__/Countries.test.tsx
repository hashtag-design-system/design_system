import { render, screen } from "@testing-library/react";
import { COUNTRIES_ARR } from "@the_hashtag/common";
import { CountriesArrType } from "../Countries";
import Select from "../index";

describe("<Select.Countries />", () => {
  test("default behaviour", () => {
    render(
      <Select defaultOpen>
        <Select.Countries />
      </Select>
    );

    expect(screen.getAllByTestId("select-item")).toHaveLength(COUNTRIES_ARR.length);
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
    expect(arr.mock.results[0].value).toStrictEqual(COUNTRIES_ARR.slice(0, 50));
  });
});
