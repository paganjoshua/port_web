const path = require('path');
const isDev = process.env.NODE_ENV === 'development' ? true : false;
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    open: true,
    port: process.env.WPDS_PORT || 5000,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './client/index.html', filename: 'index.html' }),
    new CleanWebpackPlugin(),
    isDev && new HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env', '@babel/preset-react']
          // }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [isDev ? 'style-loader' : new MiniCSSExtractPlugin.loader, 'css-loader']
      }
    ]
  }
}