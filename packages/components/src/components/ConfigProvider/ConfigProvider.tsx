import React, { useMemo, useState } from "react";
import { ConfigCSSColor, configDefaultColors, configDefaultFontSizes } from "../../config";
import { ConfigContextProvider, ConfigContextType, OmitConfigContextType, PartialConfigContextType } from "../../utils";

const primaryColor = configDefaultColors.blue["500"];
const inputGreyColor = configDefaultColors.grey["500"];

export const configDefaultValues: OmitConfigContextType = {
  mode: "light",
  colors: configDefaultColors,
  variables: {
    primary: primaryColor,
    secondary: primaryColor,
    input: {
      bg: configDefaultColors.grey["200"],
      disabledBg: inputGreyColor,
      width: "13.5em",
      borderWidth: "1px",
      borderColor: inputGreyColor,
      borderRadius: 8,
    },
    errorColor: configDefaultColors.red["600"],
    successColor: configDefaultColors.green["700"],
    portal: {
      shadow: "0px 2px 16px rgba(0, 0, 0, 20%)",
      selector: "portal",
    },
    breakpoints: {
      xs: 420,
      sm: 600,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  fontWeights: {
    light: 300,
    normal: 400,
    semibold: 500,
    bold: 600,
  },
  fontSizes: configDefaultFontSizes,
};

// Found in the ../../utils/contexts/ConfigContext
export type FProps<
  C extends {} = Record<string, unknown>,
  V extends {} = Record<string, unknown>,
  VB extends {} = Record<string, unknown>,
  FW extends {} = Record<string, number>
> = PartialConfigContextType<C, V, VB, FW> & { children?: React.ReactNode };

function ConfigProvider<T extends FProps = FProps>({ mode, colors, variables, fontWeights, fontSizes, children }: T) {
  const {
    mode: defaultMode,
    colors: defaultColors,
    variables: defaultVariables,
    fontWeights: defaultFontWeights,
    fontSizes: defaultFontSizes,
  } = configDefaultValues;

  const fColors = useMemo((): ConfigContextType["colors"] => {
    if (colors) {
      const { grey, blue, cyan, green, purple, magenta, orange, yellow, volcano, bronze, red, ...restColors } = colors;
      const mainColors = Object.entries(defaultColors).map(color => {
        const key = color[0];
        // defaultColors are typeof Record<string, object>
        return {
          [key]: {
            ...(defaultColors[key] as object),
            ...(colors[key] as object),
          },
        };
      });
      const result = Object.assign({}, ...mainColors);

      return {
        ...result,
        ...restColors,
      };
    }
    return defaultColors;
  }, [colors, defaultColors]);

  const fVariables = useMemo((): ConfigContextType["variables"] => {
    if (variables) {
      const { primary, secondary, breakpoints, errorColor, successColor, input, portal, ...restVariables } = variables;
      return {
        primary: primary || defaultVariables.primary,
        secondary: secondary || defaultVariables.secondary,
        breakpoints: { ...defaultVariables.breakpoints, ...breakpoints },
        errorColor: errorColor || defaultVariables.errorColor,
        successColor: successColor || defaultVariables.successColor,
        input: {
          ...defaultVariables.input,
          ...input,
        },
        portal: {
          ...defaultVariables.portal,
          ...portal,
        },
        ...restVariables,
      };
    }
    return defaultVariables;
  }, [variables, defaultVariables]);

  const fFontWeights = useMemo((): ConfigContextType["fontWeights"] => {
    if (fontWeights) {
      const { light, normal, semibold, bold, ...restFontWeights } = fontWeights;
      return {
        light: light || defaultFontWeights.light,
        normal: normal || defaultFontWeights.normal,
        semibold: semibold || defaultFontWeights.semibold,
        bold: bold || defaultFontWeights.bold,
        ...restFontWeights,
      };
    }
    return defaultFontWeights;
  }, [fontWeights, defaultFontWeights]);

  const [value, setValue] = useState<OmitConfigContextType>({
    mode: mode || defaultMode,
    colors: fColors,
    variables: fVariables,
    fontSizes: defaultFontSizes.concat(fontSizes || []),
    fontWeights: fFontWeights,
  });

  return <ConfigContextProvider value={{ ...value, setValue }}>{children}</ConfigContextProvider>;
}

export default ConfigProvider;
