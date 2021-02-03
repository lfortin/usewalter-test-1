const typescript = require('neutrinojs-typescript');
//const typescriptLint = require('neutrinojs-typescript-eslint');
const standard = require('@neutrinojs/standardjs');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    typescript({ tsconfig: {
      compilerOptions: {
        strict: true,
        allowJs: true,
      },
    } }),
    //typescriptLint(),
    standard({
      eslint: {
        // For supported options, see:
        // https://github.com/webpack-contrib/eslint-loader#options
        // https://eslint.org/docs/developer-guide/nodejs-api#cliengine
        // The options under `baseConfig` correspond to those
        // that can be used in an `.eslintrc.*` file.
        baseConfig: {
          rules: {
            'babel/semi': ['off'],
          },
        },
      },
    }),
    react({
      html: {
        title: 'front-end-src'
      }
    }),
    jest(),
  ],
};
