/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"main": 0
/******/ 	}
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"1":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "static/css/" + ({}[chunkId]||chunkId) + ".chunk.css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./" + chunkId + ".app.js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/polyfill/lib/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@babel/polyfill/lib/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./noConflict */ \"./node_modules/@babel/polyfill/lib/noConflict.js\");\n\nvar _global = _interopRequireDefault(__webpack_require__(/*! core-js/library/fn/global */ \"core-js/library/fn/global\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nif (_global[\"default\"]._babelPolyfill && typeof console !== \"undefined\" && console.warn) {\n  console.warn(\"@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended \" + \"and may have consequences if different versions of the polyfills are applied sequentially. \" + \"If you do need to load the polyfill more than once, use @babel/polyfill/noConflict \" + \"instead to bypass the warning.\");\n}\n\n_global[\"default\"]._babelPolyfill = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/polyfill/lib/index.js?");

/***/ }),

/***/ "./node_modules/@babel/polyfill/lib/noConflict.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/polyfill/lib/noConflict.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! core-js/es6 */ \"core-js/es6\");\n\n__webpack_require__(/*! core-js/fn/array/includes */ \"core-js/fn/array/includes\");\n\n__webpack_require__(/*! core-js/fn/array/flat-map */ \"core-js/fn/array/flat-map\");\n\n__webpack_require__(/*! core-js/fn/string/pad-start */ \"core-js/fn/string/pad-start\");\n\n__webpack_require__(/*! core-js/fn/string/pad-end */ \"core-js/fn/string/pad-end\");\n\n__webpack_require__(/*! core-js/fn/string/trim-start */ \"core-js/fn/string/trim-start\");\n\n__webpack_require__(/*! core-js/fn/string/trim-end */ \"core-js/fn/string/trim-end\");\n\n__webpack_require__(/*! core-js/fn/symbol/async-iterator */ \"core-js/fn/symbol/async-iterator\");\n\n__webpack_require__(/*! core-js/fn/object/get-own-property-descriptors */ \"core-js/fn/object/get-own-property-descriptors\");\n\n__webpack_require__(/*! core-js/fn/object/values */ \"core-js/fn/object/values\");\n\n__webpack_require__(/*! core-js/fn/object/entries */ \"core-js/fn/object/entries\");\n\n__webpack_require__(/*! core-js/fn/promise/finally */ \"core-js/fn/promise/finally\");\n\n__webpack_require__(/*! core-js/web */ \"core-js/web\");\n\n__webpack_require__(/*! regenerator-runtime/runtime */ \"regenerator-runtime/runtime\");\n\n//# sourceURL=webpack:///./node_modules/@babel/polyfill/lib/noConflict.js?");

/***/ }),

/***/ "./src/app/layout.js":
/*!***************************!*\
  !*** ./src/app/layout.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader/root */ \"react-hot-loader/root\");\n/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _layout_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout.less */ \"./src/app/layout.less\");\n/* harmony import */ var _layout_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_layout_less__WEBPACK_IMPORTED_MODULE_4__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\nvar Index = /*#__PURE__*/function (_React$Component) {\n  _inherits(Index, _React$Component);\n\n  var _super = _createSuper(Index);\n\n  function Index(props) {\n    _classCallCheck(this, Index);\n\n    return _super.call(this, props);\n  }\n\n  _createClass(Index, [{\n    key: \"render\",\n    value: function render() {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"layout-box\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"zz.js --> koa+react+ssr\"), this.props.children);\n    }\n  }]);\n\n  return Index;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_3__[\"hot\"])(Index));\n\n//# sourceURL=webpack:///./src/app/layout.js?");

/***/ }),

/***/ "./src/app/layout.less":
/*!*****************************!*\
  !*** ./src/app/layout.less ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/layout.less?");

/***/ }),

