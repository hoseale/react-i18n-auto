const webpack = require('webpack')
const path = require('path')
const cwd = process.cwd();

const vendors = [
  'react',
  'react-dom',
  'react-router-dom',
]
module.exports = function (webpackConfig, env) {
  webpackConfig = {
    entry: {
      lib: vendors
    },
    output: {
      path: path.resolve(cwd, 'dll'),
      filename: '[name].js',
      library: '[name]'
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.resolve(cwd,'dll/manifest.json'),
        name: "[name]",
        context: cwd
      }),
    ]
  }
  return webpackConfig
}
