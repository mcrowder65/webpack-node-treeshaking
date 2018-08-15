const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build/bundle.js"
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    loaders: [
      {
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader"
      }
    ]
  }
};
