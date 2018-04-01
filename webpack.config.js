/**
 * One Webpack config for both dev and production.
 * Has support for Es6+ using Babel and Sass
 * Also works with React
 * Uses Webpack Dev Server in development for hot reloading
 *
 * Put Babel settings in a separate file called .babelrc
 *
 * Script to build: NODE_ENV=production webpack
 * Script to dev: webpack-dev-server --open --hot --inline
 *
 * Dependencies in this config:
 * npm i -D webpack webpack-cli webpack-dev-server
 * npm i -D uglifyjs-webpack-plugin clean-webpack-plugin webpack-merge
 * npm i -D node-sass sass-loader css-loader style-loader
 * npm i -D html-webpack-plugin extract-text-webpack-plugin@^4.0.0-beta.0
 * npm i -D babel-core babel-loader babel-preset-react babel-preset-env
 */

const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const production = process.env.NODE_ENV === "production";

// file names of bundles
const jsBundleName = "app.bundle.js";
const cssBundleName = "style.bundle.css";

// this dir should contain the entry point HTML and other static files
const contentBaseDir = "./public";

// where the built files should be
const outputDirName = "./dist";

// file name of entry HTML file
const htmlFile = "index.html";

// the public path, must be specified so historyApiFallback works for nested/paths/
const publicPath = "";

// common config options for both dev and prod
const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, outputDirName),
    filename: jsBundleName,
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};

let merged;
if (production) {
  merged = merge(config, {
    // minify JS, set process.env.NODE_ENV = "production" and other optimizations
    mode: "production",
    // source map type
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: { sourceMap: true },
              },
              {
                loader: "sass-loader",
                options: { sourceMap: true },
              },
            ],
            fallback: "style-loader",
          }),
        },
      ],
    },
    plugins: [
      // clean up dist dir
      new CleanWebpackPlugin([outputDirName]),
      // output CSS bundle
      new ExtractTextPlugin(cssBundleName),
      // inject bundles into our HTML file and minify
      new HtmlWebpackPlugin({
        filename: htmlFile,
        template: path.resolve(__dirname, `${contentBaseDir}/${htmlFile}`),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    ],
  });
} else {
  merged = merge(config, {
    // sets process.env.NODE_ENV = "development" and shows module path names
    mode: "development",
    // source map type
    devtool: "cheap-eval-source-map",
    devServer: {
      port: 3000,
      contentBase: contentBaseDir,
      // reload page when changing files in contentBase
      // does not interfere with HMR
      watchContentBase: true,
      // will fall back to index.html when no matching routes exist
      historyApiFallback: true
      // should also enable hot and inline, but they
      // don't always work when enabled thru config files
      // hot: hot module replacement
      // inline: refresh page on changes that can't be hot replaced
    },
    module: {
      rules: [
        {
          // enable importing CSS in JS
          // to use hot reloading for CSS, must import it in JS
          test: /\.(scss|css)$/,
          use: [
            // creates style nodes from JS strings
            { loader: "style-loader" },
            // translates CSS into CommonJS
            { loader: "css-loader" },
            // compiles Sass to CSS
            { loader: "sass-loader" },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: htmlFile,
        template: path.resolve(__dirname, `${contentBaseDir}/${htmlFile}`),
      }),
    ],
  });
}

module.exports = merged;
