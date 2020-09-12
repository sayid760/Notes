const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr)

module.exports = {
    mode: process.env.NODE_ENV,
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                    ]
                }
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    // All tools will find target browsers automatically, when you add the following to package.json:
                                    // browsers: ["last 2 version", ">1%", "IOS 7"]
                                })
                            ]
                        }
                    },
                    'less-loader',
                ]
            },
            {
                test: /.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'image/[name]_[hash:8].[ext]'
                        }
                    },
                ]
            },
            {
                test: /.(woff|woff2|eot|otf|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[name].chunk.css'
        })
    ],
    resolve: {
        alias: {
          '@': resolvePath('src')
        }
    },
}