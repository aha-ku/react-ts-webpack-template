const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const { appDist, appSrc, resolveApp } = require('./paths')
const isDev = process.env.NODE_ENV === 'development';
function getCssLoaders() {
    const loaders = [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
    ]
    if (!isDev) {
        loaders.push({
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env"
                    ]
                }
            }
        })
    }
    return loaders;
}
module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: "js/[name].[contenthash:8].js",
        path: appDist,
        // 编译前清除目录
        clean: true
    },
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
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css"
        }),
        new ProgressBarWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                include: appSrc,
                use: [
                    ...getCssLoaders()
                ]
            },
            {
                test: /\.(scss|sass)$/,
                include: appSrc,
                use: [
                    ...getCssLoaders(),
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg)$/,
                include: [appSrc],
                type: 'asset/resource',
                generator: {
                    filename: "images/[hash][ext][query]"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                include: [appSrc],
                type: 'asset/resource',
                generator: {
                    filename: "fonts/[hash][ext][query]"
                }
            },
            {
                test: /\.[jt]sx?$/,
                include: [appSrc],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            }
        ]
    },
}