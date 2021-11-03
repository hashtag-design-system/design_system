import "!style-loader!css-loader!sass-loader!../src/index.scss";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ChakraProvider, extendTheme, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { withPerformance } from "storybook-addon-performance";
import { useToolbarActions } from "storybook-addon-toolbar-actions";
import theme from "../src/theme/index";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
};

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: "Direction",
    description: "Direction for layout",
    defaultValue: "LTR",
    toolbar: {
      icon: "globe",
      items: ["LTR", "RTL"],
    },
  },
};

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const nextMode = useColorModeValue("dark", "light");

  useToolbarActions("color-mode-icon", <SwitchIcon />, {
    active: nextMode === "light",
    onClick: toggleColorMode,
  });

  return (
    // <Flex justify="flex-end" mb={4}>
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${nextMode} mode`}
      // variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      position="absolute"
      bottom={6}
      right={6}
    />
    // </Flex>
  );
};

const withChakra = (StoryFn, context) => {
  const { direction } = context.globals;
  const dir = direction.toLowerCase();

  React.useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  return (
    <ChakraProvider theme={extendTheme({ ...theme, direction: dir })}>
      <div dir={dir} id="story-wrapper" style={{ minHeight: "100vh", padding: "1em" }}>
        <ColorModeToggleBar />
        <StoryFn />
      </div>
    </ChakraProvider>
  );
};

export const decorators = [withChakra, withPerformance];

// export const decorators = [
//   Story => {
//     return (
//       <ChakraProvider theme={theme}>
//         <div className="storybook__container">
//           <Story />
//         </div>
//       </ChakraProvider>
//     );
//   },
// ];
