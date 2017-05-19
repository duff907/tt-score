const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    entry: './src/js/index.js',
    output: {
      filename: 'index.js',
      path: path.join(__dirname, '/web/')
    },
    externals: {
      "jquery": "jQuery",
      "io": "io"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'src/index.html', to: 'index.html' }
      ])
    ]
  }
]
