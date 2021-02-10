import { configDefaultValues } from "../../components/ConfigProvider";
import {
  ColorSystemObj,
  ConfigCSSColor,
  ConfigFontSize,
  ConfigFontWeight,
  ConfigVariables,
  PartialColorSystemObj,
  PartialConfigVariables,
} from "../../config";
import { createCtx } from "../index";

type RecordUnknown = Record<string, unknown>;

export type ConfigContextType<
  C extends {} = RecordUnknown,
  V extends {} = RecordUnknown,
  VB extends {} = RecordUnknown,
  FW extends {} = RecordUnknown,
  P extends boolean = false
> = {
  // mode: "light" | "dark",
  mode: "light";
  colors: P extends false ? ColorSystemObj<C> : PartialColorSystemObj<C>;
  variables: P extends false ? ConfigVariables<V, VB> : PartialConfigVariables<V, VB>;
  fontWeights: P extends false ? ConfigFontWeight<FW> : Partial<ConfigFontWeight<FW>>;
  fontSizes: ConfigFontSize;
  setValue: React.Dispatch<React.SetStateAction<Omit<ConfigContextType, "setValue">>>;
};

export type PartialConfigContextType<
  C extends {} = Record<string, ConfigCSSColor>,
  V extends {} = RecordUnknown,
  VB extends {} = RecordUnknown,
  FW extends {} = Record<string, number>
> = Partial<ConfigContextType<C, V, VB, FW, true>>;
export type OmitConfigContextType<T extends {} = ConfigContextType> = Omit<T, "setValue">;

export const [ConfigContextProvider, useConfigContext] = createCtx<ConfigContextType>(configDefaultValues as any);
