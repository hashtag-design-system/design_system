import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SwiperCol } from "../index";

const TEST_MAX = 10;

describe("TimePicker <SwiperCol />", () => {
  test("default behaviour", () => {
    render(<SwiperCol />);
    const container = screen.getByTestId("time-picker-item-container");
    const parentElement = container.parentElement;
    const input = screen.getByTestId("input-number");
    const timePicker = screen.getByTestId("time-picker");
    const timePickerItems = screen.getAllByTestId("time-picker-item");

    expect(container).toBeVisible();
    expect(container).toHaveAttribute("class");
    expect(container.children).toHaveLength(1);
    expect(container).toContainElement(input);
    expect(parentElement).toHaveStyle("position: relative;");
    expect(parentElement?.children).toHaveLength(2);

    expect(input).toBeInTheDocument();
    expect(input).toHaveStyle("opacity: 0;");
    expect(input).toHaveAttribute("class");
    expect(input).toHaveAttribute("style");
    expect(input.onfocus).toBeDefined();
    expect(input.onblur).toBeDefined();
    expect(input.onchange).toBeDefined();

    const timePickerChildren = timePicker.children;
    expect(timePicker).toBeVisible();
    expect(timePicker).toHaveAttribute("class");
    expect(timePicker.style[0]).toContain("--height");
    expect(timePickerChildren).toHaveLength(1);
    // Except from the slides, additioncal slides are added due to loopAdditionalSlides
    expect(timePickerChildren[0].children.length).toBeGreaterThan(60);
    expect(timePickerItems.length).toBeGreaterThan(60);
    timePickerItems.forEach(item => {
      expect(item).toHaveAttribute("class");
      expect(item.textContent).toBeDefined();
      expect(timePicker).toContainElement(item);
    });
  });
  test.each([true, false])("useEffect slide animation & with mobileView", async mobileView => {
    const onSlideChange = jest.fn(swiper => swiper.realIndex);
    render(<SwiperCol onSlideChange={onSlideChange} mobileView={mobileView} />);

    const results = onSlideChange.mock.results;
    expect(onSlideChange).toHaveBeenCalled();

    if (mobileView) {
      expect(results[results.length - 1].value).not.toBe(0);

      await waitFor(
        () => {
          expect(results[results.length - 1].value).toBe(0);
        },
        { timeout: 2500 }
      );
    } else {
      expect(results[results.length - 1].value).toBe(0);
    }
  }, 10000);
  test("with onFocus and onBlur input", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    // Use the "max" Prop, so not to take additional time, for 60 items, and have memory leaks!
    render(<SwiperCol max={TEST_MAX} inputProps={{ onFocus, onBlur }} />);
    const input = screen.getByTestId("input-number");
    const testItem = screen.getAllByTestId("time-picker-item").find(item => item.textContent === "00");

    userEvent.tab();

    expect(input).toHaveFocus();
    expect(input).toHaveStyle("opacity: 1;");

    expect(onFocus).toHaveBeenCalled();

    userEvent.click(testItem!);

    expect(onBlur).toHaveBeenCalled();
    expect(input).not.toHaveFocus();
  });
  describe("onChange input", () => {
    test("with onChange and with onSlideChange input", () => {
      const onChange = jest.fn();
      const onSlideChange = jest.fn(swiper => swiper.realIndex);
      render(<SwiperCol max={TEST_MAX} inputProps={{ onChange }} onSlideChange={onSlideChange} />);
      const input = screen.getByTestId("input-number");

      expect(onSlideChange).toHaveBeenCalled();
      expect(onSlideChange).toHaveLastReturnedWith(expect.any(Number));

      const testVal = 5;
      userEvent.type(input, testVal.toString());

      expect(input).toHaveFocus();
      expect(input).toHaveStyle("opacity: 1;");
      expect(input).toHaveValue(testVal);
      expect(onChange).toHaveBeenCalled();
      expect(onSlideChange).toHaveLastReturnedWith(testVal);
    });
    test.each(["", 0, 0o0])("with NaN and 0 and 00", testVal => {
      const onSlideChange = jest.fn(swiper => swiper.realIndex);
      render(<SwiperCol max={TEST_MAX} onSlideChange={onSlideChange} />);
      const input = screen.getByTestId("input-number");

      userEvent.type(input, testVal.toString());

      expect(input).toHaveFocus();
      expect(input).toHaveStyle("opacity: 1;");
      expect(input).toHaveValue(testVal !== "" ? testVal : null);
      expect(onSlideChange).toHaveBeenCalled();
      // All these values should return the same
      expect(onSlideChange).toHaveReturnedWith(0);
    });
  });
  describe("slide to clicked slide", () => {
    test("click on previous (above)", () => {
      const onSlideChange = jest.fn(swiper => swiper.realIndex);
      render(<SwiperCol max={TEST_MAX} onSlideChange={onSlideChange} />);
      const items = screen.getAllByTestId("time-picker-item");
      const lastNum = TEST_MAX - 1;
      const testItem = items.find(item => item.textContent === "0" + lastNum.toString());

      userEvent.click(testItem!);

      const results = onSlideChange.mock.results;
      expect(onSlideChange).toHaveBeenCalled();
      expect(results[results.length - 1].value).toBe(lastNum);
    });
    test("click on next", () => {
      const onSlideChange = jest.fn(swiper => swiper.realIndex);
      render(<SwiperCol max={TEST_MAX} onSlideChange={onSlideChange} />);
      const testItem = screen.getAllByTestId("time-picker-item")[1];

      userEvent.click(testItem);

      const results = onSlideChange.mock.results;
      expect(onSlideChange).toHaveBeenCalled();
      expect(results[results.length - 1].value).toBe(parseInt(testItem.textContent || "0"));
    });
  });
});
