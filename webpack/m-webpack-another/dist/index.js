(function(modules){
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
    
        "./src/index.js":((function(module, __webpack_exports__, __webpack_require__) {
            var msg = __webpack_require__('./src/message.js').default
// 通过traverse把上面的import msg from './message.js' 换成 var msg=__webpack_require__('./messages.js')
console.log(msg)
console.log('主入口')

/* 编译完变成这样
var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/message.js");
console.log(_a__WEBPACK_IMPORTED_MODULE_0__["default"])
console.log("主入口")
*/


/*
(function(modules){
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
			//	default :(msg)  // '666666666'
			// }
		};
		// const msg = '666666666'
		// __webpack_exports__["default"] = (msg) 
		
        // 执行入口函数（核心点）
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// 把模块导出去
		return module.exports;
	}
	// 主入口文件：去找参数中的'./src/index.js'
	return __webpack_require__("./src/index.js");  
})({
  './src/message.js':((function(module, __webpack_exports__, __webpack_require__) {
		const msg = '666666666'
		__webpack_exports__["default"] = (msg) 
  })),
  './src/index.js':((function(module, __webpack_exports__, __webpack_require__) {
		var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/message.js");
		console.log(_a__WEBPACK_IMPORTED_MODULE_0__["default"])
		console.log("主入口")
  }))
})
*/
        })),
    
        "./src/message.js":((function(module, __webpack_exports__, __webpack_require__) {
            const msg = '666666666'
__webpack_exports__["default"] = msg

// const msg = '666666666'
// __webpack_exports__["default"] = (msg)

// 相当于在exports上挂载default方法
        })),
    
})