/***/ "./src/index-server.js":
/*!*****************************!*\
  !*** ./src/index-server.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _server_react_ssr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server/react-ssr */ \"./src/server/react-ssr.js\");\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! koa */ \"koa\");\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-static */ \"koa-static\");\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _server_pro_config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./server/pro-config.js */ \"./src/server/pro-config.js\");\n/* harmony import */ var _server_pro_config_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_server_pro_config_js__WEBPACK_IMPORTED_MODULE_4__);\n//web 服务启动入口对象\n\n\n\n\n\nvar port = 8081;\nvar app = new koa__WEBPACK_IMPORTED_MODULE_1___default.a(); //设置可访问的静态资源\n//TODO:生产换需要删除此功能\n\napp.use(koa_static__WEBPACK_IMPORTED_MODULE_2___default()('./dist/static')); //ssr 中间件\n\napp.use(_server_react_ssr__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); //启动服务\n\napp.listen(port, function () {\n  console.log('server is start .', \"http://localhost:\".concat(port));\n});\n\n//# sourceURL=webpack:///./src/index-server.js?");

/***/ }),

/***/ "./src/router/async-bundle.js":
/*!************************************!*\
  !*** ./src/router/async-bundle.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AsyncBundle; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _loading_compoent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loading-compoent */ \"./src/router/loading-compoent.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n/**\n * 动态加载组件一个组的容器\n *\n * @class Bundle\n * @extends {Component}\n */\n\nvar AsyncBundle = /*#__PURE__*/function (_React$Component) {\n  _inherits(AsyncBundle, _React$Component);\n\n  var _super = _createSuper(AsyncBundle);\n\n  function AsyncBundle(props) {\n    var _this;\n\n    _classCallCheck(this, AsyncBundle);\n\n    _this = _super.call(this, props);\n    _this.state = {\n      mod: null\n    };\n    return _this;\n  }\n\n  _createClass(AsyncBundle, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      if (!this.state.mod) {\n        this.load(this.props);\n      }\n    } // UNSAFE_componentWillReceiveProps(nextProps) {\n    //     //路由改变才会按需\n    //     if (nextProps.match && this.props.match && (nextProps.match.url !== this.props.match.url)) {\n    //         this.load(nextProps);\n    //     }\n    // }\n\n  }, {\n    key: \"load\",\n    value: function load(props) {\n      var _this2 = this;\n\n      this.setState({\n        mod: null\n      }); //注意这里，使用Promise对象; mod.default导出默认\n\n      props.load().then(function (mod) {\n        _this2.setState({\n          mod: mod[\"default\"] ? mod[\"default\"] : mod\n        });\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return this.state.mod ? this.props.children(this.state.mod) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_loading_compoent__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null);\n    }\n  }]);\n\n  return AsyncBundle;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n\n\n//# sourceURL=webpack:///./src/router/async-bundle.js?");

/***/ }),

/***/ "./src/router/async-loader.js":
/*!************************************!*\
  !*** ./src/router/async-loader.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _async_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./async-bundle */ \"./src/router/async-bundle.js\");\n/* harmony import */ var _server_pro_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../server/pro-config */ \"./src/server/pro-config.js\");\n/* harmony import */ var _server_pro_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_server_pro_config__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n//异步加载组件的高阶函数\n\n\n\n\nfunction AsyncLoader(loader) {\n  function asyncFn(props) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_async_bundle__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {\n      load: loader\n    }, function (Comp) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Comp, props);\n    });\n  } //标记为异步组件\n\n\n  asyncFn[_server_pro_config__WEBPACK_IMPORTED_MODULE_1___default.a.asyncComponentKey] = true;\n  return asyncFn;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AsyncLoader);\n\n//# sourceURL=webpack:///./src/router/async-loader.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/layout */ \"./src/app/layout.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n// src/client/router/indxex.js\n//路由配置文件\n\n\n\n\nfunction App(_ref) {\n  var routeList = _ref.routeList;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_app_layout__WEBPACK_IMPORTED_MODULE_0__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Switch\"], null, routeList.map(function (item) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], _extends({\n      key: item.path\n    }, item));\n  })));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/router/loading-compoent.js":
/*!****************************************!*\
  !*** ./src/router/loading-compoent.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LoadingComponent; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n//等待组件加载 渲染的 loading组件\n\nfunction LoadingComponent(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"loading......\");\n}\n\n//# sourceURL=webpack:///./src/router/loading-compoent.js?");

/***/ }),

