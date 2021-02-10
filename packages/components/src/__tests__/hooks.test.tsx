import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/Button";
import { Base } from "../components/Input/__helpers__";
import { inputCustomRender } from "../components/Input/__helpers__/utils";
import { useClassnames, useInputId, useLocalStorage, UseLocalStorageOptions } from "../utils";

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

const TEST_USE_LOCAL_STORAGE_INITIAL = "Test initial value";
const TEST_USE_LOCAL_STORAGE_NEW_VALUE = "Test";

const TestUseLocalStorage: React.FC<Partial<UseLocalStorageOptions>> = ({ key = "test_key", initialValue }) => {
  const [storedValue, setStoredValue] = useLocalStorage({ key, initialValue });

  return (
    <>
      <Button onClick={() => setStoredValue(TEST_USE_LOCAL_STORAGE_NEW_VALUE)}>Click me!</Button>
      <div data-testid="div">{storedValue}</div>
    </>
  );
};

describe("useLocalStorage", () => {
  test("default behabiour", () => {
    render(<TestUseLocalStorage />);
    const div = screen.getByTestId("div");
    const btn = screen.getByTestId("btn");

    expect(div).toBeVisible();
    expect(div).toHaveTextContent("");
    expect(btn).toBeVisible();
    expect(btn.onclick).toBeDefined();
    expect(btn).toHaveTextContent("Click me!");
  });
  test("initialValue", async () => {
    render(<TestUseLocalStorage initialValue={TEST_USE_LOCAL_STORAGE_INITIAL} />);

    expect(screen.getByTestId("div")).toHaveTextContent(TEST_USE_LOCAL_STORAGE_INITIAL);
  });
  test("click <Button />", async () => {
    render(<TestUseLocalStorage />);
    const div = screen.getByTestId("div");
    const btn = screen.getByTestId("btn");

    expect(div).toBeVisible();
    expect(div).toHaveTextContent(TEST_USE_LOCAL_STORAGE_INITIAL);

    userEvent.click(btn);

    await waitFor(() => {
      expect(div).not.toHaveTextContent(TEST_USE_LOCAL_STORAGE_INITIAL);
      expect(div).toHaveTextContent(TEST_USE_LOCAL_STORAGE_NEW_VALUE);
    });
  });
});
