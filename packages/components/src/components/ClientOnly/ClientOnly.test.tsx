import { render, screen } from "@testing-library/react";
import ClientOnly from "./index";

describe("<ClientOnly />", () => {
  test.each([undefined, true])("default behaviour & with defaultMounted", defaultMounted => {
    render(
      <ClientOnly defaultMounted={defaultMounted}>
        <div data-testid="div">Hey!</div>
      </ClientOnly>,
      { hydrate: !defaultMounted ? true : false  }
    );

    if (typeof window !== "undefined") {
      const div = screen.getByTestId("div");
      
      expect(div).toBeVisible();
      expect(div).toHaveTextContent("Hey!");
      expect(div.children).toHaveLength(0);
      expect(div).toMatchSnapshot();
    }
  });
});
