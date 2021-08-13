/*
 * @Author: weicong
 * @Date: 2020-03-12 22:11:07
 * @LastEditTime: 2021-08-13 15:27:47
 * @LastEditors: weicong
 * @Description:
 */
const UglifyjsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/" : "./",
  // transpileDependencies: ["view-design"],
  configureWebpack: {
    optimization: {
      splitChunks: {
        // include all types of chunks
        chunks: "all",
        minSize: 1024 * 5,
        maxSize: 102400,
        minChunks: 4,
      },
      minimizer: [
        new UglifyjsPlugin({
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
            warnings: false,
          },
        }),
      ],
    },
    // gzip
    plugins:
      process.env.NODE_ENV === "production"
        ? [
            new CompressionPlugin({
              filename: "[path].gz[query]",
              algorithm: "gzip",
              test: new RegExp(
                "\\.(" + productionGzipExtensions.join("|") + ")$"
              ),
              threshold: 10240,
              minRatio: 0.8,
            }),
          ]
        : [],
  },
};