/***/ "./src/router/route-config.js":
/*!************************************!*\
  !*** ./src/router/route-config.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _async_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./async-loader */ \"./src/router/async-loader.js\");\n//路由配置文件\n //组件动态加载容器\n\n\n\nfunction pageNotFound(_ref) {\n  var staticContext = _ref.staticContext;\n\n  if (staticContext) {\n    staticContext.code = 404;\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"404\\u9875\\u9762\");\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ([{\n  path: ['/', '/index'],\n  component: Object(_async_loader__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function () {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ../pages/index */ \"./src/pages/index/index.js\"));\n  }),\n  exact: true\n}, {\n  path: '/detail/:id',\n  component: Object(_async_loader__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function () {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ../pages/detail */ \"./src/pages/detail/index.js\"));\n  }),\n  exact: true\n}, {\n  path: '/search',\n  component: Object(_async_loader__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function () {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, /*! ../pages/search */ \"./src/pages/search/index.js\"));\n  }),\n  exact: true\n}, {\n  path: '*',\n  component: pageNotFound,\n  exact: true\n}]);\n\n//# sourceURL=webpack:///./src/router/route-config.js?");

/***/ }),

/***/ "./src/server/assets.js":
/*!******************************!*\
  !*** ./src/server/assets.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// src/server/common/assets.js\nvar proConfig = __webpack_require__(/*! ./pro-config */ \"./src/server/pro-config.js\"); //生产环境中 静态资源的处理\n\n\nmodule.exports = function () {\n  //let devHost = '//localhost:9001';\n  var devHost = \"//\".concat(global.__LOCAL__IP__, \":\").concat(proConfig.wdsPort);\n  var jsFiles = ['libs.js', 'main.js', 'styles.js'];\n  var cssFiles = ['styles.css'];\n  var assets = {\n    js: [],\n    css: []\n  }; // if (!__IS_PROD__) {//开发环境\n\n  assets.js.push(\"<script type=\\\"text/javascript\\\"  src=\\\"\".concat(devHost, \"/libs.js\\\"></script>\"));\n  assets.js.push(\"<script type=\\\"text/javascript\\\"  src=\\\"\".concat(devHost, \"/main.js\\\"></script>\"));\n  assets.js.push(\"<script type=\\\"text/javascript\\\"  src=\\\"\".concat(devHost, \"/styles.js\\\"></script>\"));\n  assets.css.push(\"<link rel=\\\"stylesheet\\\" type=\\\"text/css\\\" href=\\\"\".concat(devHost, \"/styles.css\\\" />\")); // } else {\n  //     //生产环境 从 asset-manifest.json 读取资源\n  //     const map = require('@dist/server/asset-manifest.json');\n  //     jsFiles.forEach(item => {\n  //         if(map[item])\n  //             assets.js.push(`<script type=\"text/javascript\"  src=\"${map[item]}\"></script>`)\n  //     });\n  //     cssFiles.forEach(item => {\n  //         if(map[item])\n  //             assets.css.push(`<link rel=\"stylesheet\" type=\"text/css\" href=\"${map[item]}\" />`)\n  //     });\n  // }\n\n  return assets;\n};\n\n//# sourceURL=webpack:///./src/server/assets.js?");

/***/ }),

