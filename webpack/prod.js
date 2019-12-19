const merge = require('webpack-merge');
const base = require('./base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const cwd = process.cwd();

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtimechunk~${entrypoint.name}`
    },
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 10
        }
      }
    },
    minimizer: [
      new TerserPlugin({
          cache: true,
          parallel: 4,
          extractComments: false,
          terserOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true
            },
            output: {
              // 最紧凑的输出
              beautify: false,
              // 删除所有的注释
              comments: false,
            }
          }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin()
  ],

})