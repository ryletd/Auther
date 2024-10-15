const webpack = require("webpack");
const { resolve } = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const { resolveTSconfigPathsToAlias } = require("./webpack-aliases.helpers");

const rootDir = resolve(__dirname, "..");
const DEV = process.env.DEV === "true";

module.exports = {
  entry: {
    index: resolve(rootDir, "src", "index.tsx"),
  },
  output: {
    path: resolve(rootDir, "dist", "js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    fallback: {
      fs: false,
      child_process: false,
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
    },
    alias: resolveTSconfigPathsToAlias({
      tsconfigPath: "../tsconfig.json", // Using custom path
      webpackConfigBasePath: "./", // Using custom path
    }),
  },
  plugins: [
    new NodePolyfillPlugin(),
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public" }],
    }),
  ],
};
