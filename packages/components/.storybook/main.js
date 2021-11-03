const path = require("path");

const toPath = _path => path.join(process.cwd(), _path);

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/__helpers__/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/preset-scss",
    "storybook-addon-designs",
    "storybook-addon-performance/register",
    "storybook-addon-toolbar-actions/register",
  ],
  webpackFinal: async config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        // modules: [path.resolve(__dirname, '..'), 'node_modules'],
        alias: {
          ...config.resolve.alias,
          "@emotion/core": toPath("../../node_modules/@emotion/react"),
          "emotion-theming": toPath("../../node_modules/@emotion/react"),
          // '@/components': path.resolve(__dirname, '../components'),
          // '@/layouts': path.resolve(__dirname, '../layouts'),
          // '@/hooks': path.resolve(__dirname, '../utils/hooks'),
          // '@/data': path.resolve(__dirname, '../data'),
          // '@/utils': path.resolve(__dirname, '../utils')
        },
      },
    };
  },
};
