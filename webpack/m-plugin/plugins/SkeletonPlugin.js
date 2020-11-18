const HtmlWebpackPlugin = require('html-webpack-plugin');

class SkeletonPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('SkeletonPlugin', (compilation) => {
            // //编译之前，生成一个text.txt文件,通过compilation操作文件，只是演示与骨架屏没有关系，本身是node环境，根据node+fs也可以使用
            console.log(this.options);
            compilation.assets['./text.txt'] = {
                source: () => this.options.text,
                size: () => this.options.text.length
            };
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('SkeletonPlugin',
                (data, cb) => {
                    ////在编译html文件之前把骨架屏动态加入进去
                    data.html = data.html.replace('<div id="app"></div>', `这里是骨架屏代码`);
                    //错误优先原则，如果处理有错误，传递到第一个参数，否则参数的位置就null
                    cb(null, data) //重点，一定要有回调函数，否则内容不会生效
                }
            )
        })
    }
}

module.exports = SkeletonPlugin