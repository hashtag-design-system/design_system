import { SliderProps } from "../../components/Slider";
import { createCtx } from "../createCtx";

export type SliderContextType = SliderProps & {
  calcValue: (percentage: number) => number;
  calcPercentage: (number: number) => number;
};

export const [useSliderContext, SliderContextProvider] = createCtx<SliderContextType>();
