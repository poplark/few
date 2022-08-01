const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'public/index.tsx')
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  module: {
    rules: [
      {
        test: /.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }, {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin()
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
    })
  ],
  watch: true,
  devServer: {
    hot: true,
  }
}
