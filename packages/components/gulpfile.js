var { src, dest, series } = require("gulp");
var sass = require("gulp-sass");
var run = require("gulp-run");
var moduleImporter = require("sass-module-importer");
var clean = require("gulp-clean");
var sassCompiler = require("sass");
var sourceMaps = require("gulp-sourcemaps");
var replace = require("gulp-replace");

sass.compiler = sassCompiler;

const REPLACEMENTS = [
  ["import", "// import"],
  ["ReactDOM.render(", "// ReactDOM.render("],
  ["  <React.StrictMode>", "// <React.StrictMode>"],
  ["    <App />", "//     <App />"],
  ["  </React.StrictMode>", "// </React.StrictMode>"],
  ['  document.getElementById("root")', '//   document.getElementById("root")'],
  [");", "// );"],
];

function arr(i, flow = "regular") {
  return REPLACEMENTS[i][flow === "regular" ? 0 : 1];
}

function scss() {
  return src("./src/**/*.scss")
    .pipe(sourceMaps.init())
    .pipe(
      sass({
        sourceMap: true,
        sourceMapEmbed: true,
        sourceMapRoot: true,
        sourceComments: true,
        errLogToConsole: true,
        importer: moduleImporter(),
        precision: 3,
        outputStyle: "compressed",
        // includePaths: ["../../node_modules/@hashtag-design-system/primitives/src/globals.scss"],
      }).on("error", sass.logError)
    )
    .pipe(sourceMaps.write("."))
    .pipe(dest("./dist/esm"))
    .pipe(dest("./dist/cjs"));
}

function fresh() {
  return src("dist", { read: false, allowEmpty: true }).pipe(clean());
}

function buildEsm() {
  return run("tsc --noEmit false").exec();
}

function buildCjs() {
  return run("tsc --noEmit false --module commonjs --outDir dist/cjs").exec();
}

function copyFiles() {
  return src(["src/**/*.scss", "src/static/**/*"], { base: "src" }).pipe(dest("./dist/esm")).pipe(dest("./dist/cjs"));
}

function freshIndex() {
  return src("./src/index.tsx")
    .pipe(replace(arr(0, "reverse"), arr(0)))
    .pipe(replace(arr(1, "reverse"), arr(1)))
    .pipe(replace(arr(2, "reverse"), arr(2)))
    .pipe(replace(arr(3, "reverse"), arr(3)))
    .pipe(replace(arr(4, "reverse"), arr(4)))
    .pipe(replace(arr(5, "reverse"), arr(5)))
    .pipe(replace(arr(6, "reverse"), arr(6)))
    .pipe(dest("./src"));
}

function commentIndex() {
  return src("./src/index.tsx")
    .pipe(replace(arr(0), arr(0, "reverse")))
    .pipe(replace(arr(1), arr(1, "reverse")))
    .pipe(replace(arr(2), arr(2, "reverse")))
    .pipe(replace(arr(3), arr(3, "reverse")))
    .pipe(replace(arr(4), arr(4, "reverse")))
    .pipe(replace(arr(5), arr(5, "reverse")))
    .pipe(replace(arr(6), arr(6, "reverse")))
    .pipe(dest("./src"));
}

exports.scss = scss;
exports.fresh = fresh;
exports.buildEsm = buildEsm;
exports.buildCjs = buildCjs;
exports.copyFiles = copyFiles;
exports.commentIndex = commentIndex;
exports.freshIndex = freshIndex;
exports.default = series(fresh, freshIndex, commentIndex, buildEsm, buildCjs, scss, copyFiles);
