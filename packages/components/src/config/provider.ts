import { LiteralUnion, NumberLiteralUnion, ValueOf } from "../typings";
import { ConfigContextType } from "../utils";

export const DEFAULT_PORTAL_ID_SELECTOR = "portal";

export type GreyColorObj = {
  100: LiteralUnion<"#ffffff">;
  200: LiteralUnion<"#fafafa">;
  300: LiteralUnion<"#f5f5f5">;
  400: LiteralUnion<"#ebebeb">;
  500: LiteralUnion<"#d6d6d6">;
  600: LiteralUnion<"#c2c2c2">;
  700: LiteralUnion<"#999999">;
  800: LiteralUnion<"#666666">;
  900: LiteralUnion<"#333333">;
  1000: LiteralUnion<"#000000">;
};
export type GreyColor = ValueOf<GreyColorObj>;
export type PartialGreyColorObj = Partial<GreyColorObj>;

export type BlueColorObj = {
  100: LiteralUnion<"#cfcfff">;
  200: LiteralUnion<"#9c9cff">;
  300: LiteralUnion<"#6969ff">;
  400: LiteralUnion<"#3636ff">;
  500: LiteralUnion<"#0303ff">;
  600: LiteralUnion<"#0000cf">;
  700: LiteralUnion<"#00009c">;
  800: LiteralUnion<"#000069">;
  900: LiteralUnion<"#000036">;
};
export type BlueColor = ValueOf<BlueColorObj>;
export type PartialBlueColorObj = Partial<BlueColorObj>;

export type CyanColorObj = {
  100: LiteralUnion<"#ccffff">;
  200: LiteralUnion<"#99ffff">;
  300: LiteralUnion<"#66ffff">;
  400: LiteralUnion<"#33ffff">;
  500: LiteralUnion<"#00ffff">;
  600: LiteralUnion<"#00cccc">;
  700: LiteralUnion<"#009999">;
  800: LiteralUnion<"#006666">;
  900: LiteralUnion<"#003333">;
};
export type CyanColor = ValueOf<CyanColorObj>;
export type PartialCyanColorObj = Partial<CyanColorObj>;

export type GreenColorObj = {
  100: LiteralUnion<"#dbfff2">;
  200: LiteralUnion<"#a8ffe0">;
  300: LiteralUnion<"#75ffcd">;
  400: LiteralUnion<"#42ffbb">;
  500: LiteralUnion<"#0fffa8">;
  600: LiteralUnion<"#00db8c">;
  700: LiteralUnion<"#00a86b">;
  800: LiteralUnion<"#00754b">;
  900: LiteralUnion<"#00422a">;
};
export type GreenColor = ValueOf<GreenColorObj>;
export type PartialGreenColorObj = Partial<GreenColorObj>;

export type PurpleColorObj = {
  100: LiteralUnion<"#e0b5ff">;
  200: LiteralUnion<"#cb82ff">;
  300: LiteralUnion<"#b54fff">;
  400: LiteralUnion<"#a01cff">;
  500: LiteralUnion<"#8700e8">;
  600: LiteralUnion<"#6900b5">;
  700: LiteralUnion<"#4c0082">;
  800: LiteralUnion<"#2e004f">;
  900: LiteralUnion<"#10001c">;
};
export type PurpleColor = ValueOf<PurpleColorObj>;
export type PartialPurpleColorObj = Partial<PurpleColorObj>;

export type MagentaColorObj = {
  100: LiteralUnion<"#ffccff">;
  200: LiteralUnion<"#ff99ff">;
  300: LiteralUnion<"#ff66ff">;
  400: LiteralUnion<"#ff33ff">;
  500: LiteralUnion<"#ff00ff">;
  600: LiteralUnion<"#cc00cc">;
  700: LiteralUnion<"#990099">;
  800: LiteralUnion<"#660066">;
  900: LiteralUnion<"#330033">;
};
export type MagentaColor = ValueOf<MagentaColorObj>;
export type PartialMagentaColorObj = Partial<MagentaColorObj>;

export type YellowColorObj = {
  100: LiteralUnion<"#fff9cc">;
  200: LiteralUnion<"#fff399">;
  300: LiteralUnion<"#ffed66">;
  400: LiteralUnion<"#ffe733">;
  500: LiteralUnion<"#ffe100">;
  600: LiteralUnion<"#ccb400">;
  700: LiteralUnion<"#998700">;
  800: LiteralUnion<"#665a00">;
  900: LiteralUnion<"#332d00">;
};
export type YellowColor = ValueOf<YellowColorObj>;
export type PartialYellowColorObj = Partial<YellowColorObj>;