/***/ "./src/server/get-static-routes.js":
/*!*****************************************!*\
  !*** ./src/server/get-static-routes.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pro_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pro-config */ \"./src/server/pro-config.js\");\n/* harmony import */ var _pro_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pro_config__WEBPACK_IMPORTED_MODULE_0__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n//路由静态化处理\n\n\nvar checkIsAsyncRoute = function checkIsAsyncRoute(component) {\n  return component && component[_pro_config__WEBPACK_IMPORTED_MODULE_0___default.a.asyncComponentKey];\n}; //将路由转换为静态路由\n\n\nfunction getStaticRoutes(_x) {\n  return _getStaticRoutes.apply(this, arguments);\n}\n\nfunction _getStaticRoutes() {\n  _getStaticRoutes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(routes) {\n    var key, len, i, staticRoutes, item;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            key = '__dynamics_route_to_static';\n\n            if (!global[key]) {\n              _context.next = 4;\n              break;\n            }\n\n            console.log('cache route');\n            return _context.abrupt(\"return\", global[key]);\n\n          case 4:\n            len = routes.length, i = 0;\n            staticRoutes = [];\n\n          case 6:\n            if (!(i < len)) {\n              _context.next = 24;\n              break;\n            }\n\n            item = routes[i];\n\n            if (!checkIsAsyncRoute(item.component)) {\n              _context.next = 20;\n              break;\n            }\n\n            _context.t0 = staticRoutes;\n            _context.t1 = _objectSpread;\n            _context.t2 = _objectSpread({}, item);\n            _context.next = 14;\n            return item.component().props.load();\n\n          case 14:\n            _context.t3 = _context.sent[\"default\"];\n            _context.t4 = {\n              component: _context.t3\n            };\n            _context.t5 = (0, _context.t1)(_context.t2, _context.t4);\n\n            _context.t0.push.call(_context.t0, _context.t5);\n\n            _context.next = 21;\n            break;\n\n          case 20:\n            staticRoutes.push(_objectSpread({}, item));\n\n          case 21:\n            i++;\n            _context.next = 6;\n            break;\n\n          case 24:\n            global[key] = staticRoutes;\n            return _context.abrupt(\"return\", staticRoutes);\n\n          case 26:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _getStaticRoutes.apply(this, arguments);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (getStaticRoutes);\n\n//# sourceURL=webpack:///./src/server/get-static-routes.js?");

/***/ }),

/***/ "./src/server/match-route.js":
/*!***********************************!*\
  !*** ./src/server/match-route.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_0__);\nfunction _createForOfIteratorHelper(o) { if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n// src/share/match-route.js\n//路由匹配，然后根据匹配的路由得到对应的组件\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (path, routeList) {\n  var targetRoute, targetMatch;\n\n  var _iterator = _createForOfIteratorHelper(routeList),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var item = _step.value;\n      targetMatch = Object(react_router__WEBPACK_IMPORTED_MODULE_0__[\"matchPath\"])(path, item);\n\n      if (targetMatch) {\n        targetRoute = item; //查找到第一个路由后停止查找\n\n        break;\n      }\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n\n  return {\n    targetRoute: targetRoute,\n    targetMatch: targetMatch\n  };\n});\n\n//# sourceURL=webpack:///./src/server/match-route.js?");

/***/ }),

/***/ "./src/server/pro-config.js":
/*!**********************************!*\
  !*** ./src/server/pro-config.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//双端公用的配置文件\nmodule.exports = {\n  __IS_SSR__: true,\n  //是否为 ssr 模式\n  wdsPort: 8084,\n  //wds 服务的运行端口\n  nodeServerPort: 8085,\n  //node server 的监听端口\n  asyncComponentKey: '__IS_ASYNC_COMP_FLAG__' //标志组件是否是按需加载 turn | false\n\n};\n\n//# sourceURL=webpack:///./src/server/pro-config.js?");

/***/ }),

