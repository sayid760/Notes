const fs = require('fs')
const path = require('path')
let babylon = require('babylon')
let t = require('@babel/types')
let traverse = require('@babel/traverse').default
let generator = require('@babel/generator').default
let ejs = require('ejs')
let {SyncHook} = require('tapable')

// babylon 主要就是把源码 转换成ast
// @babel/traverse
// @babel/types
// @babel/generator
// npm i babylon @babel/traverse @babel/types @babel/generator

class Compiler{
    constructor(config){
        this.config = config
        // 保存入口文件的路径
        this.entryId // './src/index.js'
        // 保存所有的模块依赖
        this.modules = {} 
        this.entry = config.entry
        // 工作路径
        this.root = process.cwd()

        this.hooks = {
            entryOption: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook()
        }
        // 如果传递了plugins参数
        let plugins = this.config.plugins;
        if(Array.isArray(plugins)) {
            plugins.forEach( plugin => {
                plugin.apply(this);
            })
        }
        this.hooks.afterPlugins.call()
    }
    getSource(modulePath){ // 拿到当前模块内容  ./index.less
        let rules = this.config.module.rules
        let content = fs.readFileSync(modulePath, 'utf8')
        // 拿到每个规则来处理
        for(let i=0;i<rules.length;i++){
            let rule = rules[i]
            let {test, use}=rule
            let len = use.length-1 // 拿到最后一个
            if(test.test(modulePath)){ // 这个模块需要通过loader来转化
                // 获取对应的loader函数
                function normalLoader(){
                    let loader = require(use[len--]) 
                    // 递归调用loader实现转化功能
                    content = loader(content)
                    if(len>=0){ // 如果还有loader就不断调用执行，至到没有
                        normalLoader()
                    }
                }
                normalLoader()
            }
        }
        return content
    }
    // 解析源码  源码、路径
    parse(source, parentPath){
        let ast = babylon.parse(source)
        let dependencies = [] // 依赖的数组
        // console.log(ast)
        traverse(ast,{
            CallExpression(p){ 
                let node = p.node // 对应的节点
                if(node.callee.name === 'require'){
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value
                    console.log(moduleName)
                    moduleName = moduleName + (path.extname(moduleName)?'':'.js') // './a.js'
                    moduleName = './'+path.join(parentPath, moduleName) // 'src/a.js'
                    dependencies.push(moduleName)
                    node.arguments = [t.stringLiteral(moduleName)]
                }
            }
        })
        let sourceCode = generator(ast).code
        // console.log(generator(ast))
        return { sourceCode, dependencies}
    }
    buildModule(modulePath, isEntry){
        // 拿到模块内容
        let source = this.getSource(modulePath)
        let moduleName = './' + path.relative(this.root, modulePath) // 获取模块的相对路径
        // console.log(source, moduleName)
        if(isEntry){
            this.entryId = moduleName // 保存入口的名字
        }
        // 解析需要把source源码进行改造 返回一个依赖列表（build.js里面参数）
        let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName)) // ./src
        // console.log(sourceCode)
        console.log(dependencies)

        // 把相对路径和模块中的内容对应起来
        this.modules[moduleName]=sourceCode

        dependencies.forEach(dep=>{
            this.buildModule(path.join(this.root, dep), false)
        })
    }
    emitFile(){ // 发射文件
        // 拿到数据输出到哪个目录下
        let main = path.join(this.config.output.path, this.config.output.filename);
        // 模板的路径
        let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
        let code = ejs.render(templateStr, {entryId: this.entryId, modules: this.modules})
        this.assets = {};
        // 资源中 路径对应的代码
        this.assets[main] = code;
        // console.log(main)
        fs.writeFileSync(main, this.assets[main]);

    }
    run(){
        // 执行 并且创建模块的依赖关系
        this.hooks.run.call();
        this.hooks.compile.call();
        
        this.buildModule(path.resolve(this.root , this.entry), true)
        // console.log(path.resolve(this.root , this.entry))
        console.log(this.modules, this.entryId)
        this.hooks.afterCompile.call();

        // 发射一个文件 打包后的文件
        this.emitFile()
        this.hooks.emit.call();
        this.hooks.done.call();
    }
}

module.exports = Compiler

// 总结要做的事：
// 1、解析modules
// 2、解析entryId
// 3、替换模板
// 就可以实现我们自己的webpack了