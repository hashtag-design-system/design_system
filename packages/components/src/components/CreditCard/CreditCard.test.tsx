import { render, screen } from "@testing-library/react";
import CreditCard, { CreditCardBrands } from "./index";

describe("<CreditCard />", () => {
  test("default behaviour", () => {
    render(<CreditCard brand="MasterCard" creditNum="0586" />);
    const creditCard = screen.getByTestId("credit-card");
    const img = screen.getByTestId("credit-card-brand");

    expect(creditCard).toBeVisible();
    expect(creditCard).toHaveAttribute("class");
    expect(creditCard).toHaveAttribute("data-tilt");
    // +1 Due to the fact that VanillaTilt adds an additional HTMLDivElement
    expect(creditCard.children).toHaveLength(4);
    expect(creditCard).toContainElement(screen.getByTestId("icon"));
    expect(screen.queryByTestId("credit-card-owner")).toBeNull();
    expect(screen.queryByTestId("credit-card-expiration")).toBeNull();

    expect(img.tagName.toLowerCase()).toBe("img");
    expect(img).toHaveAttribute("alt", "Credit card brand logo");
    expect(img).toHaveClass("MasterCard");
  });
  test("with creditNum", () => {
    render(<CreditCard brand="MasterCard" creditNum="8596" />);
    const num = screen.getByTestId("credit-card-num");

    expect(num.tagName.toLowerCase()).toBe("p");
    expect(num).toHaveTextContent("8596");
    expect(num.children).toHaveLength(1);
    expect(num.children[0].tagName.toLowerCase()).toBe("span");
  });
  test("with ownerName", () => {
    render(<CreditCard ownerName="Test" brand="MasterCard" creditNum="8596" />);
    const owner = screen.getByTestId("credit-card-owner");

    expect(owner).toBeVisible();
    expect(owner).toHaveAttribute("class");
    expect(owner).toHaveTextContent("Test");
  });
  test.each(CreditCardBrands)("with brand", brand => {
    render(<CreditCard brand={brand} creditNum="0586" />);
    const img = screen.getByTestId("credit-card-brand");

    expect(img.tagName.toLowerCase()).toBe("img");
    expect(img).toHaveAttribute("alt", "Credit card brand logo");
    expect(img).toHaveClass(brand);
  });
  test.each(["07/22", new Date(2022, 6)])("with expirationDate, typeof string & typeof Date", expirationDate => {
    render(<CreditCard expirationDate={expirationDate} brand="MasterCard" creditNum="8596" />);
    const date = screen.getByTestId("credit-card-expiration");

    expect(date).toBeVisible();
    expect(date).toHaveAttribute("class");
    expect(date).toHaveTextContent("07/22");
  });
});
