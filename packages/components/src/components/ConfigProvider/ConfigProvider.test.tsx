import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { configDefaultColors, configDefaultFontSizes } from "../../config";
import { ConfigContextType, useConfigContext } from "../../utils";
import Button from "../Button";
import ConfigProvider, { configDefaultValues, ConfigProviderFProps } from "./index";

const TEST_ADD_FONT_SIZE = "50px";

type ChildrenProps = { onContext?: (context: ConfigContextType) => void };

const TestConfigProviderChildren: React.FC<ChildrenProps> = ({ onContext }) => {
  const context = useConfigContext();

  useEffect(() => {
    if (onContext) onContext(context);
  }, [context, onContext]);

  return (
    <Button onClick={() => context.setValue(({ fontSizes, ...rest }) => ({ ...rest, fontSizes: [...fontSizes, TEST_ADD_FONT_SIZE] }))}>
      Click me
    </Button>
  );
};

type ProviderProps = ChildrenProps & ConfigProviderFProps;

const TestConfigProvider: React.FC<ProviderProps> = ({ onContext, ...props }) => {
  return (
    <ConfigProvider {...props}>
      <TestConfigProviderChildren onContext={onContext} />
    </ConfigProvider>
  );
};

describe("<ConfigProvider />", () => {
  test("default behaviour", () => {
    const onContext = jest.fn();
    render(<TestConfigProvider onContext={onContext} />);

    const children = document.body.children;
    expect(children).toHaveLength(1);
    expect(children[0].children).toHaveLength(1);
    expect(onContext).toHaveBeenCalledTimes(1);
  });
  test("get mode", () => {
    const onContext = jest.fn((mode: ConfigContextType["mode"]) => mode);
    render(<TestConfigProvider onContext={({ mode }) => onContext(mode)} />);

    expect(onContext).toHaveBeenCalledTimes(1);
    expect(onContext).toHaveLastReturnedWith("light");
  });
  test("setValue | fontSizes", () => {
    const onContext = jest.fn((fontSizes: ConfigContextType["fontSizes"]) => fontSizes);
    render(<TestConfigProvider onContext={({ fontSizes }) => onContext(fontSizes)} />);
    const btn = screen.getByTestId("btn");

    expect(btn).toBeVisible();
    expect(btn).toHaveTextContent("Click me");
    expect(btn.onclick).toBeDefined();
    expect(btn.children).toHaveLength(0);
    expect(onContext).toHaveBeenCalledTimes(1);

    userEvent.click(btn);

    const results = onContext.mock.results;
    expect(onContext).toHaveBeenCalledTimes(2);
    expect(results[results.length - 1].value).toStrictEqual(configDefaultFontSizes.concat(TEST_ADD_FONT_SIZE));
  });
  describe("colors", () => {
    test("default functionality", () => {
      const onContext = jest.fn((colors: ConfigContextType["colors"]) => colors);
      render(<TestConfigProvider onContext={({ colors }) => onContext(colors)} />);

      expect(onContext).toHaveBeenCalledTimes(1);
      const results = onContext.mock.results;
      const entries = Object.entries(results[results.length - 1].value);
      const defaultColors = Object.entries(configDefaultColors);
      expect(entries).toHaveLength(defaultColors.length);
      entries.forEach((entry, i) => {
        const key = entry["0"];
        const value = entry["1"];
        expect(key).toBe(defaultColors[i]["0"]);
        expect(value).toStrictEqual(defaultColors[i]["1"]);
      });
    });
    test("with extra color object", () => {
      const onContext = jest.fn((colors: ConfigContextType["colors"]) => colors);
      const testVal = { brand: { me: "hey" } };
      render(<TestConfigProvider colors={{ ...testVal }} onContext={({ colors }) => onContext(colors)} />);

      expect(onContext).toHaveBeenCalledTimes(1);
      const mockResults = onContext.mock.results;
      const results = mockResults[mockResults.length - 1].value;
      expect(Object.entries(results)).toHaveLength(Object.entries(configDefaultColors).length + 1);

      const testResults = results["brand"];
      expect(testResults).toBeDefined();
      expect(testResults).toStrictEqual(testVal.brand);
      expect(Object.entries(testResults)).toHaveLength(Object.entries(testVal).length);
    });
    test.each([true, false])("with extra color & override color", override => {
      const onContext = jest.fn((colors: ConfigContextType["colors"]) => colors);
      const testVal = [override ? "100" : "150", "blue"];
      render(<TestConfigProvider colors={{ grey: { [testVal[0]]: testVal[1] } }} onContext={({ colors }) => onContext(colors)} />);

      expect(onContext).toHaveBeenCalledTimes(1);
      const mockResults = onContext.mock.results;
      const results = mockResults[mockResults.length - 1].value;
      expect(Object.entries(results["grey"])).toHaveLength(Object.entries(configDefaultColors["grey"]).length + (override ? 0 : 1));

      const testResults = results["grey"][testVal[0]];
      expect(testResults).toBeDefined();
      expect(testResults).toBe(testVal[1]);
    });
  });
  describe("fontSizes", () => {
    type ConfigFontSizesType = ConfigContextType["fontSizes"];
    test("default functionality", () => {
      const onContext = jest.fn((fontSizes: ConfigFontSizesType) => fontSizes);
      render(<TestConfigProvider onContext={({ fontSizes }) => onContext(fontSizes)} />);

      expect(onContext).toHaveBeenCalledTimes(1);
      const mockResults = onContext.mock.results;
      const results = mockResults[mockResults.length - 1].value as ConfigFontSizesType;
      expect(results).toHaveLength(configDefaultFontSizes.length);
      results.forEach((result, i) => {
        expect(result).toBe(configDefaultFontSizes[i]);
      });
    });
    test.each([true, false])("with one & multiple extra fontSize(s)", multiple => {
      const onContext = jest.fn((fontSizes: ConfigFontSizesType) => fontSizes);
      const testVal = multiple ? ["8px", "50px"] : ["8px"];
      const length = testVal.length;
      render(<TestConfigProvider fontSizes={testVal} onContext={({ fontSizes }) => onContext(fontSizes)} />);

      expect(onContext).toHaveBeenCalledTimes(1);
      const mockResults = onContext.mock.results;
      const results = mockResults[mockResults.length - 1].value as ConfigFontSizesType;
      expect(results).toHaveLength(configDefaultFontSizes.length + length);
      results.forEach((result, i) => {
        expect(result).toBe(configDefaultFontSizes[i] || testVal[i - results.length + length]);
      });
    });
  });
  describe("fontWeights", () => {
    type ConfigFontWeightsType = ConfigContextType["fontWeights"];
    test("default functionality", () => {
      const onContext = jest.fn((fontWeights: ConfigFontWeightsType) => fontWeights);
      render(<TestConfigProvider onContext={({ fontWeights }) => onContext(fontWeights)} />);

      expect(onContext).toHaveBeenCalledTimes(1);
      const mockResults = onContext.mock.results;
      const results = mockResults[mockResults.length - 1].value as ConfigFontWeightsType;
      const entries = Object.entries(results);
      const defaultEntries = Object.entries(configDefaultValues.fontWeights);
      expect(entries).toHaveLength(defaultEntries.length);

      entries.forEach((entry, i) => {
        const key = entry[0];
        const value = entry[1];
        expect(key).toBe(defaultEntries[i]["0"]);
        expect(value).toBe(defaultEntries[i]["1"]);
      });
    });
    test.each([true, false])("with extra fontWeight & override fontWeight", override => {
      const onContext = jest.fn((fontWeights: ConfigFontWeightsType) => fontWeights);
      const testVal: Partial<ConfigFontWeightsType> = override ? { bold: 700 } : { lightbold: 450 };
      render(<TestConfigProvider fontWeights={{ ...(testVal as any) }} onContext={({ fontWeights }) => onContext(fontWeights)} />);

      expect(onContext).toHaveBeenCalledTimes(1);
      const mockResults = onContext.mock.results;
      const results = mockResults[mockResults.length - 1].value;
      expect(Object.entries(results)).toHaveLength(Object.entries(configDefaultValues["fontWeights"]).length + (override ? 0 : 1));

      const testResults = results[Object.keys(testVal)[0]];
      expect(testResults).toBeDefined();
      expect(testResults).toBe(Object.values(testVal)[0]);
    });
  });
  describe("variables", () => {
    type ConfigVariablesType = ConfigContextType["variables"];
    test("default functionality", () => {
      const onContext = jest.fn((variables: ConfigVariablesType) => variables);
      render(<TestConfigProvider onContext={({ variables }) => onContext(variables)} />);

      expect(onContext).toHaveBeenCalledTimes(1);
      const results = onContext.mock.results;
      const entries = Object.entries(results[results.length - 1].value);
      const defaultVariables = Object.entries(configDefaultValues.variables);
      expect(entries).toHaveLength(defaultVariables.length);

      entries.forEach((entry, i) => {
        const key = entry["0"];
        const value = entry["1"];
        expect(key).toBe(defaultVariables[i]["0"]);
        expect(value).toStrictEqual(defaultVariables[i]["1"]);
      });
    });
    test.each([
      { property: "primary", override: "orangered" },
      { property: "secondary", override: "blueviolet" },
      { property: "errorColor", override: "red" },
      { property: "successColor", override: "green" },
    ])("override single property", ({ property, override }) => {
      const onContext = jest.fn((variables: ConfigVariablesType) => variables[property]);
      const testVal = override;
      render(<TestConfigProvider variables={{ [property]: testVal }} onContext={({ variables }) => onContext(variables)} />);

      expect(onContext).toHaveBeenCalledTimes(1);
      const mockResults = onContext.mock.results;
      const results = mockResults[mockResults.length - 1].value;
      expect(results).toBe(testVal);
    });
    test.each([true, false])("with extra breakpoints & override breakpoints", override => {
      const onContext = jest.fn((variables: ConfigVariablesType) => variables["breakpoints"]);
      const testVal: Partial<ConfigVariablesType["breakpoints"]> = override ? { lg: 700 } : { xxl: 200 };
      render(<TestConfigProvider variables={{ breakpoints: testVal }} onContext={({ variables }) => onContext(variables)} />);

      expect(onContext).toHaveBeenCalledTimes(1);
      const mockResults = onContext.mock.results;
      const results = mockResults[mockResults.length - 1].value;
      expect(Object.entries(results)).toHaveLength(
        Object.entries(configDefaultValues["variables"]["breakpoints"]).length + (override ? 0 : 1)
      );

      const testResults = results[Object.keys(testVal)[0]];
      expect(testResults).toBeDefined();
      expect(testResults).toBe(Object.values(testVal)[0]);
    });
    describe.each([
      { name: "portal", overrides: [1, 2] },
      { name: "input", overrides: [2, 7] },
    ])("override portal & input", ({ name, overrides }) => {
      test.each(overrides)("some & all override(s) in portal", overrideLength => {
        const onContext = jest.fn((variables: ConfigVariablesType) => variables[name]);
        const testVal = () => {
          let testVal = {};
          if (name === "input") {
            testVal =
              overrideLength === 2
                ? { bg: "blue", borderRadius: 50 }
                : { bg: "blue", disabledBg: "red", borderColor: "grey", borderRadius: 12, borderWidth: 4, width: 200 };
          } else {
            testVal = overrideLength === 1 ? { selector: "modal-root" } : { selector: "modal-root", shadow: "50" };
          }
          return testVal;
        };
        render(<TestConfigProvider variables={{ [name]: testVal() }} onContext={({ variables }) => onContext(variables)} />);

        expect(onContext).toHaveBeenCalledTimes(1);
        const mockResults = onContext.mock.results;
        const results = mockResults[mockResults.length - 1].value;
        const defaultValues = configDefaultValues["variables"][name] as object;
        expect(Object.entries(results)).toHaveLength(Object.entries(defaultValues).length);

        expect(results).toStrictEqual({
          ...defaultValues,
          ...testVal(),
        });
      });
    });
  });
});