export type OrangeColorObj = {
  100: LiteralUnion<"#fff1e2">;
  200: LiteralUnion<"#ffd8af">;
  300: LiteralUnion<"#ffc07c">;
  400: LiteralUnion<"#ffa749">;
  500: LiteralUnion<"#ff8f16">;
  600: LiteralUnion<"#e27500">;
  700: LiteralUnion<"#af5b00">;
  800: LiteralUnion<"#7c4000">;
  900: LiteralUnion<"#492600">;
};
export type OrangeColor = ValueOf<OrangeColorObj>;
export type PartialOrangeColorObj = Partial<OrangeColorObj>;

export type VolcanoColorObj = {
  100: LiteralUnion<"#ffdacc">;
  200: LiteralUnion<"#ffb599">;
  300: LiteralUnion<"#ff9066">;
  400: LiteralUnion<"#ff6b33">;
  500: LiteralUnion<"#ff4600">;
  600: LiteralUnion<"#cc3800">;
  700: LiteralUnion<"#992a00">;
  800: LiteralUnion<"#661c00">;
  900: LiteralUnion<"#330e00">;
};
export type VolcanoColor = ValueOf<VolcanoColorObj>;
export type PartialVolcanoColorObj = Partial<VolcanoColorObj>;

export type BronzeColorObj = {
  100: LiteralUnion<"#f5e5d6">;
  200: LiteralUnion<"#ebcbad">;
  300: LiteralUnion<"#e1b184">;
  400: LiteralUnion<"#d7975b">;
  500: LiteralUnion<"#cd7d32">;
  600: LiteralUnion<"#a46428">;
  700: LiteralUnion<"#7b4b1e">;
  800: LiteralUnion<"#523214">;
  900: LiteralUnion<"#29190a">;
};
export type BronzeColor = ValueOf<BronzeColorObj>;
export type PartialBronzeColorObj = Partial<BronzeColorObj>;

export type RedColorObj = {
  100: LiteralUnion<"#ffcccc">;
  200: LiteralUnion<"#ff9999">;
  300: LiteralUnion<"#ff6666">;
  400: LiteralUnion<"#ff3333">;
  500: LiteralUnion<"#ff0000">;
  600: LiteralUnion<"#cc0000">;
  700: LiteralUnion<"#990000">;
  800: LiteralUnion<"#660000">;
  900: LiteralUnion<"#330000">;
};
export type RedColor = ValueOf<RedColorObj>;
export type PartialRedColorObj = Partial<RedColorObj>;

export type ColorSystemObj<T extends {} = Record<string, unknown>, P extends boolean = false> = {
  grey: P extends false ? GreyColorObj : PartialGreyColorObj;
  blue: P extends false ? BlueColorObj : PartialBlueColorObj;
  cyan: P extends false ? CyanColorObj : PartialCyanColorObj;
  green: P extends false ? GreenColorObj : PartialGreenColorObj;
  purple: P extends false ? PurpleColorObj : PartialPurpleColorObj;
  magenta: P extends false ? MagentaColorObj : PartialMagentaColorObj;
  yellow: P extends false ? YellowColorObj : PartialYellowColorObj;
  orange: P extends false ? OrangeColorObj : PartialOrangeColorObj;
  volcano: P extends false ? VolcanoColorObj : PartialVolcanoColorObj;
  bronze: P extends false ? BronzeColorObj : PartialBronzeColorObj;
  red: P extends false ? RedColorObj : PartialRedColorObj;
} & T;
export type PartialColorSystemObj<T extends {} = {}> = Partial<ColorSystemObj<T, true>>;

export type ColorSystem = ValueOf<ValueOf<ColorSystemObj>>;

export type ConfigCSSColor = ColorSystem | React.CSSProperties["color"];

type ConfigVariablesInput = {
  bg: ConfigCSSColor;
  width: React.CSSProperties["width"];
  disabledBg: ConfigCSSColor;
  borderWidth: React.CSSProperties["borderWidth"];
  borderColor: ConfigCSSColor;
  borderRadius: number;
};

type ConfigVariablesPortal = {
  shadow: React.CSSProperties["boxShadow"];
  selector: LiteralUnion<typeof DEFAULT_PORTAL_ID_SELECTOR>;
};

export type ConfigBreakpoint = {
  sm: NumberLiteralUnion<480>;
  md: NumberLiteralUnion<600>;
  lg: NumberLiteralUnion<992>;
  xl: NumberLiteralUnion<1200>;
};

