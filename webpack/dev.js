const merge = require('webpack-merge');
const base = require('./base');
const webpack = require('webpack');
const path = require('path');
const cwd = process.cwd();

module.exports = merge(base, {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: 8100,
    open: true,
    stats: 'errors-only',
    // proxy: {
    //   '/api': {
    //     target: 'http://oneservice-dev.aliyun.com:8090/api/oneservice/v1',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  devtool: 'cheap-module-source-map'

})
