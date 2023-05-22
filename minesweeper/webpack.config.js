const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    entry: './src/index.js',
    node: false,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: false },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  'src/styles/abstract/_variables.scss',
                  'src/styles/abstract/_constants.scss',
                  // '#source/scss/abstract/_fonts.scss',
                  'src/styles/abstract/_mixins.scss',
                  'src/styles/abstract/_placeholders.scss',
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'assets'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
    ],
    devServer: {
      // overlay: true,
      compress: true,
      port: 3000,
    },
    devtool: 'eval-source-map',
  },
];
