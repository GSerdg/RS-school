const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  /* devServer: {
      contentBase: path.resolve(__dirname, '../dist'),
  }, */
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    compress: true,
    port: 9000,
  },
};
