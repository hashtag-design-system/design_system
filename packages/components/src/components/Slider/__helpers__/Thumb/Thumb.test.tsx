import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { defaultProps, sliderCustomRender } from "../utils";
import { FProps as ThumbFProps, Thumb } from "./Thumb";

const TEST_COMPONENT: React.FunctionComponent<Partial<ThumbFProps>> = ({
  thumb = { defaultValue: 10 },
  size = 24,
  value = 30,
  ...props
}) => {
  return <Thumb size={size} value={value} thumb={thumb} {...props} />;
};

describe("Slider <Thumb />", () => {
  test("default behaviour", () => {
    sliderCustomRender(<TEST_COMPONENT />);
    const thumb = screen.getByTestId("slider-thumb");
    const thumbValue = screen.getByTestId("slider-thumb-value");

    expect(thumb).toBeVisible();
    expect(thumb.children).toHaveLength(1);
    expect(thumb).toMatchSnapshot();
    expect(thumb).toHaveAttribute("class");
    expect(thumb).toHaveAttribute("tabindex", "0");
    expect(thumb.style.width).toContain("24");
    expect(thumb.style.height).toContain("24");
    expect(thumb.style.left).toBeDefined();
    expect(thumbValue).toBeVisible();
    expect(thumbValue).toHaveAttribute("class");
    expect(thumbValue).toHaveTextContent("30");
  });
  test("with onHover={true}", () => {
    sliderCustomRender(<TEST_COMPONENT onHover />);

    expect(screen.getByTestId("slider-thumb")).toHaveClass("hover");
  });
  test("with focusVisible={true}", () => {
    sliderCustomRender(<TEST_COMPONENT focusVisible />);

    expect(screen.getByTestId("slider-thumb")).toHaveClass("focus-visible");
  });
  test("with custom className", () => {
    sliderCustomRender(<TEST_COMPONENT className="right" />);
    const thumb = screen.getByTestId("slider-thumb");

    expect(thumb).toHaveClass("right");
    expect(thumb.style.right).toBeDefined();
    expect(thumb.style.left).toBe("");
    expect(screen.getByTestId("slider-thumb-value")).toHaveTextContent(String(parseFloat(defaultProps.max!.toString()) - 30));
  });
  test("with custom className", () => {
    sliderCustomRender(
      <TEST_COMPONENT value={10} thumb={{ defaultValue: 10, formatRegExp: { searchValue: new RegExp(/0/), replaceValue: "" } }} />
    );

    expect(screen.getByTestId("slider-thumb-value")).toHaveTextContent("1");
    expect(screen.getByTestId("slider-thumb")).toMatchSnapshot();
  });
  test("with onMouserOver custom event", () => {
    const onMouseOver = jest.fn((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.currentTarget.dataset);
    sliderCustomRender(<TEST_COMPONENT onMouseOver={e => onMouseOver(e)} />);
    const thumb = screen.getByTestId("slider-thumb");

    expect(thumb.onmouseover).toBeDefined();

    userEvent.hover(thumb);

    expect(onMouseOver).toHaveBeenCalledTimes(1);
    expect(onMouseOver.mock.results[0].value["testid"]).toBe("slider-thumb");
  });
});
