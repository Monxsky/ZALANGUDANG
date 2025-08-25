const path = require('path');

module.exports = {
  mode: 'development', // bisa juga 'production'
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader' // <-- ini penting
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // biar bisa import React tanpa .js/.jsx
  },
  devServer: {
    static: path.join(__dirname, '/'),
    port: 3000,
    open: true
  }
};
