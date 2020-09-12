const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.model || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);

const merge = require('webpack-merge');
const { resolve } = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

const HtmlWebpackPlugin = require('html-webpack-plugin')

//console.log("",argv);

const webpackConfig = {
    entry: {
        app: resolve("./src/web/index")
    },
    output: {
        path: __dirname + '/dist',
        filename: 'app.js'
    },
    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template:'./src/web/index.html'
        })

    ]
}

module.exports = merge(webpackConfig, _mergeConfig);