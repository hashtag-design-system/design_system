const fs = require("fs");
const path = require("path");

const variablesToCss = () => {
  try {
    const colorsFile = fs.readFileSync(
      path.join(__dirname, "../../../../../node_modules/@hashtag-design-system/primitives/src/base/_colors.scss"),
      { encoding: "utf8", flag: "r" }
    );
    const variablesFile = fs.readFileSync(
      path.join(__dirname, "../../../../../node_modules/@hashtag-design-system/primitives/src/_variables.scss"),
      { encoding: "utf8", flag: "r" }
    );
    const files = [
      colorsFile
        .split("\n")
        .map(line => line.replace("$", "  --"))
        .join("\n"),
      variablesFile
        .split("\n")
        .map(line => line.replace("$", "  --").replace("$", "#{$").replace(";", "};"))
        .join("\n"),
      ,
    ];

    const combinedData = files.join("\n\n");
    const formattedData = combinedData.replace(/\s!default/g, "");

    const appendedData = `:root {\n  ${formattedData.replace(/(?:[^*])(\/)/g, "  /")}}`;
    fs.writeFileSync("./src/styles/css/_colors.scss", appendedData);
  } catch (err) {
    throw new Error(err.message);
  }
};

variablesToCss();

module.exports = variablesToCss;
