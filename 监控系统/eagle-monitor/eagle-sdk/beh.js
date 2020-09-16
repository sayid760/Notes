
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
}

let getXpath = (ele) =>{
  let xpath = '';
  let currentEle = ele;
  children = children.filter(node => node.tagName === ele.tagName);
  while (currentEle !== document.body) {
    xpath = getIndex(currentEle)+ '/' + xpath;
    currentEle = currentEle.parentNode;
  }
}

export default {
  init: (cb)=>{
    document.addEventListener('click', (e)=>{
      let target = e.target;
      let xpath = getXpath(target);
      cb(xpath)
    }, false);
  }
}