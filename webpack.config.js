const path = require("path");
const glob = require("glob");
const Webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// PWA with workbox
// Uncomment if needed!

// const WorkboxPlugin = require("workbox-webpack-plugin");

// For dev server
const HtmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = [
  "react", "react-dom"
];

module.exports = (_env, options) => {
  const devMode = options.mode !== "production";

  return {
    devtool: devMode ? 'eval-cheap-module-source-map' : undefined,
    optimization: {
      // This reduce bundle size!
      // https://github.com/webpack/webpack/issues/6357
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /react|react-dom/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true
          }
        }
      },
      minimizer: [
        new TerserPlugin({}),
        new CssMinimizerPlugin({})
      ]
    },
    mode: devMode,
    entry: {
      bundle: "./src/index.js",
      vendor_libs: VENDOR_LIBS.concat(glob.sync("./vendor/**/*.js")),
    },
    output: {
      filename: "js/[name].js",
      path: path.resolve(__dirname, "./dist"),
      publicPath: "/",
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
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                // Relative to output public_path
                outputPath: "./images/"
              }
            }
          ]
        },
        // Load fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                // Relative to output public_path
                outputPath: "./fonts/"
              }
            }
          ]
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
      new CopyWebpackPlugin({
        patterns: [{ from: "./static", to: "./" }]
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      historyApiFallback: true,
      compress: true,
      open: true,
      hot: true,
      overlay: true,
      // port: 8080,
    }
  }
};
