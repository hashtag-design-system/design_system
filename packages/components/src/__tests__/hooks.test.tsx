import { render, screen } from "@testing-library/react";
import { Base } from "../components/Input/__helpers__";
import { inputCustomRender } from "../components/Input/__helpers__/utils";
import { useClassnames, useInputId } from "../utils/hooks";

const TestComponent: React.FunctionComponent<React.ComponentProps<"input"> & { state?: "basic" | "hover" | "pressed" }> = ({
  state,
  ...props
}) => {
  const id = useInputId(props.id);
  const [classNames, rest] = useClassnames("input", props, { stateToRemove: { state, defaultState: "basic" } });

  return (
    <div>
      <input id={id} className={classNames} data-testid="input" {...rest} />
    </div>
  );
};

describe("useClassNames", () => {
  test("default functionality", () => {
    inputCustomRender(<Base />, { providerProps: { className: "custom-className" } });
    const input = screen.getByTestId("input");

    expect(input).toHaveClass("custom-className");
  });
  test("with stateToRemove option", () => {
    inputCustomRender(<Base />, { providerProps: { state: "default" } });
    const input = screen.getByTestId("input");

    expect(input).not.toHaveClass("default");

    inputCustomRender(<Base />, { providerProps: { state: "focus" } });

    expect(input).not.toHaveClass("focus");
  });
  test("with stateToRemove option, with custom defaultState", () => {
    render(<TestComponent state="basic" />);
    const input = screen.getByTestId("input");

    expect(input).not.toHaveClass("basic");
  });
});
describe("useInputId", () => {
  test("default behaviour", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("input");

    expect(input).toHaveAttribute("id");
    expect(input.id).toHaveLength(5);
  });
  test("with predefined id Prop passed", () => {
    const customId = "inputCustomId";
    render(<TestComponent id={customId} />);
    const input = screen.getByTestId("input");

    expect(input).toHaveAttribute("id");
    expect(input.id).toHaveLength(customId.length);
    expect(input.id).toBe(customId);
    expect(input).toMatchSnapshot();
  });
});
describe("useDisabled", () => {
  test('state="disabled"', () => {
    inputCustomRender(<Base />, { providerProps: { state: "disabled" } });
    const input = screen.getByTestId("input");

    expect(input).toHaveClass("disabled");
    expect(input).toBeDisabled();
    expect(input.getAttribute("aria-disabled")).toBeTruthy();
  });
  test('aria-disabled="true"', () => {
    inputCustomRender(<Base />, { providerProps: { "aria-disabled": true } });
    const input = screen.getByTestId("input");

    expect(input).toBeDisabled();
    expect(input.getAttribute("aria-disabled")).toBeTruthy();
  });
  test("disabled={true}", () => {
    inputCustomRender(<Base />, { providerProps: { disabled: true } });
    const input = screen.getByTestId("input");

    expect(input).toBeDisabled();
    expect(input.getAttribute("aria-disabled")).toBeTruthy();
  });
});
