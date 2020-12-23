import { TEST_STRENGTH_BOXES } from "./PasswordBoxes.test";

export const passwordBoxesClassNameContains = (elements: HTMLElement[], className?: string) => {
  elements.forEach((element, i) => {
    expect(element.className).toContain(className ? className : TEST_STRENGTH_BOXES[i]);
  });
};
