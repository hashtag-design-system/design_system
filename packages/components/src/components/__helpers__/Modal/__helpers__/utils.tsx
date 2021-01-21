import { screen, waitFor } from "@testing-library/react";

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
    // @ts-expect-error
    expect(modal.style["backdropFilter"]).toContain(toContain);
  }
};