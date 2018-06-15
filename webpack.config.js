const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const isProd = process.env.NODE_ENV === "production";
const sourcePath = path.join(__dirname, "./src/client");
const webpackConfig = {
  entry: "./src/index.js",
  output: {
    path: `${__dirname}/build`,
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".scss", ".jsx", ".css"],
    modules: [sourcePath, path.resolve(__dirname, "./node_modules")],
    symlinks: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]

  },

};
webpackConfig.plugins = [
  new webpack.EnvironmentPlugin(["NODE_ENV"]),

  new webpack.DefinePlugin({
    "process.env.NODE_ENV": "\"production\""
  }),

];
if (process.env.ANALYZE_BUNDLE) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}
if (isProd) {

  webpackConfig.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );
}
module.exports = webpackConfig;