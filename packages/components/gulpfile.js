const { src, dest, series } = require("gulp");
const clean = require("gulp-clean");
// const concat = require("gulp-concat");
const replace = require("gulp-replace");


const REPLACEMENTS = [
  ["import", "// import"],
  ["ReactDOM.render(", "// ReactDOM.render("],
  ["  <React.StrictMode>", "//   <React.StrictMode>"],
  ["    <App />", "//     <App />"],
  ["  </React.StrictMode>", "//   </React.StrictMode>"],
  ['  document.getElementById("root")', '//   document.getElementById("root")'],
  [");", "// );"],
];

function arr(i, flow = "regular") {
  return REPLACEMENTS[i][flow === "regular" ? 0 : 1];
}

// function concatScss() {
//   return src("./**/*.scss").pipe(concat("index.scss")).pipe(dest("./build/"));
// }

// function copyFiles() {
//   return src(["src/**/*.scss", "src/static/**/*"], { base: "src" }).pipe(dest("./build/esm")).pipe(dest("./build/cjs"));
// }

function fresh() {
  return src("build", { read: false, allowEmpty: true }).pipe(clean());
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

exports.fresh = fresh;
exports.commentIndex = commentIndex;
exports.freshIndex = freshIndex;
exports.default = series(fresh, freshIndex, commentIndex);
