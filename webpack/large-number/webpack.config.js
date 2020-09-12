
const TerserPlugin = require('terser-webpack-plugin')

module.exports={
    mode:'none', // 只需要非开发版min才压缩，需要自己配置压缩
    entry:{
        'large-number':'./src/index.js',
        'large-number.min':'./src/index.js',
    },
    output:{
        filename:'[name].js',
        library:'largeNumber',
        libraryTarget:'umd',
        libraryExport:'default' // 否则要 largeTarget.default这样引用
    },
    optimization:{
        minimize:true,
        minimizer:[
            new TerserPlugin({
                include:/\.min\.js$/
            })
        ]
    }
}
