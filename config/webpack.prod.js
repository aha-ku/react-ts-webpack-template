const { merge } = require('webpack-merge')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const webpackCommon = require('./webpack.common')
module.exports = merge(webpackCommon, {
    mode: "production",
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new ESBuildMinifyPlugin({
                target: "es2015"
            })
        ]
    }
})