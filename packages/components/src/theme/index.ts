import { extendTheme, ThemeComponents, ThemeConfig } from "@chakra-ui/react";
import { FormLabel } from "./components/Form";
import { Input, NumberInput, Textarea } from "./components/Input";


const config: ThemeConfig = {
  cssVarPrefix: "hashtag",
  // initialColorMode: "dark",
  useSystemColorMode: false,
};

const components: ThemeComponents = {
  Input,
  NumberInput,
  Textarea,
  FormLabel,
};

const theme = extendTheme({
  config,
  components,
  colors: {
    brand: {
      primary: "#ff4600",
      secondary: "#1a202c",
    },
  },
});

export default theme;
export * from "@chakra-ui/utils";