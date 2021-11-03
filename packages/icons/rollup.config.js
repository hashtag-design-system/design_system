import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import { main, module, types } from "./package.json";
import { compilerOptions } from "./tsconfig.json";

const { outDir, declarationDir } = compilerOptions;

export default [
  {
    input: "src/index.ts",
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
    // external: ["@chakra-ui/icons"],
    plugins: [
      // babel({
      //   babelHelpers: "bundled",
      //   exclude: "node_modules/**",
      //   presets: [
      //     "@babel/preset-env",
      //     "@babel/preset-react",
      //     "@babel/preset-typescript",
      //   ],
      //   // plugins: ["@emotion/babel-plugin"],
      // }),
      resolve(),
      commonjs({
        include: "../../node_modules/**"
      }),
      peerDepsExternal(),
      ,
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
];
