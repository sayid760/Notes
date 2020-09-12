'use strict';

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src')
}
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    // Users/yang/Desktop/my-project/src/index/index.js
    
    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            let match = entryFiles[index].match(/src\/(.*)\/index.js/);
            let pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            )
        });
    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA();
const prodConfig = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist_product'),
        filename: 'js/[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.js$/,
                // 只解析src里面的js文件 第三方引入的告诉babel-loader不解析，因为一般人家都自动解析好了
                include: path.resolve('src'),
                exclude:/node_modules/,   
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", '@babel/preset-react'],
                        plugins: [
                            "@babel/plugin-syntax-dynamic-import"
                        ]
                    }
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        ...htmlWebpackPlugins,
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        // 代码压缩，多个scope合并成一个，生产模式会自动创建
        // new webpack.optimize.ModuleConcatenationPlugin(),
        // function () {
        //     this.hooks.done.tap('done', (stats) => {
        //         if (stats.compilation.errors &&
        //             stats.compilation.errors.length && process.argv.indexOf('- -watch') == -1) {
        //             console.log('build error');
        //             process.exit(1);
        //         }
        //     })
        // },
    ],
    devtool: '',
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //           commons: {
    //               test: /(react|react-dom)/,
    //               name: 'vendors',
    //               chunks: 'all'
    //           }
    //         }
    //       }
    // },
    optimization: {
        minimizer: [
            // new TerserPlugin({
            //     parallel: true,
            //     cache: true
            // }),
        ],
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
        },
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js'],
        mainFields: ['main']
    },
    stats: 'errors-only'
}

module.exports = prodConfig;