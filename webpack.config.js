const path = require("path");
const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");
// const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = (env, argv) => {
  var mode = "development";

  if (argv.mode === "production") { mode = "production"; } else { mode = "development"; }
  return {
    mode: mode,
    entry: {
      server: "./index.js"
    },
    output: {
      path: path.join(__dirname, "/dist"),
      publicPath: "/",
      filename: "index_bundle.js"
      // library: "app",
      // libraryTarget: 'var'
    },
    target: "node",
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false, // if you don't put this is, __dirname
      __filename: false // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'image/svg+xml'
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif|ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './public/images/[name].[ext]'
              }
            }
          ]
        },
        {
          test: /(\.css|\.scss|\.sass)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                // sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')
                ],
                // sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'src', 'scss')],
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        IS_PRODUCTION: JSON.stringify(mode === "production")
        // ,
        // VERSION: JSON.stringify("5fa3b9"),
        // BROWSER_SUPPORTS_HTML5: true,
        // TWO: "1+1",
        // "typeof window": JSON.stringify("object"),
        // "process.env": {
        //   NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        // }
      })
    ],
    watchOptions: {
      ignored: [ 'node_modules']
    }
  };
};
