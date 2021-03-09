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
    contentBase: path.join(__dirname, 'client/html'),
    compress: true,
    port: process.env.WPDS_PORT,
    proxy: {
      '/dist/bundle.js': 'http://localhost:8080'
    },
    publicPath: './dist',
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
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