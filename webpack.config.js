const path = require('path');

module.exports = {
  entry: './blots.js',
  output: {
    filename: 'blots.min.js',
    path: path.resolve(__dirname, ''),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  },
};