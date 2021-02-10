import type { Config } from "@jest/types";

// @ts-ignore
if (!SVGElement.prototype.getTotalLength) {
  // @ts-ignore
  SVGElement.prototype.getTotalLength = () => 1;
}

const config: Config.InitialOptions = {
  verbose: true,
  rootDir: "./src",
  coveragePathIgnorePatterns: [
    "<rootDir>/App.tsx",
    "<rootDir>/index.tsx",
    "<rootDir>/**/*.stories.tsx",
    "<rootDir>/**/*.stories.jsx",
    "<rootDir>/**/__stories__",
  ],
};
export default config;
