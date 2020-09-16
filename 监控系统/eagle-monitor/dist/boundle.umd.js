(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  // 获取我的元素是兄弟元素的第几个
  let getIndex = (ele)=>{
    let children = ele.parentNode.children;
    let myIndex = null;

    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      if(ele === element){
        myIndex = i;
      }
    }

    myIndex =  `[${myIndex + 1}]`;
    let tagName = ele.tagName.toLocaleLowerCase();
     myIndex = getIndex(ele);
    let myLabel = tagName + myIndex;
    return myLabel;
  };

  let getXpath = (ele) =>{
    let xpath = '';
    let currentEle = ele;
    children = children.filter(node => node.tagName === ele.tagName);
    while (currentEle !== document.body) {
      xpath = getIndex(currentEle)+ '/' + xpath;
      currentEle = currentEle.parentNode;
    }
  };

  var beh = {
    init: (cb)=>{
      document.addEventListener('click', (e)=>{
        let target = e.target;
        let xpath = getXpath(target);
        cb(xpath);
      }, false);
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

  // errorCatch.init((errObj) => {
  //   console.log('errorCatch init', errObj);
  // }) 

  beh.init((val) => {
    console.log('beh init', val);

    new Image('http://www.asldjs.gif?type=error&data=${val}');
  });

})));
//# sourceMappingURL=boundle.umd.js.map
