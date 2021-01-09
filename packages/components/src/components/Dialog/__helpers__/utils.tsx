import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { DialogContextProvider, DialogContextType } from "../../../utils/contexts";

export const defaultProps: Omit<DialogContextType, "handleDismiss"> = {
  hasBtnGroup: false,
  confirm: false,
  loading: false,
  allowDismissOnLoading: true,
};

type DialogCustomRenderOptions = {
  providerProps: Partial<DialogContextType>;
  renderOptions?: RenderOptions;
};

export const dialogCustomRender = (ui: React.ReactElement, options?: DialogCustomRenderOptions) => {
  return render(
    // @ts-expect-error
    <DialogContextProvider value={{ ...defaultProps, ...options?.providerProps }}>{ui}</DialogContextProvider>,
    options?.renderOptions
  );
};
