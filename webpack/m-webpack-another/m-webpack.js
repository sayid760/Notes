
// node ./m-webpack.js 打包

const fs = require('fs')
const {join} = require('path')
const parser = require('babylon')
// const traverse = require('babylon-traverse').default
const traverse = require('@babel/traverse').default
const MaginString = require('magic-string') // 处理字符串
const entryPoint = './src/index.js'
const ejs = require('ejs') // ejs写法

let dependencies=[]
function parse(filename){
    let depsArr = [] // 记录依赖
    const content = fs.readFileSync(filename, 'utf-8')
    const code = new MaginString(content)
    // 转成AST语法树
    const ast = parser.parse(content, {
        sourceType:'module' // 以module类型
    })

    /*
    var str = 'is Tree' 转成ast语法树
    {
        'type':'Program',
        'kin':'var',
        'declarations':[{
            'type'：'VariableDeclarator',
            'id':{
                'type':'Identifier',
                'name':'str'
            },
            'init':{
                'type':'literal',
                'value':'is tree',
                'raw':'\'is tree'\'
            }
        }]
    }
    */

    // 递归遍历AST节点
    traverse(ast, { 
        ExportDeclaration({node}){ // 遍历出export结点，把export default msg修改为__webpack_exports__["default"] = (msg)
            const { start, end, declaration } = node
            code.overwrite(start, end, `__webpack_exports__["default"] = ${declaration.name}`)
        },
        ImportDeclaration({node}){ // 如果遍历出import结点，拿到node结点，就可以修改import定义部分
            // 比如把import msg from './message.js'换成var msg=__webpack_require__('./messages.js')
            const {start, end, specifiers, source} = node
            const newFile = './src/' + join(node.source.value)
            code.overwrite(start, end, `var ${specifiers[0].local.name} = __webpack_require__('${newFile}').default`) // 获取说明符
            depsArr.push(newFile)
        }
    })

    const _code = code.toString()
    dependencies.push({
        filename,
        _code
    })
    return depsArr
}

const depsArr = parse(entryPoint)
// 依赖解析
for(let item of depsArr){
    parse(item)
}

let template=`(function(modules){
    // 看模块有没有被加载过
    var installedModules = {}; 

	function __webpack_require__(moduleId) {
        // 如果缓存有，就从缓存取，没有就创建module
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		var module = installedModules[moduleId] = {
			exports: {}
			// 相当于在exports上挂载default方法
			// exports: {
			//	default :(message)  // '666666666'
			// }
		};
		// const message = '666666666'
		// __webpack_exports__["default"] = (message) 
		
        // 执行入口函数（核心点）
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// 把模块导出去
		return module.exports;
	}
	// 主入口文件：去找参数中的'./src/index.js'
	return __webpack_require__("./src/index.js");  
})({
    <% for(var i=0;i<dependencies.length;i++){ %>
        "<%- dependencies[i]["filename"] %>":((function(module, __webpack_exports__, __webpack_require__) {
            <%- dependencies[i]["_code"] %>
        })),
    <%}%>
})`

/*
'./src/message.js':((function(module, __webpack_exports__, __webpack_require__) {
    const message = '666666666'
    __webpack_exports__["default"] = (message) 
})),
*/

let result = ejs.render(template, {
    dependencies  // 传入参数
})

fs.writeFileSync('./dist/index.js', result)
