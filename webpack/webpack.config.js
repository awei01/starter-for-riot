const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'babel-polyfill',
    _resolvePath('src', 'index.js')
  ],

  output: {
    // path: where to build on file system
    path: path.resolve(__dirname, 'build'),
    // publicPath: src or href path to file
    // (https://webpack.github.io/docs/configuration.html#output-publicpath)
    publicPath: '/',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.riot', '.json', '.scss'],
    modules: ['node_modules'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        // ESLINT
        test: /\.(js|riot)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [
          _resolvePath('src')
        ],
        // options: {
        //   formatter: require('eslint-friendly-formatter')
        // }
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['main'],
      template: _resolvePath('public', 'index.html'),
      inject: true
    }),
  ],
  // dev server configs
  devServer: {
    contentBase: _resolvePath('public'),
    port: 3000,
    overlay: true,
    inline: true
  },
  devtool: 'sourcemap',
}

function _resolvePath (...args) {
  args.unshift(__dirname, '..')
  return path.resolve.apply(path.resolve, args)
}
