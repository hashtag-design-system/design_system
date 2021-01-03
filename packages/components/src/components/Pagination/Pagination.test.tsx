import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./index";

describe("<Pagination />", () => {
  test("default behaviour", () => {
    render(<Pagination totalPages={10} />);
    const pagination = screen.getByTestId("pagination");

    expect(pagination).toBeVisible();
    expect(pagination.tagName.toLowerCase()).toBe("nav");
    expect(pagination).toHaveAttribute("class");
    expect(pagination).toHaveAttribute("aria-label", "Pagination");

    const children = pagination.children;
    expect(children).toHaveLength(11);
    (Array.from(children) as HTMLElement[]).forEach((child, i) => {
      if (i === 0 || i === children.length - 1) {
        expect(child.tagName.toLowerCase()).toBe("button");
        expect(child.className).toContain("secondary");
      } else if (child.textContent === "...") {
        expect(child.tagName.toLowerCase()).toBe("span");
      } else {
        expect(child.tagName.toLowerCase()).toBe("a");
      }

      expect(child.onclick).toBeDefined();
    });

    expect(children[0]).toContainElement(screen.getAllByTestId("icon")[0]);
    expect(children[0]).toHaveTextContent("Previous");
    expect(children[0]).toBeDisabled();
    expect(children[0]).toHaveClass("disabled");
    expect(children[1]).toHaveClass("active");
    expect(children[8].tagName.toLowerCase()).toBe("span");
    expect(children[8]).toHaveTextContent("...");
    expect(children[children.length - 1]).toContainElement(screen.getAllByTestId("icon")[1]);
    expect(children[children.length - 1]).toHaveTextContent("Next");
  });
  test("with currentPage in the middle", () => {
    render(<Pagination totalPages={10} currentPage={5} />);
    const children = screen.getByTestId("pagination").children;

    expect(children).toHaveLength(11);

    expect(children[0]).not.toBeDisabled();
    expect(children[0]).not.toHaveClass("disabled");
    expect(children[1]).not.toHaveClass("active");
    expect(children[2].tagName.toLowerCase()).toBe("span");
    expect(children[2]).toHaveTextContent("...");
    expect(children[5]).toHaveClass("active");
    expect(children[8].tagName.toLowerCase()).toBe("span");
    expect(children[8]).toHaveTextContent("...");
  });
  test("with a lot of pages (50)", () => {
    render(<Pagination totalPages={50} />);
    const children = screen.getByTestId("pagination").children;

    expect(children).toHaveLength(11);

    expect(children[0]).toBeDisabled();
    expect(children[0]).toHaveClass("disabled");
    expect(children[1]).toHaveClass("active");
    expect(children[8].tagName.toLowerCase()).toBe("span");
    expect(children[8]).toHaveTextContent("...");
  });
  test("with surroundingPageCount", async () => {
    render(<Pagination totalPages={20} surroundingPageCount={3} />);
    const children = Array.from(screen.getByTestId("pagination").children);

    expect(children).toHaveLength(13);

    userEvent.click(children[6]);

    expect(screen.getAllByTestId("pagination-link")[1]).toHaveTextContent("...");
    expect(children[3]).toHaveTextContent("3");
    expect(children[4]).toHaveTextContent("4");
    expect(children[5]).toHaveTextContent("5");
    expect(children[7]).toHaveTextContent("7");
    expect(children[8]).toHaveTextContent("8");
    expect(children[9]).toHaveTextContent("9");
    expect(children[10]).toHaveTextContent("...");
  });
  test("with marginPageCount", () => {
    render(<Pagination totalPages={20} marginPageCount={2} />);
    const children = Array.from(screen.getByTestId("pagination").children);

    expect(children).toHaveLength(11);
    const lastPage = children[children.length - 2];
    expect(lastPage).toHaveTextContent("20");
    expect(children[children.length - 3]).toHaveTextContent("19");

    userEvent.click(lastPage);

    expect(children[1]).toHaveTextContent("1");
    expect(children[2]).toHaveTextContent("2");
  });
  test("with showPageCount={false}", () => {
    render(<Pagination totalPages={10} showPageCount={false} />);
    const children = Array.from(screen.getByTestId("pagination").children);

    expect(children).toHaveLength(2);
    expect(children[0].tagName.toLowerCase()).toBe("button");
    expect(children[1].tagName.toLowerCase()).toBe("button");
  });
  test("hide if totalPages={1}", () => {
    render(<Pagination totalPages={1} />);

    expect(screen.queryByTestId("pagination")).toBeNull();
  });
  test("with hideIfOne={false}", () => {
    render(<Pagination totalPages={1} hideIfOne={false} />);
    const pagination = screen.getByTestId("pagination");

    expect(pagination).toBeVisible();
    expect(pagination.children).toHaveLength(1);

    const pageBox = pagination.children[0];
    expect(pageBox.tagName.toLowerCase()).toBe("a");
    expect(pageBox).toHaveTextContent("1");
    // Btns are not displayed if totalPages={1}
    expect(screen.queryByTestId("pagination-btn-previous")).toBeNull();
    expect(screen.queryByTestId("pagination-btn-next")).toBeNull();
  });
  test("with hrefBuilder", () => {
    render(<Pagination totalPages={10} hrefBuilder={page => `https://www.test.com/${page}`} />);
    const links = screen.getAllByTestId("pagination-link");

    links.forEach((link, i) => {
      if (link.textContent !== "..." || link.tagName.toLowerCase() !== "span") {
        const page = i + 1;
        // Because before this page box, it render the <span>...</span> spread box
        // where it hides extra pages boxes
        if (page === 9) {
          expect(link).toHaveAttribute("href", `https://www.test.com/${i + 2}`);
        } else {
          expect(link).toHaveAttribute("href", `https://www.test.com/${i + 1}`);
        }
      }
    });
  });
  describe("with showBtn", () => {
    test('with showBtn="previous"', () => {
      render(<Pagination totalPages={10} showBtn="previous" />);
      const children = Array.from(screen.getByTestId("pagination").children);

      expect(children).toHaveLength(10);
      expect(children[0].tagName.toLowerCase()).toBe("button");
      expect(children[0]).toHaveAttribute("data-testid", "pagination-btn-previous");
      expect(children[9].tagName.toLowerCase()).toBe("a");
      expect(children[9]).toHaveAttribute("data-testid", "pagination-link");
      expect(screen.queryByTestId("pagination-btn-next")).toBeNull();
    });
    test('with showBtn="next"', () => {
      render(<Pagination totalPages={10} showBtn="next" />);
      const children = Array.from(screen.getByTestId("pagination").children);

      expect(children).toHaveLength(10);
      expect(children[0].tagName.toLowerCase()).toBe("a");
      expect(children[0]).toHaveAttribute("data-testid", "pagination-link");
      expect(children[9].tagName.toLowerCase()).toBe("button");
      expect(children[9]).toHaveAttribute("data-testid", "pagination-btn-next");
      expect(screen.queryByTestId("pagination-btn-previous")).toBeNull();
    });
    test("with showBtn={false}", () => {
      render(<Pagination totalPages={10} showBtn={false} />);
      const children = Array.from(screen.getByTestId("pagination").children);

      expect(children).toHaveLength(9);
      expect(children[0].tagName.toLowerCase()).toBe("a");
      expect(children[0]).toHaveAttribute("data-testid", "pagination-link");
      expect(children[8].tagName.toLowerCase()).toBe("a");
      expect(children[8]).toHaveAttribute("data-testid", "pagination-link");
      expect(screen.queryByTestId("pagination-btn-previous")).toBeNull();
      expect(screen.queryByTestId("pagination-btn-next")).toBeNull();
    });
  });
  describe("onChange functionality", () => {
    test("basic functionality", () => {
      render(<Pagination totalPages={10} />);
      const children = Array.from(screen.getByTestId("pagination").children);

      expect(children[0]).toBeDisabled();

      children.slice(1, 5).forEach((child, i) => {
        userEvent.click(child);
        expect(child).toHaveClass("active");
        expect(child).toHaveFocus();
        expect(child).toHaveAttribute("href", `#${i + 1}`);
        expect(children[2].tagName.toLowerCase()).toBe("a");
        expect(children[8]).toHaveTextContent("...");
      });

      // children[5] && children[6] are on the same position, as the
      // nav "belt" is moving
      children.slice(5, 7).forEach((child, i) => {
        userEvent.click(children[5]);
        expect(children[5]).toHaveClass("active");
        expect(children[5]).toHaveFocus();
        expect(child).toHaveAttribute("href", `#${i + 5}`);

        const links = screen.getAllByTestId("pagination-link");
        expect(links[1].tagName.toLowerCase()).toBe("span");
        expect(links[7].tagName.toLowerCase()).toBe("span");
        expect(links[1]).toHaveTextContent("...");
        expect(links[7]).toHaveTextContent("...");
      });

      children.slice(7, 11).forEach(async (child, i) => {
        userEvent.click(child);
        await waitFor(() => {
          expect(child).toHaveClass("active");
          expect(child).toHaveFocus();
          expect(child).toHaveAttribute("href", `#${i + 7}`);
        });

        expect(children[2].tagName.toLowerCase()).toBe("span");
        expect(children[2]).toHaveTextContent("...");
        expect(children[8].tagName.toLowerCase()).toBe("a");
      });

      expect(children[children.length - 1]).toBeDisabled();
    });
    test("btn control", async () => {
      render(<Pagination totalPages={10} />);
      const children = Array.from(screen.getByTestId("pagination").children);

      const previousBtn = screen.getByTestId("pagination-btn-previous");
      const nextBtn = screen.getByTestId("pagination-btn-next");

      previousBtn.click();
      await waitFor(() => {
        expect(children[1]).toHaveClass("active");
      });
      expect(previousBtn).toBeDisabled();

      nextBtn.click();
      await waitFor(() => {
        expect(children[2]).toHaveClass("active");
      });

      previousBtn.click();
      await waitFor(() => {
        expect(children[1]).toHaveClass("active");
      });

      const largestPageNum = screen.getByText("10");
      largestPageNum.click();
      expect(largestPageNum).toHaveClass("active");
      expect(nextBtn).toBeDisabled();
    });
    test("onPageChanged", () => {
      let onPageChanged: any = jest.fn(e => e.target);
      const { rerender } = render(<Pagination totalPages={10} onPageChanged={e => onPageChanged(e)} />);
      const children = Array.from(screen.getByTestId("pagination").children);

      userEvent.click(children[3]);

      expect(children[3]).not.toHaveClass("active");
      expect(children[3]).toHaveFocus();

      expect(onPageChanged).toHaveBeenCalledTimes(1);
      expect(onPageChanged.mock.results[0].value.tagName.toLowerCase()).toBe("a");

      onPageChanged = jest.fn((_, page) => page);
      rerender(<Pagination totalPages={10} onPageChanged={(_, page) => onPageChanged(_, page)} />);

      userEvent.click(children[3]);

      expect(children[3]).not.toHaveClass("active");
      expect(children[3]).toHaveFocus();

      expect(onPageChanged).toHaveBeenCalledTimes(1);
      expect(onPageChanged.mock.results[0].value).toBe(3);

      // Click on spread page box
      userEvent.click(children[8]);

      expect(children[8]).not.toHaveClass("active");
      expect(children[8]).not.toHaveFocus();

      expect(onPageChanged).toHaveBeenCalledTimes(2);
      expect(onPageChanged.mock.results[1].value).toBe(6);
    });
  });
});
