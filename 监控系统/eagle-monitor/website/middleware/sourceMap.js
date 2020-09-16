
const fs = require('fs');
const path = require('path');
let sourceMap = require('source-map');

let sourcemapFilePath = path.join(__dirname, './manifest.js.map');

let sourceFileMap = {};

let fixPath = (filePath) => {
  return filePath.replace(/\.[\.\/]+/,'');
}

module.exports = async (ctx, next) => {
  if(ctx.path = '/sourcemap'){
    let sourceMapContent = fs.readFileSync(sourcemapFilePath, 'utf-8');
    // console.log('sourceMapContent', sourceMapContent);
    
    let fileObj = JSON.parse(sourceMapContent);

    let {
      sources
    } = fileObj;

    sources.forEach(item =>{
      sourceFileMap[fixPath(item)]=item;
    });

    console.log('fileObj', sourceFileMap);

    let line = 10;
    let column = 17;

    const consumer = await new sourceMap.SourceMapConsumer(sourceMapContent);
    let result = consumer.originalPositionFor({
      line,
      column
    });

    let originSource = sourceFileMap[result.source];
    let sourceContent = fileObj.sourcesContent[sources.indexOf(originSource)];

    let sourcesContentArr = sourcesContent.split('\n');

    console.log('result',result);
    ctx.body = {
      sourcesContentArr,
      sourceContent,
      originSource,
      result
    };
  }
  return next();
}