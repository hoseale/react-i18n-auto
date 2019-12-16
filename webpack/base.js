const webpack = require('webpack');
const pkgJson = require('../package');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const cwd = process.cwd();

const buildEnv = process.env.ENV;
const configObj = pkgJson.config['' + buildEnv];

module.exports = {
  entry: path.resolve(cwd, 'src/index.js'),
  output: {
    path: path.resolve(cwd, 'dist'),
    filename: '[name].js',
    //publicPath: publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(cwd, './node_modules')],
    alias: {
      'widget': path.resolve(cwd, './src/widget'),
      'utils': path.resolve(cwd, './src/utils'),
      'config': path.resolve(cwd, './src/config'),
      'locales': path.resolve(cwd, 'locales'),
    }
  },
  module: {
    rules: [
      {
        test:  /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   "ENV": JSON.stringify(buildEnv),
    //   "CDN_BASE": JSON.stringify(configObj.CDN_BASE),
    //   "BACKEND_BASE": JSON.stringify(configObj.BACKEND_BASE),
    //   "SERVER": JSON.stringify(configObj.SERVER)
    // }),
    new HtmlWebpackPlugin({
      showErrors: true,
      buildTime: new Date(),
      // publicPath: publicPath,
      hash: false,
      template: path.resolve(cwd, 'src/index.html'),
      minify:{
        removeComments: true
      }
    }),
    new webpack.DllReferencePlugin({
      context: cwd,
      manifest: require(path.resolve(cwd, 'dll/manifest.json')),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(cwd, 'src/assets') ,
        to: 'assets'
      },
      {
        from: path.resolve(cwd, 'dll'),
        to: 'dll'
      }
    ]),
  ],
  stats: {
    children: false
  }
 
}