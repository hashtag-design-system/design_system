import { screen } from "@testing-library/react";
import { SliderFProps } from "../..";
import { calculatePercentage } from "../../../../utils";
import { defaultProps, sliderCustomRender } from "../utils";
import { Chart } from "./Chart";

export const TEST_CHART_DATA: SliderFProps["chart"] = {
  type: "bar",
  data: [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
  ],
};

describe("Slider <Chart />", () => {
  test("with chart={true}", () => {
    sliderCustomRender(<Chart value={parseFloat(defaultProps.max!.toString())} />, { providerProps: { chart: TEST_CHART_DATA, thumb: { defaultValue: 50 } } });
    const chart = screen.getByTestId("slider-chart");
    const chartOverlay = screen.getByTestId("slider-chart-overlay");

    expect(chart).toBeVisible();
    expect(chart).toMatchSnapshot();
    expect(screen.getByTestId("slider-chart-container").children.length).toBe(2);
    expect(chartOverlay.style.left).toBeDefined();
    expect(chartOverlay.children).toHaveLength(TEST_CHART_DATA.data.length);
    screen
      .queryAllByTestId("slider-chart-bar")
      .slice(0, TEST_CHART_DATA["data"].length)
      .forEach((bar, i) => {
        const { height } = bar.style;
        expect(height).toBeDefined();
        expect(height).toContain(
          calculatePercentage(
            TEST_CHART_DATA["data"][i].value,
            parseFloat(defaultProps.min!.toString()),
            parseFloat(defaultProps.max!.toString()),
            { returnRounded: true }
          )
        );
      });
  });
  test("with chart={false}", () => {
    sliderCustomRender(<Chart value={parseFloat(defaultProps.max!.toString())} />);
    const chart = screen.queryByTestId("slider-chart");

    expect(chart).toBeNull();
  });
  test("with percentage={true}", () => {
    sliderCustomRender(<Chart value={parseFloat(defaultProps.max!.toString())} />, { providerProps: { chart: { ...TEST_CHART_DATA, percentage: true } } });
    const chartOverlay = screen.getByTestId("slider-chart-overlay");

    expect(chartOverlay.children).toHaveLength(TEST_CHART_DATA.data.length);
    screen
      .queryAllByTestId("slider-chart-bar")
      .slice(0, TEST_CHART_DATA["data"].length)
      .forEach((bar, i) => {
        const { height } = bar.style;
        expect(height).toBeDefined();
        expect(height).toContain(TEST_CHART_DATA["data"][i].value);
      });
  });
});
