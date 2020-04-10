/*
 * @Description:
 * @Autor: Yao
 * @Date: 2019-11-01 09:44:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-10 17:41:51
 */
const webpack = require("webpack");
const path = require("path");
// 更新html
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 每次打包后清理dist
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].[hash].js",
    libraryTarget: "umd",
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "./static"),
        to: "./static",
        ignore: [".*"],
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash:8].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader", // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: "sass-loader", // 将 Sass 编译成 CSS
          },
        ],
      },
    ],
  },
};
