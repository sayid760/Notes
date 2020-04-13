// 主要是缓存内容
const CACHE_NAME="cache_v1"
self.addEventListener('install', async event =>{
    console.log('install', event)
    // 1.开启一个cache，得到一个cache对象
    const cache = await caches.open(CACHE_NAME)
    // 2.等待cache把所有的资源存储起来
    await cache.addAll(['/', '/images/aa.jpg', 'manifest.json']) // 接口也可以缓存
    // 等待skipWaiting结束，才进入到activate
    await self.skipWaiting()
})

// 主要请求旧缓存
self.addEventListener('activate', async event =>{
    console.log('activate', event)
    // 3.清除掉旧资源（激活的时候，把旧资源删掉）
    // 获取所有的资源的key，如果key不存在版本数组中，则说明key是旧资源
    const keys= await caches.keys()
    keys.forEach(key=>{
        if(key !== CACHE_NAME){
            caches.delete(key)
        }
    })
    await self.clients.claim()
})

// fetch事件会在请求发送的时候触发，断网就请求不到
// 判断资源是否能够请求成功，如果能够请求成功，就响应请求结果，如果断网请求失败，就读取caches缓存即可
self.addEventListener('fetch', event =>{
    console.log('fetch', event)
    //请求对象
    const req = event.request
    //例如 http://localhost (只保留同源的资源，其他域名的资源，可能会出错，不保存)
    const url = new URL(req.url)
    if(url.origin !== self.origin){ // self.origin 、location.origin也可以
        return
    }
    //给浏览器响应（判断是不是静态资源，是走缓存，不是就走线上资源）
    //线上资源优先网络，静态资源优先缓存
    if(req.url.includes('/api')){
        event.respondWith(networkFirst(req)) // 给浏览器响应
    }else{
        event.respondWith(cacheFirst(req)) // 给浏览器响应
    }
})

// 网络优先（网络能请求到就请求，不能就读缓存）
async function networkFirst(req){
    // 去缓存中读取
    const cache = await caches.open(CACHE_NAME) // 打开缓存
    try{
        const  fresh= await fetch(req)
        // 把响应的备份存储到缓存中
        cache.put(req, fresh.clone())
        return fresh
    }catch(err){
        const cached = await cache.match(req) // 获取req对应的response
        return cached
    }
}

//缓存优先，一般适用于静态资源
async function cacheFirst(req){
    const cache = await caches.open(CACHE_NAME)
    const cached = await cache.match(req)
  //如果从缓存中拿到
    if(cached){
      return cached
    }else{
      const fresh = await fetch(req)
        //   //把响应的数据备份存储再缓存中(缓存了就没有返回了，所以备份一份做缓存用，另一份做返回用)
        //   cache.put(req,fresh.clone())
      return fresh
    }
  }