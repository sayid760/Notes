let path = require('path')
let DonePlugin = require('./plugins/DonePlugin')
let AsyncPlugin = require('./plugins/AsyncPlugin')
let HtmlWbpackPlugin = require('html-webpack-plugin')
let FileListPlugin = require('./plugins/FileListPlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const InlineSourcePlugin = require('./plugins/InlineSourcePlugin')
const SkeletonPlugin = require('./plugins/SkeletonPlugin')

// const UploadPlugin = require('./src/plugins/UploadPlugin')

module.exports={
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'build.js',
        path:path.resolve(__dirname,'dist')
    },
    module: {
        rules: [
          {
            test: /\.css/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
          }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new HtmlWbpackPlugin({
            template:'./src/index.html'
        }),
        new FileListPlugin({  // 文件没有发射出来的时候，再添加一个文件
            filename:'list.md'
        }),
        new InlineSourcePlugin({
            match: /\.(js|css)$/
        }),
        // new UploadPlugin({
        //     bucket: 'webpack',
        //     accessKey: 'U7SP6mibQec1NoJMOKxF-amUWnw2raRSzESojVrX',
        //     secretKey: 'vIfkrR1eD4AmRmP2calJa7iCIptEMZhDWPaXiwM1'
        // })
        // new DonePlugin(),
        // new AsyncPlugin()
        new SkeletonPlugin({
            text: '骨架屏'
        })
    ]
}