export type ConfigVariables<
  T extends {} = Record<string, unknown>,
  B extends {} = Record<string, unknown>,
  P extends boolean = false
> = {
  primary: ConfigCSSColor;
  secondary: ConfigCSSColor;
  input: P extends false ? ConfigVariablesInput : Partial<ConfigVariablesInput>;
  errorColor: ConfigCSSColor;
  successColor: ConfigCSSColor;
  portal: P extends false ? ConfigVariablesPortal : Partial<ConfigVariablesPortal>;
  breakpoints: P extends false ? ConfigBreakpoint & B : Partial<ConfigBreakpoint> & B;
} & T;
export type PartialConfigVariables<T extends {} = Record<string, unknown>, B extends {} = Record<string, unknown>> = Partial<
  ConfigVariables<T, B, true>
>;

export type ConfigFontWeight<T extends {} = Record<string, number>> = {
  light: NumberLiteralUnion<300>;
  normal: NumberLiteralUnion<400>;
  semibold: NumberLiteralUnion<500>;
  bold: NumberLiteralUnion<600>;
} & T;

export const configDefaultFontSizes = ["12px", "14px", "16px", "20px", "24px", "32px", "40px", "48px"];
export type ConfigFontSize = LiteralUnion<typeof configDefaultFontSizes[number], React.CSSProperties["fontSize"]>[];

export const configDefaultColors: ConfigContextType["colors"] = {
  grey: {
    100: "#ffffff",
    200: "#fafafa",
    300: "#f5f5f5",
    400: "#ebebeb",
    500: "#d6d6d6",
    600: "#c2c2c2",
    700: "#999999",
    800: "#666666",
    900: "#333333",
    1000: "#000000",
  },
  blue: {
    100: "#cfcfff",
    200: "#9c9cff",
    300: "#6969ff",
    400: "#3636ff",
    500: "#0303ff",
    600: "#0000cf",
    700: "#00009c",
    800: "#000069",
    900: "#000036",
  },
  cyan: {
    100: "#ccffff",
    200: "#99ffff",
    300: "#66ffff",
    400: "#33ffff",
    500: "#00ffff",
    600: "#00cccc",
    700: "#009999",
    800: "#006666",
    900: "#003333",
  },
  green: {
    100: "#dbfff2",
    200: "#a8ffe0",
    300: "#75ffcd",
    400: "#42ffbb",
    500: "#0fffa8",
    600: "#00db8c",
    700: "#00a86b",
    800: "#00754b",
    900: "#00422a",
  },
  purple: {
    100: "#e0b5ff",
    200: "#cb82ff",
    300: "#b54fff",
    400: "#a01cff",
    500: "#8700e8",
    600: "#6900b5",
    700: "#4c0082",
    800: "#2e004f",
    900: "#10001c",
  },
  magenta: {
    100: "#ffccff",
    200: "#ff99ff",
    300: "#ff66ff",
    400: "#ff33ff",
    500: "#ff00ff",
    600: "#cc00cc",
    700: "#990099",
    800: "#660066",
    900: "#330033",
  },
  yellow: {
    100: "#fff9cc",
    200: "#fff399",
    300: "#ffed66",
    400: "#ffe733",
    500: "#ffe100",
    600: "#ccb400",
    700: "#998700",
    800: "#665a00",
    900: "#332d00",
  },
  orange: {
    100: "#fff1e2",
    200: "#ffd8af",
    300: "#ffc07c",
    400: "#ffa749",
    500: "#ff8f16",
    600: "#e27500",
    700: "#af5b00",
    800: "#7c4000",
    900: "#492600",
  },
  volcano: {
    100: "#ffdacc",
    200: "#ffb599",
    300: "#ff9066",
    400: "#ff6b33",
    500: "#ff4600",
    600: "#cc3800",
    700: "#992a00",
    800: "#661c00",
    900: "#330e00",
  },
  bronze: {
    100: "#f5e5d6",
    200: "#ebcbad",
    300: "#e1b184",
    400: "#d7975b",
    500: "#cd7d32",
    600: "#a46428",
    700: "#7b4b1e",
    800: "#523214",
    900: "#29190a",
  },
  red: {
    100: "#ffcccc",
    200: "#ff9999",
    300: "#ff6666",
    400: "#ff3333",
    500: "#ff0000",
    600: "#cc0000",
    700: "#990000",
    800: "#660000",
    900: "#330000",
  },
};
