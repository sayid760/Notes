const path = require('path')
module.exports={
    mode:'development',
    devtool:'source-map',
    // watch:true,
    entry:'./src/index.js',
    output:{
        filename:'build.js',
        path:path.resolve(__dirname, 'dist')
    },
    resolveLoader:{ // 如果node_modules找不到就去loaders里面找
        modules:['node_modules', path.resolve(__dirname, 'loaders')] 
        // alias:{
        //     'babel-loader':path.resolve(__dirname, 'loaders', 'babel-loader.js')
        // }
    },
    module:{ 
        /* 顺序：从下到上、从右到左   pre在前 post在后
            pre> normal > inline
        */
        rules:[
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            { // 根据图片生成一个md5，发射到dist目录下，file-loader还会返回当前的图片路径
                test:/\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader', // file-loader
                    options:{
                        limit: 200*1024
                    } 
                }, 
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {   // 加注释的loader
                test: /\.js$/,
                use: { 
                    loader: 'banner-loader',
                    options: {
                        text:'hahaha',
                        filename:path.resolve(__dirname,'banner.js')
                    } 
                }
            }
            // {
            //     test:/\.js$z/,
            //     use:['loader3','loader2','loader1']
            // },
            // {
            //     test:/\.js$/,
            //     use: 'loader1',
            //     enforce:'pre'
            // },{
            //     test:/\.js$/,
            //     use:'loader2'
            // },{
            //     test:/\.js$/,
            //     use:'loader3',
            //     enforce:'post'
            // },
        ]
    }
}