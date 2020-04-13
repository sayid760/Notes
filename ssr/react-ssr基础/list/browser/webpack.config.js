
const path=require('path')
console.log(__dirname)
module.exports = {
    mode: 'development',
    devtool: false,
    // entry: __dirname + '/index.jsx',
    entry: path.resolve(__dirname, './main.jsx'),
    output: {
        filename: 'main.js',
        // path: path.resolve(__dirname, './dist/js'),
        path: path.resolve(__dirname, '../node/source/')
        // path: path.resolve(__dirname, '../dist/'),
        // path: './dist',
        // chunkFilename: 'chunk/[name].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx$/, use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            }
        ]
    }
}