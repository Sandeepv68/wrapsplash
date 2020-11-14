/**
 * Webpack config file for WrapSplash
 * Sandeep Vattapparambil
 */
//Constants
const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const nodeExternals = require("webpack-node-externals");

//Webpack config object
module.exports = (env) => {
  return {
    //set webpack build mode
    mode: env && env.production === true ? "production" : "development",
    //Node polyfills
    node: {
      process: true,
    },
    //add a banner
    plugins: [
      new webpack.BannerPlugin({
        banner: "//WrapSplashJS (c) 2018, Sandeep Vattapparambil",
        raw: true,
      }),
    ],
    //exclude node_modules
    externals: [nodeExternals()],
    //set minification flag
    optimization: {
      minimize: env && env.production === true ? true : false,
    },
    //set webpack bundle entry point
    entry: path.resolve(__dirname, "../", "src/index.js"),
    //set webpack bundle output
    output: {
      //set output target for UMD
      library: "wrapsplash",
      libraryTarget: "umd",
      path: path.resolve(__dirname, "../", "dist"),
      filename:
        env && env.production === true ? "wrapsplash.min.js" : "wrapsplash.js",
      umdNamedDefine: true,
      globalObject: "typeof self !== 'undefined' ? self : this",
    },
    //set up babel transpiler
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
    //set console logs in color
    stats: {
      colors: true,
    },
    //include source-map in builds
    devtool: "cheap-source-map",
  };
};
