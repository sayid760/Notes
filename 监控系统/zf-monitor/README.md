## 简介

前端监控 SDK

## 1. 为什么要做前端监控

- 更快发现问题和解决问题
- 做产品的决策依据
- 提升前端工程师的技术深度和广度，打造简历两点
- 为业务扩展提供了更多可能想

## 2. 前端监控目标

### 2.1 稳定性（stability）

| 错误名称 | 备注                         |
| -------- | ---------------------------- |
| JS 错误  | JS 执行错误或者 promise 异常 |
| 资源错误 | script、link 等资源加载异常  |
| 接口错误 | ajax 或 fetch 请求接口异常   |
| 白屏     | 页面空白                     |

### 2.2 用户体验（experience）

| 错误名称                                    | 备注                                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 加载时间                                    | 各个阶段的加载时间                                                                               |
| TTFB(time to first byte)(首字节时间)        | 是指浏览器发起第一个请求到数据返回第一个字节消耗的事件，这个时间包含了网络请求时间、后端处理时间 |
| FP(First Paint)(首次绘制)                   | 首次绘制包括了任何用户自定义的背景绘制，它是将第一个像素点绘制到屏幕的时刻                       |
| FCP(First Content Paint)(首次内容绘制)      | 首次内容绘制是浏览器将第一个 DOM 渲染到屏幕的时间，可以是任何文本、图片、SVG 等的时间            |
| FMP(First Meaningful paint)(首次有意义绘制) | 首次有意义绘制是页面可用性的量度标准                                                             |
| FID(First Input Delay)(首次输入延迟)        | 用户首次和页面交互到页面响应交互的时间                                                           |
| 卡顿                                        | 超过 50ms 的长任务                                                                               |

### 2.3 业务（business）

| 错误名称       | 备注                               |
| -------------- | ---------------------------------- |
| PV             | page view 即页面浏览量或点击量     |
| UV             | 指访问某个站点的不同 IP 地址的人数 |
| 页面的停留时间 | 用户在每一个页面的停留时间         |

## 3. 前端监控流程

- 前端埋点
- 数据上报
- 分析和计算 将采集到的数据进行加工汇总
- 可视化展示 将数据按各种维度进行展示
- 监控报警 发现问题后按一定的条件触发报警

![](./resource/note2.png)

### 3.1 常见的埋点方案

- 代码埋点，就是以嵌入代码的形式进行埋点，比如需要监控用户的点击事件，会选择在用户点击时，插入一段代码，保存这个监听行为或者直接将监听行为以某一种数据格式直接传递给服务器端
- 优点是可以在任意时刻，精确的发送或保存所需要的数据信息
- 缺点是工作量较大

### 3.2 可视化埋点

- 通过可视化交互的手段，代替代码埋点
- 将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义的增加埋 s 事件等等，最后输出的代码耦合了业务代码和埋点代码
- 可视化埋点其实是用系统来代替手工插入埋点代码

### 3.3 无痕埋点

- 前端的任意一个事件都被绑定一个标识，所有的事件都记录下来
- 通过顶起上传记录文件，配合文件解析，解析出来我们想要的数据，并生成可视化报告供专业人员分析
- 无痕埋点的优点是采集全量数据，不会出现漏埋和误埋等现象
- 缺点是给数据传输和服务器增加压力，也无法灵活定制数据结构

## 4 编写监控采集脚本

### 4.5 加载时间

- Performance Timing
- DOMContentLoaded
- FMP

![](./assets/desc.png)

#### 4.5.1 阶段含义

| 字段                       | 含义                                                                                                              |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| navigationStart            | 初始化页面，在同一个浏览器上下文中前一个页面 unload 的时间戳，如果没有前一个页面的 unload，则与 fetchStart 值相等 |
| redirectStart              | 开始重定向 - 第一个 HTTP 重定向发生的事件，有跳转且是同域的重定向，否则为 0                                       |
| redirectEnd                | 结束重定向 - 最后一个重定向完成的时间，否则为 0                                                                   |
| fetchStart                 | 开始获取文档 - 浏览器准备好实用 http 请求获取文档的时间，这发生在检查缓存之前                                     |
| domainLookupStart          | 开始解析域名 - DNS 域名开始查询的事件，如果有本地的缓存或 keep-alive 则时间为 0                                   |
| domainLookupEnd            | 结束域名解析- DNS 域名结束查询的时间                                                                              |
| connectStart               | 开始连接 - TCP 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等                                         |
| secureConnectionStart      | 加密连接 - https 连接开始的时间，如果不是安全链接则为 0                                                           |
| connectEnd                 | 结束连接 - TCP 完成握手的时间，如果是持久连接则与 fetchStart 值相等                                               |
| requestStart               | 开始请求 - HTTP 请求读取真实文档开始的事件，包括从本地缓存读取                                                    |
| requestEnd                 | 结束请求 - HTTP 请求读取真实文档结束的事件，包括从本地缓存读取                                                    |
| responseStart              | 响应开始 - 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的 Unix 毫秒时间戳                               |
| responseEnd                | 响应结束- 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时的 Unix 毫秒时间戳            |
| unloadEventStart           | 卸载事件开始- 前一个页面的 unload 的时间戳 如果没有则为 0                                                         |
| unloadEventEnd             | 卸载事件结束 - 与 unloadEventStart 相对应，返回的是 unload 函数执行完成的时间戳                                   |
| domLoading                 | 开始解析 DOM                                                                                                      |
| domInteractive             | DOM 结构结束解析                                                                                                  |
| domContentLoadedEventStart | DOMContentLoaded 事件开始                                                                                         |
| domContentLoadedEventEnd   | DOMContentLoaded 事件结束                                                                                         |
| domComplete                | DOM 和资源解析完毕                                                                                                |
| loadEventStart             | 开始 load 回调函数                                                                                                |
| loadEventEnd               | 结束 load 回调函数                                                                                                |