/***/ "./src/server/react-ssr.js":
/*!*********************************!*\
  !*** ./src/server/react-ssr.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _router_route_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../router/route-config */ \"./src/router/route-config.js\");\n/* harmony import */ var _match_route__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./match-route */ \"./src/server/match-route.js\");\n/* harmony import */ var _router_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../router/index */ \"./src/router/index.js\");\n/* harmony import */ var _get_static_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./get-static-routes */ \"./src/server/get-static-routes.js\");\n/* harmony import */ var _pro_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pro-config */ \"./src/server/pro-config.js\");\n/* harmony import */ var _pro_config__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_pro_config__WEBPACK_IMPORTED_MODULE_8__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n// /src/server/middlewares/react-ssr.js\n//完成 react ssr 工作的中间件\n//引入Index 组件\n\n\n\n // import Layout from '../client/app/layout';//如果有 layout 组件，也需要一起转换为 html\n\n //自定义 provider 用来传递数据\n// import Provider from '../client/app/provider';\n\n\n\n\n\n\nvar getAssets = __webpack_require__(/*! ./assets */ \"./src/server/assets.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (/*#__PURE__*/(function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {\n    var path, html, fetchResult, tdk, staticRoutesList, matchResult, targetRoute, targetMatch, fetchDataFn, _ref2, page, context, assetsMap;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            console.log(\"development\");\n            console.log(_typeof(\"development\"));\n            console.log(true);\n            console.log( false ? undefined : _typeof(true));\n            console.log('====');\n            path = ctx.request.path;\n\n            if (!(path.indexOf('.') > -1)) {\n              _context.next = 9;\n              break;\n            }\n\n            ctx.body = null;\n            return _context.abrupt(\"return\", next());\n\n          case 9:\n            console.log('ctx.request.path', ctx.request.path);\n            html = '', fetchResult = {}, tdk = {\n              //tdk 默认值\n              title: '默认标题 - my react ssr',\n              keywords: '默认关键词',\n              description: '默认描述'\n            };\n\n            if (!_pro_config__WEBPACK_IMPORTED_MODULE_8___default.a.__IS_SSR__) {\n              _context.next = 29;\n              break;\n            }\n\n            _context.next = 14;\n            return Object(_get_static_routes__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(_router_route_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n\n          case 14:\n            staticRoutesList = _context.sent;\n            _context.next = 17;\n            return Object(_match_route__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(path, staticRoutesList);\n\n          case 17:\n            matchResult = _context.sent;\n            targetRoute = matchResult.targetRoute, targetMatch = matchResult.targetMatch; //得到数据\n\n            if (!targetRoute) {\n              _context.next = 25;\n              break;\n            }\n\n            fetchDataFn = targetRoute.component ? targetRoute.component.getInitialProps : null;\n\n            if (!fetchDataFn) {\n              _context.next = 25;\n              break;\n            }\n\n            _context.next = 24;\n            return fetchDataFn({\n              match: targetMatch\n            });\n\n          case 24:\n            fetchResult = _context.sent;\n\n          case 25:\n            _ref2 = fetchResult || {}, page = _ref2.page;\n\n            if (page && page.tdk) {\n              tdk = page.tdk;\n            } //将预取数据在这里传递过去 组内通过props.staticContext获取\n\n\n            context = {\n              initialData: fetchResult\n            };\n            html = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_1__[\"renderToString\"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__[\"StaticRouter\"], {\n              location: path,\n              context: context\n            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_router_index__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n              routeList: staticRoutesList\n            })));\n\n          case 29:\n            //静态资源\n            assetsMap = getAssets();\n            ctx.body = \"<!DOCTYPE html>\\n<html lang=\\\"en\\\">\\n<head>\\n    <meta charset=\\\"UTF-8\\\">\\n    <title>\".concat(tdk.title, \"</title>\\n    <meta name=\\\"keywords\\\" content=\\\"\").concat(tdk.keywords, \"\\\" />\\n    <meta name=\\\"description\\\" content=\\\"\").concat(tdk.description, \"\\\" />\\n     \").concat(assetsMap.css.join(''), \"\\n</head>\\n<body>\\n    <div id=\\\"root\\\">\").concat(html, \"</div>\\n    <textarea id=\\\"ssrTextInitData\\\" style=\\\"display:none;\\\">\").concat(JSON.stringify(fetchResult), \"</textarea>\\n</body>\\n</html>\\n<script>\\nwindow.__IS__SSR__=\").concat(_pro_config__WEBPACK_IMPORTED_MODULE_8___default.a.__IS_SSR__, \";\\n</script>\\n \").concat(assetsMap.js.join(''), \"\\n\");\n            _context.next = 33;\n            return next();\n\n          case 33:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n})());\n\n//# sourceURL=webpack:///./src/server/react-ssr.js?");

/***/ }),

