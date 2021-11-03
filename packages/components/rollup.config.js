import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
// import typescript from 'rollup-plugin-typescript2';
// import bundleScss from "rollup-plugin-bundle-scss";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import { main, module, types } from "./package.json";
import { compilerOptions } from "./tsconfig.json";

const { outDir, declarationDir } = compilerOptions;

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: ".",
        declarationDir: declarationDir.replace(outDir + "/", ""),
        emitDeclarationOnly: true,
      }),
      terser(),
    ],
  },
  {
    input: declarationDir + "/index.d.ts",
    output: [{ file: types, format: "es" }],
    plugins: [dts()],
  },
  // {
  //   input: "src/index.scss",
  //   output: [{ file: "build/hey.scss", format: "es" }],
  //   plugins: [bundleScss({ exclusive: false, output: "build/hey.scss" })],
  // },
  {
    input: "src/index.scss",
    output: { file: "build/index.css", format: "es" },
    plugins: [
      postcss({
        minimize: true,
        to: "build/index.css",
        extract: true,
        sourceMap: true,
      }),
    ],
  },
];
