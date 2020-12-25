import { screen } from "@testing-library/react";
import { defaultProps, sliderCustomRender } from "../utils";
import { Marks } from "./Marks";

const defaultMarks = defaultProps.marks!;

describe("Slider <Marks />", () => {
  test("default behaviour", () => {
    sliderCustomRender(<Marks />);
    const marks = screen.queryAllByTestId("slider-mark");
    const marksContainer = screen.getByTestId("slider-marks-container");

    const defaultMarks = defaultProps.marks!;
    expect(marksContainer).toBeVisible();
    expect(marksContainer.children).toHaveLength(defaultMarks.length);
    expect(marks).toHaveLength(defaultMarks.length);
    marks.forEach((mark, i) => {
      const { left, right } = mark.style;
      expect(mark).toHaveAttribute("class");
      expect(left).toBeDefined();
      expect(right).toBe("");
      if (defaultMarks[i].label) {
        expect(mark).toHaveTextContent(defaultMarks[i].label!);
      } else {
        expect(mark).toHaveTextContent("");
      }
    });
  });
  test("with zeroPercentageOnEdgeMarks={true}", () => {
    sliderCustomRender(<Marks />, { providerProps: { zeroPercentageOnEdgeMarks: true } });
    const marks = screen.queryAllByTestId("slider-mark");

    marks.forEach((mark, i) => {
      const { left, right } = mark.style;
      expect(mark).toHaveAttribute("class");
      expect(left).toBeDefined();
      expect(right).toBeDefined();
      if (defaultMarks[i].label) {
        expect(mark).toHaveTextContent(defaultMarks[i].label!);
      } else {
        expect(mark).toHaveTextContent("");
      }
    });
    expect(marks[0].style.right).toBe("0%");
    expect(marks[defaultMarks.length - 1].style.left).toBe("");
  });
});
