const path = require('path');

const SRC_DIR = path.join(__dirname, '/react-client/src');
const DIST_DIR = path.join(__dirname, '/react-client/dist');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  devtool: 'eval-source-map',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: [
          /node_modules/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-transform-runtime',
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  // resolve: {
  //   fallback: {
  //     path: require.resolve('path-browserify'),
  //     os: require.resolve('os-browserify/browser'),
  //   },
  // },
  plugins: [new Dotenv()],
};
