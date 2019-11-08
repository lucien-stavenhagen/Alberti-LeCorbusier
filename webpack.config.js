const path = require("path");
module.exports = {
  devtool: "source-map",
  entry: {
    index: ["@babel/polyfill", "./src/index.js"],
    slide: ["@babel/polyfill", "./src/slide.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
