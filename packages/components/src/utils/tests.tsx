import { render, RenderOptions } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import ConfigProvider, { ConfigProviderFProps } from "../components/ConfigProvider";
import { UserSelectionInputEventType } from "../typings";

export const clickOrType = (element: HTMLElement, userEventType: UserSelectionInputEventType) => {
  if (userEventType === "click") {
    userEvent.click(element);
  } else {
    userEvent.type(element, specialChars.space);
  }
};

export const checkSelectionInput = (element: HTMLElement, bool: boolean, mixed = false) => {
  const strBool = String(bool);
  expect(element).toHaveAttribute("value", expect.stringContaining(strBool));
  expect(element).toHaveAttribute("aria-checked", mixed ? "mixed" : strBool);
};

export const isJest = () => {
  return process.env.NODE_ENV === "test" && typeof jest !== "undefined";
};

export type ConfigCustomRenderOptions = {
  providerProps: ConfigProviderFProps;
  renderOptions?: RenderOptions;
};

/**
  @function
  The <ConfigProvider /> already provides with the default values the children components, this function
  does not need to be used when the `useConfigContext()` is used.
*/
export const configCustomRender = (ui: React.ReactElement, options?: ConfigCustomRenderOptions) => {
  return render(<ConfigProvider {...options?.providerProps}>{ui}</ConfigProvider>, options?.renderOptions);
};
