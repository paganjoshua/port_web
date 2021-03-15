require('dotenv').config();
const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV === 'development' ? true : false;

const plugins = [];
if (devMode) {
  plugins.push(new MiniCSSExtractPlugin());
}

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: path.join(__dirname, 'client'),
    compress: true,
    port: process.env.WPDS_PORT,
    // proxy: {
    //   '/': `http://localhost:${process.env.DEV_PORT}`
    // },
    publicPath: '/dist/',
    watchOptions: {
      poll: 1000
    }
  },
  plugins,
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
        use: [devMode ? 'style-loader' : MiniCSSExtractPlugin.loader, 'css-loader']
      }
    ]
  }
}