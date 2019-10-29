const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 versions"]
                  },
                  modules: false // Needed for tree shaking to work.
                }
              ]
            ],
            plugins: ["@babel/plugin-transform-modules-umd"]
          }
        }
      }
    ]
  },
  target: "node", // or web
  entry: {
    htmldoc2json: path.resolve(__dirname, "index.js")
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    umdNamedDefine: true
  },

  mode: "production",

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },
      filename: "[name].min.js",
      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};
