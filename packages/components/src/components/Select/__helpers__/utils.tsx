import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { SelectContextProvider, SelectContextType } from "../../../utils/contexts";

export const defaultProps: Pick<SelectContextType, "isOpen" | "onlyChild" | "isMobile" | "multiSelectable" | "selectedItems" | "value"> = {
  isOpen: false,
  onlyChild: true,
  isMobile: false,
  multiSelectable: false,
  value: "",
  selectedItems: [],
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
