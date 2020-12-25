import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { SliderContextProvider } from "../../../utils/contexts/SliderContext";
import { SliderFProps } from "../index";

export const defaultProps: SliderFProps = {
  min: 0,
  max: 100,
  step: 1,
  marks: [
    { value: 0, label: "0" },
    { value: 100, label: "100" },
  ],
  lockOnMarks: false,
  zeroPercentageOnEdgeMarks: false,
};

type SliderCustomRenderOptions = {
  providerProps: SliderFProps;
  renderOptions?: RenderOptions;
};

export const sliderCustomRender = (ui: React.ReactElement, options?: SliderCustomRenderOptions) => {
  return render(
    <SliderContextProvider value={{ ...defaultProps, ...options?.providerProps, calcPercentage: () => 1, calcValue: () => 1 }}>
      {ui}
    </SliderContextProvider>,
    options?.renderOptions
  );
};
