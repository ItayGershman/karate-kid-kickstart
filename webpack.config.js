const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "main.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename:'[name][ext]',
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
      static: './',
      port:5001,
      open:true,
      hot:true,
  },
  //loaders
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/,type:'asset/resource'},
      { test: /\.js$/, exclude: /node_modules/, use :{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }}
    ],
  },

  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo App",
      filename: "index.html",
      template: path.resolve(__dirname, 'temp.html')
    }),
  ],
};
