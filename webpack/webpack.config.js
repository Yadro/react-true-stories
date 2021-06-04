const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './playground/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    // publicPath: path.resolve(__dirname, 'src', 'assets'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      alias: path.resolve(__dirname, '../src/alias'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // TODO
        test: /\.(png|svg|ttf|eot|woff2?)/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './playground/index.html',
      inject: 'body',
    }),
    new CopyPlugin({
      patterns: [{ from: path.resolve('playground', 'assets'), to: 'assets' }],
    }),
  ],
};
