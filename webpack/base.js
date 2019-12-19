const webpack = require('webpack');
const pkgJson = require('../package');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const cwd = process.cwd();

const buildEnv = process.env.ENV;
const configObj = pkgJson.config['' + buildEnv];

module.exports = {
  entry: path.resolve(cwd, 'src/index.js'),
  output: {
    path: path.resolve(cwd, 'dist'),
    filename: buildEnv == 'loc' ? '[name].js' : '[name]-[chunkhash:8].js',
    //publicPath: publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less'],
    modules: [path.resolve(cwd, './node_modules')],
    alias: {
      'pages': path.resolve(cwd, './src/pages'),
      'widget': path.resolve(cwd, './src/widget'),
      'utils': path.resolve(cwd, './src/utils'),
      'config': path.resolve(cwd, './src/config'),
      'locales': path.resolve(cwd, 'locales')
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
      },
      {
        test:  /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'cache-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              modules: true,
              localIdentName: '[name]_[local]-[hash:base64:5]',
            }
          },
          // 'thread-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              // modifyVars: {
              //   CDN_BASE: JSON.stringify(configObj.CDN_BASE)
              // }
            }
          }
        ]
      },
      {
        test:  /\.(css|less)$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'cache-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              modules: false
            }
          },
          // 'thread-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              // modifyVars: {
              //   CDN_BASE: JSON.stringify(configObj.CDN_BASE)
              // }
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|eot|woff|ttf|svg)$/,
        use: 'file-loader'
      },
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   "ENV": JSON.stringify(buildEnv),
    //   "CDN_BASE": JSON.stringify(configObj.CDN_BASE),
    //   "BACKEND_BASE": JSON.stringify(configObj.BACKEND_BASE),
    //   "SERVER": JSON.stringify(configObj.SERVER)
    // }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    new MiniCssExtractPlugin({
      filename: buildEnv == 'loc' ? '[name].css' : '[name]-[contenthash:8].css',
    }),
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