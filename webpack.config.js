module.exports = {
  devtool: "source-map",
  mode: "production",
  output: {
    filename: process.env.WEBPACK_OUTPUT_FILENAME || "geocanvas.min.js"
  },
  target: "web"
};
