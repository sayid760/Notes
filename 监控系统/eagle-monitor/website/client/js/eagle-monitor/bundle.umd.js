(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  let formatError = (errorObj)=>{
    let col = errorObj.column || errorObj.columnNumber;
    let row = errorObj.line || errorObj.lineNumber;
    let errorType = errorObj.name;
    let message = errorObj.message;

    let {stack} = errorObj;
    if (stack) {
      let matchUrl = stack.match(/(https|http)?:\/\/[^\n]+/);
      let urlFirstStack = matchUrl ? matchUrl[0]: '';
      let regUrlCheck = /(https|http)?:\/\/(\S)*\.js/;

      // 获取真正的URL
      let resourceUrl = '';
      if (regUrlCheck.test(urlFirstStack)) {
        resourceUrl = urlFirstStack.match(regUrlCheck)[0];
      }

      // 获取真正的行信息
      let stackCol = null;
      let stackRow = null;
      let posStack = urlFirstStack.match(/:(\d+):(\d+)/);

      if (posStack && posStack.length >= 3) {
        [, stackCol, stackRow] = posStack;
      }

      return {
        content: stack,
        col: Number(col || stackCol),
        row: Number(row || stackRow),
        errorType, message, resourceUrl
      }
    }
  };

  var errorCatch = {
      init: (cb)=>{
        let _origin_error = window.onerror;
        window.onerror = function(message, source, lineno, colno, error) {

          let errorInfo = formatError(error);
          errorInfo.type = 'error';
          errorInfo._message = message;
          errorInfo._source = source;
          errorInfo._lineno = lineno;
          errorInfo._colno = colno;
          cb(errorInfo);
          _origin_error && _origin_error.apply(window, arguments);
        };
      }
  };

  // import perf from './perf.js'


  // perf.init((perform)=>{
  //     console.log('perf init', perform);
  // })

  // resource.init((resourceData) => {
  //     console.log('resource init', resourceData);
  // })

  // xhrHook.init((xhrInfo) => {
  //     console.log('xhrInfo init', xhrInfo);
  // })

  errorCatch.init((errObj) => {
    console.log('errorCatch init', errObj);
  });

}));
//# sourceMappingURL=bundle.umd.js.map
