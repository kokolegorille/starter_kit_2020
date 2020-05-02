const path = require("path");
const Webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// For dev server
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, options) => {
  const devMode = options.mode !== "production";

  return {
    devtool: devMode ? "source-map" : undefined,
    optimization: {
      minimizer: [
        new TerserPlugin({ cache: true, parallel: true, sourceMap: devMode }),
        new OptimizeCSSAssetsPlugin({}),
      ]
    },
    mode: devMode,
    entry: {
      bundle: "./src/index.js",
    },
    output: {
      filename: "js/[name].js",
      path: path.resolve(__dirname, "./dist"),
      publicPath: "",
    },
    module: {
      rules: [
        // Load javascript
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        // Load stylesheet
        {
          test: /\.[s]?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        // Load images
        {
          test: /\.(png|svg|jpe?g|gif)(\?.*$|$)/,
          loader: "url-loader?limit=10000",
        },
        // Load fonts
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?(\?.*$|$)/,
          use: "url-loader?&name=/fonts/[name].[ext]",
        },
        {
          test: /\.(eot|ttf|otf)?(\?.*$|$)/,
          loader: "file-loader?&name=/fonts/[name].[ext]",
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
        inject: "body",
      }),
      new MiniCssExtractPlugin({ filename: "./css/app.css" }),
      new Webpack.HotModuleReplacementPlugin(),
      new ManifestPlugin(),
      new CopyWebpackPlugin([{ from: "./static", to: "./dist" }]),
    ],
    devServer: {
      contentBase: "./dist",
      historyApiFallback: true,
      compress: true,
      open: true,
      hot: true,
      overlay: true,
    }
  }
};