import userEvent, { specialChars } from "@testing-library/user-event";
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