#### 4.5.2 阶段计算

| 字段             | 描述                                       | 计算方式                                              | 意义                                                                                                      |
| ---------------- | ------------------------------------------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| unload           | 前一个页面卸载耗时                         | unloadEventEnd - unloadEventStart                     | --                                                                                                        |
| redirect         | 重定向耗时                                 | redirectEnd - redirectStart                           | 重定向的时间                                                                                              |
| appCache         | 缓存耗时                                   | domainLookupStart- fetchStart                         | 读取缓存的时间                                                                                            |
| dns              | DNS 解析耗时                               | domainLookupEnd - domainLookupStart                   | 可观察域名解析服务是否正常                                                                                |
| tcp              | TCP 连接耗时                               | connectEnd - connectStart                             | 建立连接的耗时                                                                                            |
| ssl              | SSL 安全连接耗时                           | connectEnd - secureConnectionStart                    | 反映数据安全连接建立耗时                                                                                  |
| ttfb             | Time to First Byte(TTFB) <br> 网络请求耗时 | responesStart - requestStart                          | TTFB 是发出页面请求到接收到应答数据第一个字节所花费的毫秒数                                               |
| response         | 响应数据传输耗时                           | responseEnd - responseStart                           | 观察网络是否正常                                                                                          |
| dom              | DOM 解析耗时                               | domInteractive - responseEnd                          | 观察 DOM 结构是否合理，是否有 JS 阻塞页面解析                                                             |
| dcl              | DOMContentLoaded 事件耗时                  | domContentLoadedEventEnd - domContentLoadedEventStart | 当 HTML 文档被完全加载和解析完成后， DOM contentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载 |
| resources        | 资源加载耗时                               | domComplete - domContentLoadedEventEnd                | 可观察文档流是否过大                                                                                      |
| domReady         | DOM 阶段渲染耗时                           | DomContentLoadedEventEnd - fetchStart                 | DOM 树和页面资源加载完成时间，会触发 domContentLoaded 事件                                                |
| 首次渲染耗时     | 首次渲染耗时                               | responseEnd - fetchStart                              | 加载文档到看到第一帧非空图像的时间，也叫白屏时间                                                          |
| 首次可交互时间   | 首次可交互时间                             | domInteractive - fetchStart                           | DOM 树解析完成时间，此时 document.readyState 为 interactive                                               |
| 首包时间耗时     | 首包时间                                   | responseStart - domainLookupStart                     | DOM 解析到响应返回给浏览器第一个字节的时间                                                                |
| 页面完全加载时间 | 页面完全加载时间                           | loadEventStart - fetchStart                           | --                                                                                                        |
| onLoad           | onLoad 事件耗时                            | loadEvnetEnd - loadEventStart                         | --                                                                                                        |

### 4.6 性能指标

| 字段 | 描述                                     | 备注                                                                                                      |
| ---- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| FP   | First Paint（首次绘制）                  | 包括了任何用户自定义的背景绘制，它是首先将像素绘制到屏幕的时刻                                            |
| FCP  | First Content Paint（首次内容绘制）      | 是浏览器将第一个 DOM 渲染到屏幕的时间，可能是文本、图像、SVG 等，这其实就是白屏时间                       |
| FMP  | First Meaningful Paint（首次有意义绘制） | 页面有意义的内容渲染的时间                                                                                |
| LCP  | Largest Contentful Paint（最大内容渲染） | 代表在 viewport 中最大的页面元素加载的时间                                                                |
| DCL  | DomContentLoaded（DOM 加载完成）         | 当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载 |
| L    | onLoad                                   | 当依赖的资源全部加载完毕之后才会触发                                                                      |
| TTI  | Time to Interactive（可交互时间）        | 用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点                                                    |
| FID  | First Input Delay（首次输入延迟）        | 用户首次和页面交互（单击链接，点击按钮等）到页面响应交互的时间                                            |

## 后面的内容

1. 如何统计卡顿
2. 如何统计 pv uv 页面停留时间

## 如何可视化展示

- 如何写各种各样的查询语句出那些最实用的报表
- 设备占比
- 浏览器占比
- pv uv 停留时间
- pv 增长情况 今天比昨天增加多少
- SLS

## 报警

- 设置各种各样的条件触发邮件 短信报警

## 现在主流的开源产品

- 监控 刚开始不可能自己研发的
- 一般会用一些开源系统
- sentry 搭建 vue react 一起使用 开箱即用
- 灯塔
- 商业产品：神策

## 完整版 项目地址

https://gitee.com/zhufengpeixun/front-monitor