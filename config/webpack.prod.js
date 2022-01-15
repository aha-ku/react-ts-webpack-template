const { merge } = require('webpack-merge')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const webpackCommon = require('./webpack.common')
module.exports = merge(webpackCommon, {
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new ESBuildMinifyPlugin({
                target: "es2015",
                minifyWhitespace: true,
                // css: true
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 4 * 1024
        }
    }
})