const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
console.log(path.resolve(__dirname,'../src/index.ts'))

module.exports = {
    entry: {
        index: path.resolve(__dirname,'../src/index.ts')
    },
    output:{
        filename: 'app.js',
        path: path.resolve(__dirname, '../dist')
    },
    resolve:{
        extensions:['.js', '.ts', '.tsx']
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/i,
                use:[{
                    loader:'ts-loader'
                }],
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
        }),
    ]
}