const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "main.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "[name][ext]",
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    static: "dist",
    port: 5001,
    open: true,
    hot: true,
  },
  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo App",
      filename: "index.html",
      template: path.resolve(__dirname, "temp.html"),
    }),
    new CopyPlugin({
      patterns: [
        { from: "**/*.css", to: path.resolve(__dirname, "dist/style.css") },
      ],
    }),
  ],
};
