const path = require('path');
const webpack = require('webpack');
const manifestFx = require('./manifest.json');
const manifestGc = require('./manifest.chrome.json')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

require('dotenv').config();

if (process.env.NODE_ENV == null) {
  process.env.NODE_ENV = 'development';
}

if (process.env.BROWSER != 'chrome') {
  process.env.BROWSER = 'firefox';
}

const BROWSER = process.env.BROWSER;
const ENV = process.env.NODE_ENV;
const manifest = BROWSER === 'firefox' ? manifestFx : manifestGc;

const plugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(ENV),
  }),
  new CleanWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: `../manifest${BROWSER == 'firefox' ? '' : `.${BROWSER}`}.json`,
        to: "manifest.json"
      },
      { from: "../_locales", to: "_locales" },
      { from: "../icons", to: "icons" },
    ],
  }),
];

if (ENV == 'production') {
  plugins.push(
    new ZipPlugin({
      path: path.resolve(__dirname, 'dist'),
      filename: `${manifest.name}-${BROWSER}-${manifest.version}.zip`,
      fileOptions: {
        mtime: new Date(),
        mode: 0o100664,
      }
    })
  );
}

module.exports = {
  mode: ENV,
  context: path.resolve(__dirname, 'src'),
  entry: {
    background: './background.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  optimization: {
    minimize: false,
  },
  devtool: ENV == 'development' ? 'source-map' : false,
  resolve: {
    alias: {
      "webextension-polyfill": "webextension-polyfill/dist/browser-polyfill.min.js"
    }
  },
  watchOptions: {
    ignored: '**/node_modules',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx']
        }
      },
    ]
  },
  plugins: plugins,
  devServer: {
    port: process.env.TEST_SERVER_PORT,
    static: {
      publicPath: `/${manifest.name}`,
    }
  },
}
