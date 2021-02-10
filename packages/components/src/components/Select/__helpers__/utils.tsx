import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { SelectContextProvider, SelectContextType } from "../../../utils";

export const defaultProps: Pick<
  SelectContextType,
  "isOpen" | "isMobile" | "multiSelectable" | "items" | "value" | "width" | "filterValue"
> = {
  isOpen: false,
  isMobile: false,
  multiSelectable: false,
  value: "",
  items: [],
  width: "200px",
  filterValue: [],
};

type SelectCustomRenderOptions = {
  providerProps?: Partial<SelectContextType>;
  renderOptions?: RenderOptions;
};

export const selectCustomRender = (ui: React.ReactElement, options?: SelectCustomRenderOptions) => {
  return render(
    // @ts-expect-error
    <SelectContextProvider value={{ ...defaultProps, ...options?.providerProps }}>{ui}</SelectContextProvider>,
    options?.renderOptions
  );
};
