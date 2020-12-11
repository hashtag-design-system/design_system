import { SliderFProps } from "../../components/Slider";
import { createCtx } from "../createCtx";

export type SliderContextType = Pick<SliderFProps, "min" | "max" | "zeroPercentageOnEdgeMarks" | "marks" | "chart"> & {
  calcValue: (percentage: number) => number;
  calcPercentage: (number: number) => number;
};

export const [useSliderContext, SliderContextProvider] = createCtx<SliderContextType>();
