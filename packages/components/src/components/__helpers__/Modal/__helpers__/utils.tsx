import { screen, waitFor } from "@testing-library/react";
import { CONFIG } from "../../../../config";

export const overlayCheckStyle = async (toContain: string): Promise<void> => {
  const modal = screen.getByTestId("modal");

  // Wait due to animation from `opacity: 0` to `opacity: 1`
  await waitFor(() => {
    expect(modal).toBeVisible();
  });

  expect(modal).toHaveAttribute("style");
  if (toContain.includes("rgba")) {
    expect(modal.style.backgroundColor).toContain(toContain);
  } else {
    expect(modal.style["backdropFilter"]).toContain(toContain);
  }
};

export const createPortalElement = () => {
  const newEl = document.createElement("div");
  newEl.setAttribute("id", CONFIG.PORTAL_ID_SELECTOR);
  newEl.setAttribute("data-testid", CONFIG.PORTAL_ID_SELECTOR);
  document.body.prepend(newEl);
  return newEl;
};