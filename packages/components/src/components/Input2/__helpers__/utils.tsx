import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { InputContextProvider, generateInputId } from "../../../utils";
import { InputFProps } from "../index";

export const defaultProps: InputFProps = {
  id: generateInputId(),
  placeholder: "Placeholder",
  floatingplaceholder: true,
  state: "default",
};

type InputCustomRenderOptions = {
  providerProps: InputFProps;
  renderOptions?: RenderOptions;
};

export const inputCustomRender = (ui: React.ReactElement, options?: InputCustomRenderOptions) => {
  return render(
    <InputContextProvider value={{ ...defaultProps, ...options?.providerProps }}>{ui}</InputContextProvider>,
    options?.renderOptions
  );
};
