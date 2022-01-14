const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const { appDist, appSrc, resolveApp } = require('./paths')
module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: "[name].[contenthash:8].bundler.js",
        path: appDist,
        // 编译前清除目录
        clean: true
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.tsx', '.jsx', '.js', '.ts',],
        alias: {
            '@': appSrc
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolveApp('public/index.html')
        }),
        new MiniCssExtractPlugin(),
        new ProgressBarWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                include: appSrc,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env"
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/,
                include: appSrc,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env"
                                ]
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg)$/,
                include: [appSrc],
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                include: [appSrc],
                type: 'asset/resource'
            },
            {
                test: /\.[jt]sx?$/,
                include: [appSrc],
                use: [
                    {
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'tsx',
                            target: "es2015"
                        }
                    }
                ]
            }
        ]
    },
}