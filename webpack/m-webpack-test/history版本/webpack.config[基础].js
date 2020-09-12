let path=require('path')
let HtmlWebpackPlugin=require('html-webpack-plugin');
let miniCssExtractPlugin=require('mini-css-extract-plugin');
let OptimizeCss=require('optimize-css-assets-webpack-plugin');
let UglifyjsPlugin=require('uglifyjs-webpack-plugin');
let webpack = require('webpack')

module.exports = {
    optimization:{ // 优化项
        minizer:[
            new UglifyjsPlugin({
                cache:true, //是否缓存
                parallel:true, // 是否并发压缩，一起压缩
                sourceMap:true //是否源码调试
            }),
            new OptimizeCss()
        ]
    },
    devServer:{ // 开发服务器的配置
        port: 8081,
        progress: true,
        contentBase: './build', // build作为静态服务目录
        compress: true // 压缩
    },
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'build.[hash].js', // 打包后的文件名
        path:path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径
        // publicPath:'http://www.xxx.com'
    },
    plugins:[ // 插件
        new HtmlWebpackPlugin({
            template: './src/index.html', // 以它作为模板
            filename: 'index.html', // 打包后的名字
            minify:{
                removeAttributeQuotes:true, // 删除双引号
                collapseWhitespace:true // 变成一行
            },
            hash:true // 哈希戳
        }),
        new miniCssExtractPlugin({
            filename:'css/main.css',  // 把css抽离到main.css
        }),
        new webpack.ProvidePlugin({
            $:'jquery' // 把jq提供成$符
        })
    ],
    externals:{
        jquery:'$'
    },
    module:{
        rules:[
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {  
                test: /\.(png|jpg|gif)$/,
                // 做限制，当图片小于多少k时，用base64来转换，否则像file-loader那样生产真实图片
                use: {
                    loader:'file-loader',
                    options:{
                        limit:200*1024,
                        outputPath:'/img/',
                        publicPath:'http://www.xxx.com' // 只给图片加路径
                    }
                }
            },
            {
                test: /\.js$/,
                use:{
                    loader:'eslint-loader',
                    options:{
                        enforce: 'pre'  //eslint为前置loader，loader是从下而上执行，因为要先校验再执行，所以强制在下一个校验/\.js$/的loader前执行  （previous，post 之后）
                    }
                },
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins:[ // 配置小插件 用于class
                            ['@babel/plugin-proposal-decorators',{'legacy':true}]
                            ['@babel/plugin-proposal-class-properties',{'loose':true}],
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include:path.resolve(__dirname, 'src'), // 找src文件下的
                exclude:/node_modules/   // 排除掉
            },
            {
                test:/\.css$/, 
                use: [ 
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test:/\.less$/, 
                use: [ 
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
}