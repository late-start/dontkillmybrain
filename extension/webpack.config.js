const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: "./src/background.ts",
    "popup/popup": "./src/popup/popup.ts",
    "onboarding/onboarding": "./src/onboarding/onboarding.ts",
    "content-scripts/claude": "./src/content-scripts/claude.ts",
    "content-scripts/chatgpt": "./src/content-scripts/chatgpt.ts",
    "content-scripts/gemini": "./src/content-scripts/gemini.ts",
    "content-scripts/grok": "./src/content-scripts/grok.ts",
    "content-scripts/perplexity": "./src/content-scripts/perplexity.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "manifest.json", to: "manifest.json" },
        { from: "src/popup/popup.html", to: "popup/popup.html" },
        { from: "src/popup/popup.css", to: "popup/popup.css" },
        { from: "src/onboarding/onboarding.html", to: "onboarding/onboarding.html" },
        { from: "src/onboarding/onboarding.css", to: "onboarding/onboarding.css" },
        {
          from: "public/icons",
          to: "icons",
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  devtool: "source-map",
};
