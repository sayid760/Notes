module.exports = async (ctx, next) =>{
  let apiMap = {
    'api/user': {
      name: 'jimi',
      age: 18
    },
    '/api/list': [
      {1: '1'},
      {2: '2'}
    ],
    'api/detail': {
      name: '香蕉',
      place: '泰国',
      describe: '补充能力,吃香蕉~',
      city: '泰姬陵',
      remark: '大哥,泰姬陵不是泰国的'
    }
  };
  
  for (const key in apiMap) {
    if (ctx.path.includes(key)) {
      ctx.body = apiMap[key];
      break;     
    }
  }

  return next();
}