/***/ 0:
/*!*******************************************************************************!*\
  !*** multi ./node_modules/@babel/polyfill/lib/index.js ./src/index-server.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! D:\\gitPro\\Notes\\ssr\\react-ssr\\node_modules\\@babel\\polyfill\\lib\\index.js */\"./node_modules/@babel/polyfill/lib/index.js\");\nmodule.exports = __webpack_require__(/*! D:\\gitPro\\Notes\\ssr\\react-ssr\\src\\index-server.js */\"./src/index-server.js\");\n\n\n//# sourceURL=webpack:///multi_./node_modules/@babel/polyfill/lib/index.js_./src/index-server.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "core-js/es6":
/*!******************************!*\
  !*** external "core-js/es6" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/es6\");\n\n//# sourceURL=webpack:///external_%22core-js/es6%22?");

/***/ }),

/***/ "core-js/fn/array/flat-map":
/*!********************************************!*\
  !*** external "core-js/fn/array/flat-map" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/array/flat-map\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/array/flat-map%22?");

/***/ }),

/***/ "core-js/fn/array/includes":
/*!********************************************!*\
  !*** external "core-js/fn/array/includes" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/array/includes\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/array/includes%22?");

/***/ }),

/***/ "core-js/fn/object/entries":
/*!********************************************!*\
  !*** external "core-js/fn/object/entries" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/object/entries\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/object/entries%22?");

/***/ }),

/***/ "core-js/fn/object/get-own-property-descriptors":
/*!*****************************************************************!*\
  !*** external "core-js/fn/object/get-own-property-descriptors" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/object/get-own-property-descriptors\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/object/get-own-property-descriptors%22?");

/***/ }),

/***/ "core-js/fn/object/values":
/*!*******************************************!*\
  !*** external "core-js/fn/object/values" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/object/values\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/object/values%22?");

/***/ }),

/***/ "core-js/fn/promise/finally":
/*!*********************************************!*\
  !*** external "core-js/fn/promise/finally" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/promise/finally\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/promise/finally%22?");

/***/ }),

/***/ "core-js/fn/string/pad-end":
/*!********************************************!*\
  !*** external "core-js/fn/string/pad-end" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/string/pad-end\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/string/pad-end%22?");

/***/ }),

/***/ "core-js/fn/string/pad-start":
/*!**********************************************!*\
  !*** external "core-js/fn/string/pad-start" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/string/pad-start\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/string/pad-start%22?");

/***/ }),

/***/ "core-js/fn/string/trim-end":
/*!*********************************************!*\
  !*** external "core-js/fn/string/trim-end" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/string/trim-end\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/string/trim-end%22?");

/***/ }),

/***/ "core-js/fn/string/trim-start":
/*!***********************************************!*\
  !*** external "core-js/fn/string/trim-start" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/string/trim-start\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/string/trim-start%22?");

/***/ }),

/***/ "core-js/fn/symbol/async-iterator":
/*!***************************************************!*\
  !*** external "core-js/fn/symbol/async-iterator" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/symbol/async-iterator\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/symbol/async-iterator%22?");

/***/ }),

/***/ "core-js/library/fn/global":
/*!********************************************!*\
  !*** external "core-js/library/fn/global" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/library/fn/global\");\n\n//# sourceURL=webpack:///external_%22core-js/library/fn/global%22?");

/***/ }),

/***/ "core-js/web":
/*!******************************!*\
  !*** external "core-js/web" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/web\");\n\n//# sourceURL=webpack:///external_%22core-js/web%22?");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");\n\n//# sourceURL=webpack:///external_%22koa%22?");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-static\");\n\n//# sourceURL=webpack:///external_%22koa-static%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-hot-loader/root":
/*!****************************************!*\
  !*** external "react-hot-loader/root" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-hot-loader/root\");\n\n//# sourceURL=webpack:///external_%22react-hot-loader/root%22?");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router\");\n\n//# sourceURL=webpack:///external_%22react-router%22?");

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-config\");\n\n//# sourceURL=webpack:///external_%22react-router-config%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "regenerator-runtime/runtime":
/*!**********************************************!*\
  !*** external "regenerator-runtime/runtime" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"regenerator-runtime/runtime\");\n\n//# sourceURL=webpack:///external_%22regenerator-runtime/runtime%22?");

/***/ })

/******/ });