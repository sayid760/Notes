const path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    //实现刷新浏览器webpack-hot-middleware/client?noInfo=true&reload=true 是必填的
    entry: ['webpack-hot-middleware/client?noInfo=true&reload=true' , "./src/main"],
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
	        path: __dirname + '/dist',
	        filename: 'js/[name].bundle.js',
	   },
    //添加我们的插件 会自动生成一个html文件
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
		}),
		new ManifestPlugin(),

        // 实现刷新浏览器必写
		new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                include: [
                    path.resolve(__dirname, "src"),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
			     test: /\.css$/,
			     exclude: /(node_modules)/,
			     use: [
			         'style-loader', {
			             loader : 'css-loader',
			             options : {
			                 importLoaders : 1
			             },
			         }
//			         ,
//			         'postcss-loader'
			     ]
			},
			{
			     test: /\.less$/,  //查找所有的.less文件
			     use: [
			         {
			             loader: "style-loader"  //3、如果要css嵌套在页面中要用style-loader
			         }, {
			             loader: "css-loader"   //2、然后交给css处理
			         }, {
			             loader: "less-loader"   //1、先把less转换成css
			         }
			     ]
			},
			{
			     test: /\.(html)$/,
			     use: {
			         loader: 'html-loader',
			     }
			},
			{
			  test: /\.(png|gif|jpg|svg|jpeg)$/i,
			  use: [
			   'file-loader?name=[name].[ext]&outputPath=assets/',
			    {
			      loader: 'image-webpack-loader',
			      options: {
			        mozjpeg: {   //压缩的JPEG图像
			          progressive: true,
			          quality: 65
			        },
			        optipng: {  //压缩PNG图片
			          enabled: false,
			        },
			        pngquant: { //压缩PNG图片
			          quality: '65-90',
			          speed: 4
			        },
			        gifsicle: { //压缩GIF图像
			          interlaced: false,
			        },
			        webp: {
			          quality: 75
			        }
			      }
			    }
			  ]
			}
        ]
    }
};
