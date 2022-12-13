const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");


module.exports = {
  
  plugins: [
    new BundleAnalyzerPlugin(),
    // gzip
    new CompressionPlugin({
      algorithm: "gzip",
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BundleAnalyzerPlugin(),
  ], //插件配置项
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 去重压缩css
      new TerserPlugin({
        // 压缩JS代码
        terserOptions: {
          compress: {
            drop_console: false, // 去除console
          },
        },
      }), // 压缩JavaScript
    ],
  },
  module: {
    rules: [
      //loader配置项
      { use: ["cache-loader", "thread-loader", "babel-loader"] },
    ],
  },
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  
};
